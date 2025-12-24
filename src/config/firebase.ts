/**
 * #TODO: Firebase Configuration
 * - Initialize Firebase app using environment variables
 * - Export Firebase Auth instance
 * - Configure Google OAuth provider
 */

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// #TODO: Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// #TODO: Initialize Firebase App
const app = initializeApp(firebaseConfig)

// #TODO: Export Firebase Auth instance
export const auth = getAuth(app)

// #TODO: Configure Google OAuth Provider
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account',
})

export default app
