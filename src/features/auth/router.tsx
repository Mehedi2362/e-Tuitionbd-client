import { GuestRoute } from '@/components'
import { lazy } from 'react'

const SignInPage = lazy(() => import('./pages/SignInPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
export const authRoutes = [
    {
        path: '/signup',
        element: (
            <GuestRoute>
                <SignUpPage />
            </GuestRoute>
        ),
    },
    {
        path: '/signin',
        element: (
            <GuestRoute>
                <SignInPage />
            </GuestRoute>
        ),
    },
]
