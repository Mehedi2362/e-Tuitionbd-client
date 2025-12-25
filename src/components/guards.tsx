// ==================== Protected Route Components ====================
// Route guards for authentication and role-based access control

import { useAuth } from '@/features/auth'
import { SIGNIN } from '@/features/auth/constants'
import { HOME } from '@/pages/home/constants'
import { Loader2 } from 'lucide-react'
import { Navigate, useLocation } from 'react-router'

type UserRole = 'student' | 'tutor' | 'admin'

// ==================== Loading Spinner ====================
const LoadingSpinner = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">লোড হচ্ছে...</p>
        </div>
    </div>
)

// ==================== ProtectedRoute ====================
// Requires user to be authenticated
interface ProtectedRouteProps {
    children: React.ReactNode
    redirectTo?: string
}

export const ProtectedRoute = ({ children, redirectTo = SIGNIN }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <LoadingSpinner />
    }

    if (!isAuthenticated) {
        // Save the attempted URL for redirect after login
        return <Navigate to={redirectTo} state={{ from: location }} replace />
    }

    return <>{children}</>
}

// ==================== RoleGuard ====================
// Requires user to have specific role(s)
interface RoleGuardProps {
    children: React.ReactNode
    allowedRoles: UserRole[]
    redirectTo?: string
}

export const RoleGuard = ({ children, allowedRoles, redirectTo = HOME }: RoleGuardProps) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <LoadingSpinner />
    }

    const userRole = user?.role as UserRole

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to={redirectTo} replace />
    }

    return <>{children}</>
}

// ==================== GuestRoute ====================
// Only accessible to non-authenticated users (for login/register pages)
interface GuestRouteProps {
    children: React.ReactNode
    redirectTo?: string
}

export const GuestRoute = ({ children, redirectTo }: GuestRouteProps) => {
    const { isAuthenticated, loading, user } = useAuth()
    const location = useLocation()

    if (loading) {
        return <LoadingSpinner />
    }

    const from = location.state?.from?.pathname
    if (isAuthenticated) {
        // Redirect based on role if no specific redirect path
        if (from) {
            return <Navigate to={from} replace />
        }

        // Redirect based on role
        const defaultRedirect = redirectTo || getDefaultRouteByRole(user?.role as UserRole)

        console.log(from, defaultRedirect);
        
        return <Navigate to={defaultRedirect} replace />
    }

    return <>{children}</>
}

// ==================== Helper Functions ====================
import { ADMIN_DASHBOARD, STUDENT_DASHBOARD, TUTOR_DASHBOARD } from '@/features/dashboard/constants'

export const getDefaultRouteByRole = (role?: UserRole): string => {
    switch (role) {
        case 'admin':
            return ADMIN_DASHBOARD
        case 'tutor':
            return TUTOR_DASHBOARD
        case 'student':
        default:
            return STUDENT_DASHBOARD
    }
}

// Export types for external use
export type { UserRole }
