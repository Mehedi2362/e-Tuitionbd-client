// ==================== Payment Routes ====================
// Payment pages for checkout and confirmation

import { lazy } from 'react'
import type { RouteObject } from 'react-router'

// Lazy load payment pages
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'))
const PaymentCancelPage = lazy(() => import('./pages/PaymentCancelPage'))

// ==================== Payment Routes ====================
export const paymentRoutes: RouteObject[] = [
    {
        path: 'checkout/:applicationId',
        element: <CheckoutPage />,
    },
    {
        path: 'payment/success',
        element: <PaymentSuccessPage />,
    },
    {
        path: 'payment/cancel',
        element: <PaymentCancelPage />,
    },
]
