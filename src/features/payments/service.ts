// ==================== Payment Service ====================
import { PAYMENT_ROUTES } from '@/shared/payments'
import { privateAxios } from '@/config/axios'
import type { ApiResponse, CreatePaymentInput, PaginatedResponse, Payment } from '@/types'

// ==================== Query Params ====================
export interface PaymentQueryParams {
    page?: number
    limit?: number
    status?: 'pending' | 'completed' | 'failed' | 'refunded'
}

// ==================== Types ====================
export interface CheckoutSession {
    sessionId: string
    url: string
}

export interface TutorEarnings {
    total: number
    pending: number
    completed: number
    payments: Payment[]
}

// ==================== Payment Service Class ====================
export const PaymentService = {
    // Get all payments (admin) or my payments
    getAll: (params?: PaymentQueryParams): Promise<PaginatedResponse<Payment>> =>
        privateAxios.get<PaginatedResponse<Payment>>(PAYMENT_ROUTES.ALL, { params }).then(res => res.data),

    // Get my payments (student/tutor)
    getMyPayments: (params?: PaymentQueryParams): Promise<PaginatedResponse<Payment>> =>
        privateAxios.get<PaginatedResponse<Payment>>(PAYMENT_ROUTES.MY, { params }).then(res => res.data),

    // Get payment by ID
    getById: (id: string): Promise<Payment> =>
        privateAxios.get<ApiResponse<Payment>>(PAYMENT_ROUTES.BY_ID(id)).then(res => res.data.data!),

    // Create Stripe checkout session
    createCheckoutSession: (payment: CreatePaymentInput): Promise<CheckoutSession> =>
        privateAxios.post<ApiResponse<CheckoutSession>>(PAYMENT_ROUTES.CREATE_CHECKOUT, payment).then(res => res.data.data!),

    // Verify payment success (after Stripe redirect)
    verifySuccess: (sessionId: string): Promise<Payment> =>
        privateAxios.get<ApiResponse<Payment>>(PAYMENT_ROUTES.SUCCESS(sessionId)).then(res => res.data.data!),

    // Get tutor earnings (tutor)
    getEarnings: (): Promise<TutorEarnings> =>
        privateAxios.get<ApiResponse<TutorEarnings>>(PAYMENT_ROUTES.EARNINGS).then(res => res.data.data!),

    // Helper: Redirect to Stripe checkout
    redirectToCheckout: (url: string): void => {
        window.location.href = url
    }
}
