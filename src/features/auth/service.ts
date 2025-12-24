import { privateAxios, publicAxios } from '@/config/axios'
import { auth } from '@/config/firebase'
import type { SignUpCreds, User } from '@/features/auth'
import { AUTH_ROUTES, type SignInCreds } from '@/shared/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

// ==================== Auth Service ====================
// All auth endpoints now use HTTP-only cookies for token storage
const authService = {
    // Get current user from cookie-authenticated session
    getUser: (): Promise<User> =>
        privateAxios.get(AUTH_ROUTES.ME).then(res => res.data.data?.user),

    // Sign in with email (Firebase token sent to server, server sets cookies)
    signInWithEmail: async (creds: SignInCreds): Promise<User> =>
        publicAxios.post(AUTH_ROUTES.SIGNIN, creds).then(res => res.data.data?.user),

    // Sign in with Google
    signInWithGoogle: async (): Promise<User> => {
        const result = await signInWithPopup(auth, new GoogleAuthProvider())
        const idToken = await result.user.getIdToken()

        // Send token to server (server will set HTTP-only cookies)
        const response = await publicAxios.post(
            AUTH_ROUTES.GOOGLE,
            {},
            { headers: { Authorization: `Bearer ${idToken}` } }
        )
        return response.data.data?.user
    },

    // Register new user
    signUpWithEmail: async (creds: SignUpCreds): Promise<User> =>
        publicAxios.post(AUTH_ROUTES.SIGNUP, creds).then(res => res.data.data?.user),


    // Sign out (clears HTTP-only cookies)
    signOut: async (): Promise<void> => {
        await privateAxios.post(AUTH_ROUTES.SIGNOUT)
        await auth.signOut()
    },

    // Refresh token (server refreshes HTTP-only cookies)
    refreshToken: (): Promise<void> =>
        publicAxios.post(AUTH_ROUTES.REFRESH).then(() => { }),

    // Forgot password
    forgotPassword: (email: string): Promise<void> =>
        publicAxios.post(AUTH_ROUTES.FORGOT_PASSWORD, { email }).then(() => { }),

    // Reset password
    resetPassword: (token: string, password: string): Promise<void> =>
        publicAxios.post(AUTH_ROUTES.RESET_PASSWORD, { token, password }).then(() => { }),

    // Verify token (returns user if valid)
    verifyToken: (): Promise<User> =>
        privateAxios.get(AUTH_ROUTES.VERIFY).then(res => res.data.data?.user),
}

export default authService
