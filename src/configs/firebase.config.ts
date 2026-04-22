const rc = (window as any).__RUNTIME_CONFIG__ ?? {}

const FirebaseConfig = {
    apiKey: rc.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: rc.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: rc.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: rc.VITE_FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: rc.VITE_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: rc.VITE_FIREBASE_APP_ID || import.meta.env.VITE_FIREBASE_APP_ID,
}

export default FirebaseConfig
