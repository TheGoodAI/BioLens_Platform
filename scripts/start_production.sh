#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# BioLens Platform — Production Startup Script
# =============================================================================
# 1. Optionally fetch Firebase secrets from Azure Key Vault via Managed Identity
# 2. Generate /usr/share/nginx/html/env-config.js (window.__RUNTIME_CONFIG__)
# 3. Exec nginx in the foreground
# =============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DEBUG_MODE="${DEBUG_MODE:-false}"

log_info()  { printf "%b\n" "${GREEN}[INFO]${NC} $1"; }
log_warn()  { printf "%b\n" "${YELLOW}[WARN]${NC} $1"; }
log_error() { printf "%b\n" "${RED}[ERROR]${NC} $1"; }
log_debug() { if [ "${DEBUG_MODE}" = "true" ]; then printf "%b\n" "${BLUE}[DEBUG]${NC} $1"; fi; }

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
ENV_CONFIG_PATH="/usr/share/nginx/html/env-config.js"
USE_KEY_VAULT="${USE_KEY_VAULT:-false}"
KEY_VAULT_NAME="${KEY_VAULT_NAME:-biolens-kv}"
ENVIRONMENT="${ENVIRONMENT:-production}"

# Defaults (used when Key Vault is disabled or a fetch fails)
DEFAULT_FIREBASE_API_KEY="${VITE_FIREBASE_API_KEY:-}"
DEFAULT_FIREBASE_AUTH_DOMAIN="${VITE_FIREBASE_AUTH_DOMAIN:-}"
DEFAULT_FIREBASE_PROJECT_ID="${VITE_FIREBASE_PROJECT_ID:-}"
DEFAULT_FIREBASE_STORAGE_BUCKET="${VITE_FIREBASE_STORAGE_BUCKET:-}"
DEFAULT_FIREBASE_MESSAGING_SENDER_ID="${VITE_FIREBASE_MESSAGING_SENDER_ID:-}"
DEFAULT_FIREBASE_APP_ID="${VITE_FIREBASE_APP_ID:-}"
DEFAULT_DEV_MODE="${VITE_DEV_MODE:-false}"
DEFAULT_API_DEBUG="${VITE_API_DEBUG:-false}"

AZURE_TOKEN=""

mkdir -p "$(dirname "$ENV_CONFIG_PATH")"

# Graceful shutdown forwarding
_term() {
  log_info "Received termination signal, stopping nginx..."
  nginx -s quit 2>/dev/null || true
  exit 0
}
trap _term SIGINT SIGTERM

# ---------------------------------------------------------------------------
# Acquire IMDS token via VM Managed Identity
# ---------------------------------------------------------------------------
get_azure_token() {
  log_info "Acquiring Azure access token via Managed Identity..."

  local url="http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://vault.azure.net"
  local response

  if ! response=$(curl -sS --fail -H "Metadata: true" --max-time 10 "$url"); then
    log_warn "Failed to reach IMDS endpoint."
    log_debug "IMDS URL: $url"
    return 1
  fi

  AZURE_TOKEN=$(echo "$response" | jq -r '.access_token // empty') || AZURE_TOKEN=""

  if [ -z "$AZURE_TOKEN" ]; then
    log_warn "IMDS response did not contain access_token."
    log_debug "Response: $response"
    return 1
  fi

  log_info "Token acquired (length: ${#AZURE_TOKEN})"
  return 0
}

# ---------------------------------------------------------------------------
# Fetch a single secret from Key Vault
# ---------------------------------------------------------------------------
fetch_secret() {
  local vault_name="$1"
  local secret_name="$2"
  local token="$3"

  [ -z "${token:-}" ] && { log_warn "No token — skipping: $secret_name"; return 1; }

  local url="https://${vault_name}.vault.azure.net/secrets/${secret_name}?api-version=7.4"
  log_debug "Fetching: $url"

  local response
  if ! response=$(curl -sS --fail \
      -H "Authorization: Bearer ${token}" \
      -H "Content-Type: application/json" \
      --max-time 10 "$url"); then
    log_warn "Failed to fetch secret: $secret_name"
    return 1
  fi

  local value
  value=$(echo "$response" | jq -r '.value // empty') || value=""

  if [ -z "$value" ]; then
    log_warn "Secret '${secret_name}' is empty or not found."
    return 1
  fi

  printf "%s" "$value"
  return 0
}

