// ==================== About Routes ====================
// Lazy loaded about page

import { lazy } from 'react'

// Lazy load page
const AboutPage = lazy(() => import('./AboutPage'))

export const aboutRoutes = [
    {
        path: 'about',
        element: <AboutPage />,
    },
]
