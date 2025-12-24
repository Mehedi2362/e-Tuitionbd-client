// ==================== Payment Query Hooks ====================
// Uses PaymentService with TanStack Query
import { PaymentService, type PaymentQueryParams } from '.'
import type { CreatePaymentInput } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// ==================== Query Keys ====================
export const paymentKeys = {
    all: ['payments'] as const,
    lists: () => [...paymentKeys.all, 'list'] as const,
    list: (params?: PaymentQueryParams) => [...paymentKeys.lists(), params] as const,
    my: (params?: PaymentQueryParams) => [...paymentKeys.all, 'my', params] as const,
    details: () => [...paymentKeys.all, 'detail'] as const,
    detail: (id: string) => [...paymentKeys.details(), id] as const,
    earnings: () => [...paymentKeys.all, 'earnings'] as const,
}

// ==================== Queries ====================

// Get all payments (admin)
export const usePayments = (params?: PaymentQueryParams) => {
    return useQuery({
        queryKey: paymentKeys.list(params),
        queryFn: () => PaymentService.getAll(params),
    })
}

// Get my payments (student/tutor)
export const useMyPayments = (params?: PaymentQueryParams) => {
    return useQuery({
        queryKey: paymentKeys.my(params),
        queryFn: () => PaymentService.getMyPayments(params),
    })
}

// Get payment by ID
export const usePayment = (id: string) => {
    return useQuery({
        queryKey: paymentKeys.detail(id),
        queryFn: () => PaymentService.getById(id),
        enabled: !!id,
    })
}

// Get tutor earnings
export const useTutorEarnings = () => {
    return useQuery({
        queryKey: paymentKeys.earnings(),
        queryFn: () => PaymentService.getEarnings(),
    })
}

// ==================== Mutations ====================

// Create checkout session
export const useCreateCheckout = () => {
    return useMutation({
        mutationFn: (data: CreatePaymentInput) => PaymentService.createCheckoutSession(data),
        onSuccess: (session) => {
            toast.success('পেমেন্ট পেজে রিডাইরেক্ট হচ্ছে...')
            // Redirect to Stripe checkout
            PaymentService.redirectToCheckout(session.url)
        },
        onError: (error: Error) => {
            toast.error(error.message || 'পেমেন্ট সেশন তৈরি ব্যর্থ!')
        },
    })
}

// Verify payment success (after Stripe redirect)
export const useVerifyPayment = (sessionId: string) => {
    const queryClient = useQueryClient()

    return useQuery({
        queryKey: ['payment-verify', sessionId],
        queryFn: async () => {
            const payment = await PaymentService.verifySuccess(sessionId)
            // Invalidate payment queries after verification
            queryClient.invalidateQueries({ queryKey: paymentKeys.all })
            return payment
        },
        enabled: !!sessionId,
        retry: false,
    })
}
