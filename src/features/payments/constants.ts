// ==================== Payments Constants ====================
// Client-side route paths only (API endpoints in services)

// ==================== Route Paths (Client-side) ====================
export const CHECKOUT = '/checkout/:applicationId'
export const PAYMENT_SUCCESS = '/payment/success'
export const PAYMENT_CANCEL = '/payment/cancel'

// Helper functions
export const getCheckoutRoute = (applicationId: string) => `/checkout/${applicationId}`
