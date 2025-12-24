// ==================== Contact Routes ====================
// Lazy loaded contact page

import { lazy } from 'react'

// Lazy load page
const ContactPage = lazy(() => import('./ContactPage'))

export const contactRoutes = [
    {
        path: 'contact',
        element: <ContactPage />,
    },
]
