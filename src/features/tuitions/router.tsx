// ==================== Tuitions Routes ====================
// Lazy loaded tuition pages

import { lazy } from 'react'

// Lazy load pages
const TuitionsPage = lazy(() => import('./pages/TuitionsPage'))
const TuitionDetailsPage = lazy(() => import('./pages/TuitionDetailsPage'))

export const tuitionRoutes = [
    {
        path: 'tuitions',
        element: <TuitionsPage />,
    },
    {
        path: 'tuitions/:id',
        element: <TuitionDetailsPage />,
    },
]
