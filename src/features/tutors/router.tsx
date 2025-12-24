// ==================== Tutors Routes ====================
// Lazy loaded tutor pages

import { lazy } from 'react'

// Lazy load pages
const TutorsPage = lazy(() => import('./pages/TutorsPage'))
const TutorProfilePage = lazy(() => import('./pages/TutorProfilePage'))

export const tutorRoutes = [
    {
        path: 'tutors',
        element: <TutorsPage />,
    },
    {
        path: 'tutors/:id',
        element: <TutorProfilePage />,
    },
]
