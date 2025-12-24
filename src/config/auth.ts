/**
 * #TODO: Authentication Configuration for eTuitionBd
 * - Configure Firebase authentication methods
 * - Define API calls for backend user sync using axios
 * - Setup callbacks for auth events
 */

import { privateAxios, publicAxios } from '@/config/axios'
import { auth, googleProvider } from '@/config/firebase'
import type { AuthTokens, LoginCredentials, RegisterData, User } from '@/features/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { toast } from 'sonner'

// ============================================================================
// Auth Configuration - Pass to AuthProvider as props
// ============================================================================

export const AUTH_CONFIG = {
    storageKey: 'etuitionbd-auth-state',
    useSessionStorage: false,
    refreshBuffer: 5 * 60 * 1000, // 5 minutes before expiry

    // #TODO: Login with email/password using Firebase
    loginFn: async (credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> => {
        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)

        const token = await userCredential.user.getIdToken()

        // Store token for axios interceptor
        localStorage.setItem('authToken', token)

        // Get user data from backend using axios
        const { data } = await privateAxios.get('/users/profile')

        return {
            user: data.data,
            tokens: { accessToken: token },
        }
    },

    // #TODO: Register with email/password using Firebase
    registerFn: async (registerData: RegisterData): Promise<{ user: User; tokens: AuthTokens }> => {
        // Create Firebase user
        const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password)

        // Update Firebase profile with name
        await updateProfile(userCredential.user, {
            displayName: registerData.name,
        })

        const token = await userCredential.user.getIdToken()

        // Store token for axios interceptor
        localStorage.setItem('authToken', token)

        // Sync user with backend using privateAxios (has auth interceptor)
        const { data } = await privateAxios.post('/auth/register', {
            firebaseUid: userCredential.user.uid,
            email: userCredential.user.email,
            name: registerData.name,
            role: registerData.role || 'student',
            phone: registerData.phone,
        })

        return {
            user: data.data,
            tokens: { accessToken: token },
        }
    },

    // #TODO: Logout from Firebase
    logoutFn: async (): Promise<void> => {
        await signOut(auth)
        localStorage.removeItem('authToken')
    },

    // #TODO: Get current user from backend using axios
    getUserFn: async (token: string): Promise<User> => {
        // Ensure token is set
        localStorage.setItem('authToken', token)

        const { data } = await privateAxios.get('/users/profile')
        return data.data
    },

    // Refresh Firebase token
    refreshTokenFn: async (_refreshToken: string): Promise<AuthTokens> => {
        const currentUser = auth.currentUser
        if (!currentUser) {
            throw new Error('No user logged in')
        }

        const token = await currentUser.getIdToken(true)
        localStorage.setItem('authToken', token)

        return { accessToken: token }
    },

    // Login with Google OAuth
    loginWithGoogleFn: async (): Promise<{ user: User; tokens: AuthTokens }> => {
        const userCredential = await signInWithPopup(auth, googleProvider)
        const token = await userCredential.user.getIdToken()

        // Store token for axios interceptor
        localStorage.setItem('authToken', token)

        // Login/Sync user with backend (auto-registers if not exists)
        // Use publicAxios with explicit Authorization header to ensure token is sent
        const { data } = await publicAxios.post(
            '/auth/login',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return {
            user: data.data,
            tokens: { accessToken: token },
        }
    }, // Callbacks for auth events
    onLogin: (user: User) => {
        toast.success(`স্বাগতম, ${user.name}!`)
    },

    onLogout: () => {
        toast.info('সফলভাবে লগআউট হয়েছে')
    },

    onError: (error: Error) => {
        toast.error(error.message || 'কিছু একটা সমস্যা হয়েছে')
    },
}

export default AUTH_CONFIG
