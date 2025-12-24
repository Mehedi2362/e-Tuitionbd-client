import { createBrowserRouter } from 'react-router'
import Root, { DashboardLayout } from '@/components/layout'
import { ErrorPage } from '@/pages'
import { ProtectedRoute, RoleGuard } from '@/components/guards'
import { homeRoutes } from '@/pages/home/router'
import { aboutRoutes } from '@/pages/about/router'
import { contactRoutes } from '@/pages/contact/router'
import { authRoutes } from '@/features/auth/router'
import { tuitionRoutes } from '@/features/tuitions/router'
import { tutorRoutes } from '@/features/tutors/router'
import { paymentRoutes } from '@/features/payments/router'
import { studentRoutes, tutorRoutes as tutorDashboardRoutes, adminRoutes } from '@/features/dashboard/router'

const basename = import.meta.env.BASE_URL

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                // Public routes
                ...homeRoutes,
                ...aboutRoutes,
                ...contactRoutes,
                ...authRoutes,
                ...tuitionRoutes,
                ...tutorRoutes,

                // Payment routes (protected)
                ...paymentRoutes,
            ],
        },
        // Dashboard routes (separate from Root to avoid Header/Footer overlap)
        {
            path: '/student',
            element: (
                <ProtectedRoute>
                    <RoleGuard allowedRoles={['student']}>
                        <DashboardLayout />
                    </RoleGuard>
                </ProtectedRoute>
            ),
            errorElement: <ErrorPage />,
            children: studentRoutes,
        },
        {
            path: '/tutor',
            element: (
                <ProtectedRoute>
                    <RoleGuard allowedRoles={['tutor']}>
                        <DashboardLayout />
                    </RoleGuard>
                </ProtectedRoute>
            ),
            errorElement: <ErrorPage />,
            children: tutorDashboardRoutes,
        },
        {
            path: '/admin',
            element: (
                <ProtectedRoute>
                    <RoleGuard allowedRoles={['admin']}>
                        <DashboardLayout />
                    </RoleGuard>
                </ProtectedRoute>
            ),
            errorElement: <ErrorPage />,
            children: adminRoutes,
        },
    ],
    { basename }
)