# ---------------------------------------------------------------------------
# Fetch all Firebase secrets from Key Vault
# Key Vault secret name → environment variable mapping:
#   vite-firebase-api-key              → VITE_FIREBASE_API_KEY
#   vite-firebase-auth-domain          → VITE_FIREBASE_AUTH_DOMAIN
#   vite-firebase-project-id           → VITE_FIREBASE_PROJECT_ID
#   vite-firebase-storage-bucket       → VITE_FIREBASE_STORAGE_BUCKET
#   vite-firebase-messaging-sender-id  → VITE_FIREBASE_MESSAGING_SENDER_ID
#   vite-firebase-app-id               → VITE_FIREBASE_APP_ID
# ---------------------------------------------------------------------------
fetch_all_secrets() {
  local vault_name="$1"
  log_info "Fetching secrets from Key Vault: $vault_name"

  if ! get_azure_token; then
    log_warn "Skipping Key Vault fetch — IMDS/token unavailable."
    return 1
  fi

  local token="$AZURE_TOKEN"
  local secret_mappings=(
    "vite-firebase-api-key:VITE_FIREBASE_API_KEY"
    "vite-firebase-auth-domain:VITE_FIREBASE_AUTH_DOMAIN"
    "vite-firebase-project-id:VITE_FIREBASE_PROJECT_ID"
    "vite-firebase-storage-bucket:VITE_FIREBASE_STORAGE_BUCKET"
    "vite-firebase-messaging-sender-id:VITE_FIREBASE_MESSAGING_SENDER_ID"
    "vite-firebase-app-id:VITE_FIREBASE_APP_ID"
    "vite-dev-mode:VITE_DEV_MODE"
    "vite-api-debug:VITE_API_DEBUG"
  )

  local success=0 fail=0

  for mapping in "${secret_mappings[@]}"; do
    local kv_name="${mapping%%:*}"
    local env_name="${mapping##*:}"
    local value

    if value=$(fetch_secret "$vault_name" "$kv_name" "$token"); then
      export "${env_name}=${value}"
      log_info "✓ $kv_name → $env_name"
      success=$((success + 1))
    else
      log_warn "✗ Failed: $kv_name"
      fail=$((fail + 1))
    fi
  done

  log_info "Key Vault summary: ${success} fetched, ${fail} failed"
  return 0
}

