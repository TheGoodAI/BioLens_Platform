# syntax=docker/dockerfile:1
# check=skip=SecretsUsedInArgOrEnv

# ── Build ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_DEV_MODE=false
ARG VITE_API_DEBUG=false

RUN npm run build

# ── Production ────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS production
WORKDIR /usr/share/nginx/html

RUN apk add --no-cache bash curl jq && rm -rf ./*

COPY --from=build /app/build .

RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    location = /health {\n\
        access_log off;\n\
        return 200 "ok";\n\
        add_header Content-Type text/plain;\n\
    }\n\
    location ~* \\.(?:js|css|woff2?|svg|png|jpg|ico)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

COPY scripts/start_production.sh /usr/local/bin/start_production.sh
RUN chmod +x /usr/local/bin/start_production.sh

ENV VITE_FIREBASE_API_KEY="" \
    VITE_FIREBASE_AUTH_DOMAIN="" \
    VITE_FIREBASE_PROJECT_ID="" \
    VITE_FIREBASE_STORAGE_BUCKET="" \
    VITE_FIREBASE_MESSAGING_SENDER_ID="" \
    VITE_FIREBASE_APP_ID="" \
    VITE_DEV_MODE="false" \
    VITE_API_DEBUG="false"

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/health || exit 1

ENTRYPOINT ["/usr/local/bin/start_production.sh"]
