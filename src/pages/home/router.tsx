// ==================== Home Routes ====================
// Lazy loaded home page

import { lazy } from 'react'

// Lazy load page
const HomePage = lazy(() => import('./HomePage'))

export const homeRoutes = [
    {
        index: true,
        element: <HomePage />,
    },
]