# ---------------------------------------------------------------------------
# Generate env-config.js — injected into window.__RUNTIME_CONFIG__
# This overrides the build-time baked values for the running environment.
# ---------------------------------------------------------------------------
generate_env_config() {
  log_info "Generating runtime environment configuration..."

  local firebase_api_key="${VITE_FIREBASE_API_KEY:-$DEFAULT_FIREBASE_API_KEY}"
  local firebase_auth_domain="${VITE_FIREBASE_AUTH_DOMAIN:-$DEFAULT_FIREBASE_AUTH_DOMAIN}"
  local firebase_project_id="${VITE_FIREBASE_PROJECT_ID:-$DEFAULT_FIREBASE_PROJECT_ID}"
  local firebase_storage_bucket="${VITE_FIREBASE_STORAGE_BUCKET:-$DEFAULT_FIREBASE_STORAGE_BUCKET}"
  local firebase_messaging_sender_id="${VITE_FIREBASE_MESSAGING_SENDER_ID:-$DEFAULT_FIREBASE_MESSAGING_SENDER_ID}"
  local firebase_app_id="${VITE_FIREBASE_APP_ID:-$DEFAULT_FIREBASE_APP_ID}"
  local dev_mode="${VITE_DEV_MODE:-$DEFAULT_DEV_MODE}"
  local api_debug="${VITE_API_DEBUG:-$DEFAULT_API_DEBUG}"

  # Validate critical values
  local missing=false
  for var_name in firebase_api_key firebase_auth_domain firebase_project_id \
                  firebase_storage_bucket firebase_messaging_sender_id firebase_app_id; do
    eval "local val=\$$var_name"
    if [ -z "$val" ]; then
      log_error "CRITICAL: VITE_FIREBASE_${var_name^^} is empty!"
      missing=true
    fi
  done

  if [ "$missing" = true ]; then
    log_error "=========================================="
    log_error "Missing critical Firebase configuration!"
    log_error "The app will fail to connect to Firebase."
    log_error "Check Key Vault secrets or pod env vars."
    log_error "=========================================="
  fi

  local tmpfile="/tmp/env-config.$RANDOM.js"

  cat > "$tmpfile" << 'JSEOF'
// Runtime Environment Configuration — generated at container startup
// Overrides build-time baked values; do NOT edit manually.
window.__RUNTIME_CONFIG__ = {
  VITE_FIREBASE_API_KEY: "__VITE_FIREBASE_API_KEY__",
  VITE_FIREBASE_AUTH_DOMAIN: "__VITE_FIREBASE_AUTH_DOMAIN__",
  VITE_FIREBASE_PROJECT_ID: "__VITE_FIREBASE_PROJECT_ID__",
  VITE_FIREBASE_STORAGE_BUCKET: "__VITE_FIREBASE_STORAGE_BUCKET__",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "__VITE_FIREBASE_MESSAGING_SENDER_ID__",
  VITE_FIREBASE_APP_ID: "__VITE_FIREBASE_APP_ID__",
  VITE_DEV_MODE: __VITE_DEV_MODE__,
  VITE_API_DEBUG: __VITE_API_DEBUG__,
  ENVIRONMENT: "__ENVIRONMENT__",
  _generated_at: "__GENERATED_AT__",
  _key_vault_enabled: __KEY_VAULT_ENABLED__,
  _key_vault_name: "__KEY_VAULT_NAME__"
};
Object.freeze(window.__RUNTIME_CONFIG__);
console.log('[BioLens Runtime Config] Environment:', "__ENVIRONMENT__");
JSEOF

  sed -i "s|__VITE_FIREBASE_API_KEY__|${firebase_api_key}|g"                               "$tmpfile"
  sed -i "s|__VITE_FIREBASE_AUTH_DOMAIN__|${firebase_auth_domain}|g"                       "$tmpfile"
  sed -i "s|__VITE_FIREBASE_PROJECT_ID__|${firebase_project_id}|g"                         "$tmpfile"
  sed -i "s|__VITE_FIREBASE_STORAGE_BUCKET__|${firebase_storage_bucket}|g"                 "$tmpfile"
  sed -i "s|__VITE_FIREBASE_MESSAGING_SENDER_ID__|${firebase_messaging_sender_id}|g"       "$tmpfile"
  sed -i "s|__VITE_FIREBASE_APP_ID__|${firebase_app_id}|g"                                 "$tmpfile"
  sed -i "s|__VITE_DEV_MODE__|${dev_mode}|g"                                               "$tmpfile"
  sed -i "s|__VITE_API_DEBUG__|${api_debug}|g"                                             "$tmpfile"
  sed -i "s|__ENVIRONMENT__|${ENVIRONMENT}|g"                                               "$tmpfile"
  sed -i "s|__GENERATED_AT__|$(date -u +"%Y-%m-%dT%H:%M:%SZ")|g"                          "$tmpfile"
  sed -i "s|__KEY_VAULT_ENABLED__|${USE_KEY_VAULT}|g"                                      "$tmpfile"
  sed -i "s|__KEY_VAULT_NAME__|${KEY_VAULT_NAME}|g"                                        "$tmpfile"

  mv "$tmpfile" "$ENV_CONFIG_PATH"
  chmod 644 "$ENV_CONFIG_PATH"

  log_info "Runtime config written to: $ENV_CONFIG_PATH"
  log_info "  Firebase Project: ${firebase_project_id}"
  log_info "  Firebase Auth Domain: ${firebase_auth_domain}"
  log_info "  Environment: ${ENVIRONMENT}"
  log_info "  Key Vault enabled: ${USE_KEY_VAULT}"
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
main() {
  log_info "=== BioLens Platform — Production Startup ==="
  log_info "  Environment:    ${ENVIRONMENT}"
  log_info "  Key Vault:      ${USE_KEY_VAULT} (${KEY_VAULT_NAME})"
  log_info "  Debug Mode:     ${DEBUG_MODE}"

  if [ "${USE_KEY_VAULT}" = "true" ]; then
    log_info "Key Vault integration ENABLED — fetching secrets..."

    if ! fetch_all_secrets "$KEY_VAULT_NAME"; then
      log_error "============================================"
      log_error "CRITICAL: Key Vault secret fetch FAILED!"
      log_error "  Vault:       $KEY_VAULT_NAME"
      log_error "  Environment: $ENVIRONMENT"
      log_error "Possible causes:"
      log_error "  • Managed Identity missing 'Key Vault Secrets User' role"
      log_error "  • Vault '$KEY_VAULT_NAME' does not exist or is unreachable"
      log_error "  • Secrets not yet created in the vault"
      log_error "============================================"
      log_warn "Falling back to environment variables / build defaults."
    else
      log_info "All secrets fetched successfully."
    fi
  else
    log_info "Key Vault integration DISABLED — using environment variables."
  fi

  generate_env_config

  log_info "Starting nginx (TLS/routing handled by ingress)..."
  exec nginx -g "daemon off;"
}

main "$@"
