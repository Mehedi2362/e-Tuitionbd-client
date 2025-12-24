import type { User } from '@/features/auth'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import authService from './service'

// ==================== Types ====================
type Creds = Record<string, unknown>
type AuthFn = (type?: string, creds?: Creds) => Promise<User | null>
type SuccessCallbackFn = (user: User | null) => void
type ErrorCallbackFn = (error: Error) => void
type AuthHandler = ((type?: string, creds?: Creds) => Promise<void>) | undefined

// ==================== Exported Types for backward compatibility ====================
export type AuthTokens = {
    accessToken: string
    refreshToken?: string
    expiresAt?: number
}

export type LoginCredentials = {
    email: string
    password: string
}

export type RegisterData = {
    email: string
    password: string
    name: string
    phone?: string
    role?: 'student' | 'tutor'
}

export type AuthContextValue = {
    user: User | null
    loading: boolean
    error: string | null
    isAuthenticated: boolean
    signIn: AuthHandler
    signUp: AuthHandler
    signOut: AuthHandler
}

// ==================== Config ====================
type AuthConfig = {
    fetchUser: () => Promise<User | null>
}

// ==================== Context ====================
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

type AuthContextType = {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    refetch: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ==================== Provider Factory ====================
export const createAuthProvider = (config: AuthConfig) => {
    const AuthProvider = ({ children }: { children: ReactNode }) => {
        const [user, setUser] = useState<User | null>(null)
        const [loading, setLoading] = useState<boolean>(true)

        const syncUser = useCallback(async () => {
            try {
                setUser(await config.fetchUser())
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }, [config])

        useEffect(() => {
            syncUser()
            window.addEventListener('focus', syncUser)
            return () => window.removeEventListener('focus', syncUser)
        }, [syncUser])

        const value = useMemo(() => ({ user, setUser, loading, setLoading, refetch: syncUser }), [user, loading, syncUser])

        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    }

    return AuthProvider
}

// ==================== Default AuthProvider ====================
// Simple provider that doesn't auto-fetch user (for basic usage)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const refetch = useCallback(async () => {
        setLoading(true)
        try {
            const profile = await authService.getUser()
            console.table( profile)
            setUser(profile ?? null)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        refetch()
    }, [])

    const value = useMemo(() => ({ user, setUser, loading, setLoading, refetch }), [user, loading, refetch])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ==================== Hook Options ====================
export type UseAuthOptions = {
    signInFn?: AuthFn
    signUpFn?: AuthFn
    signOutFn?: AuthFn
    onSuccess?: SuccessCallbackFn
    onError?: ErrorCallbackFn
}

// ==================== Hook ====================
export const useAuth = (options: UseAuthOptions = {}) => {
    const { signInFn, signUpFn, signOutFn, onSuccess, onError } = options

    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')

    const { user, setUser, loading, setLoading, refetch } = context
    const [error, setError] = useState<string | null>(null)

    // Derived states
    const isAuthenticated = !!user
    const isError = !!error
    const authStatus: AuthStatus = loading ? 'loading' : user ? 'authenticated' : 'unauthenticated'

    const createAuthHandler = (actionFn: AuthFn | undefined, shouldSetUserFromResult: boolean): AuthHandler => {
        if (!actionFn) return undefined
        return async (type?: string, creds?: Creds) => {
            setLoading(true)
            setError(null)
            try {
                const user = await actionFn(type, creds)
                onSuccess?.(user)
                setUser(shouldSetUserFromResult ? user : null)
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : String(err)
                setError(errorMessage)
                setUser(null)
                onError?.(err instanceof Error ? err : new Error(errorMessage))
            } finally {
                setLoading(false)
            }
        }
    }

    return {
        // Core data
        user,
        loading,
        error,

        // Derived states
        isAuthenticated,
        isError,
        authStatus,

        // Actions
        signIn: createAuthHandler(signInFn, true),
        signUp: createAuthHandler(signUpFn, true),
        signOut: createAuthHandler(signOutFn, false),

        // Utility
        refetch,
    }
}
