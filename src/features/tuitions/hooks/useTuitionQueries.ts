// ==================== Tuition Query Hooks ====================
// Uses TuitionService with TanStack Query
import type { CreateTuitionInput, Tuition, UpdateTuitionInput } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TuitionService, type TuitionQueryParams } from '../services/tuition.service'

// ==================== Query Keys ====================
export const tuitionKeys = {
    all: ['tuitions'] as const,
    lists: () => [...tuitionKeys.all, 'list'] as const,
    list: (params?: TuitionQueryParams) => [...tuitionKeys.lists(), params] as const,
    featured: () => [...tuitionKeys.all, 'featured'] as const,
    my: (params?: TuitionQueryParams) => [...tuitionKeys.all, 'my', params] as const,
    details: () => [...tuitionKeys.all, 'detail'] as const,
    detail: (id: string) => [...tuitionKeys.details(), id] as const,
}

// ==================== Queries ====================

// Get all tuitions (public)
export const useTuitions = (params?: TuitionQueryParams) => {
    return useQuery({
        queryKey: tuitionKeys.list(params),
        queryFn: () => TuitionService.getAll(params),
    })
}

// Get featured tuitions (public)
export const useFeaturedTuitions = (limit?: number) => {
    return useQuery({
        queryKey: tuitionKeys.featured(),
        queryFn: () => TuitionService.getFeatured(limit),
    })
}

// Get tuition by ID (public)
export const useTuition = (id: string) => {
    return useQuery({
        queryKey: tuitionKeys.detail(id),
        queryFn: () => TuitionService.getById(id),
        enabled: !!id,
    })
}

// Get my tuitions (student)
export const useMyTuitions = (params?: TuitionQueryParams) => {
    return useQuery({
        queryKey: tuitionKeys.my(params),
        queryFn: () => TuitionService.getMyTuitions(params),
    })
}

// ==================== Mutations ====================

// Create tuition
export const useCreateTuition = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateTuitionInput) => TuitionService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tuitionKeys.all })
            toast.success('টিউশন পোস্ট তৈরি হয়েছে।')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'টিউশন পোস্ট তৈরি ব্যর্থ!')
        },
    })
}

// Update tuition
export const useUpdateTuition = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTuitionInput }) => TuitionService.update(id, data),
        onSuccess: (tuition: Tuition) => {
            queryClient.invalidateQueries({ queryKey: tuitionKeys.all })
            queryClient.setQueryData(tuitionKeys.detail(tuition._id), tuition)
            toast.success('টিউশন পোস্ট আপডেট হয়েছে।')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'টিউশন আপডেট ব্যর্থ!')
        },
    })
}

// Delete tuition
export const useDeleteTuition = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => TuitionService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tuitionKeys.all })
            toast.success('টিউশন পোস্ট মুছে ফেলা হয়েছে।')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'টিউশন মুছে ফেলা ব্যর্থ!')
        },
    })
}

// Approve tuition (admin)
export const useApproveTuition = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => TuitionService.approve(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tuitionKeys.all })
            toast.success('টিউশন পোস্ট অনুমোদিত হয়েছে।')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'অনুমোদন ব্যর্থ!')
        },
    })
}

// Reject tuition (admin)
export const useRejectTuition = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => TuitionService.reject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tuitionKeys.all })
            toast.success('টিউশন পোস্ট প্রত্যাখ্যান করা হয়েছে।')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'প্রত্যাখ্যান ব্যর্থ!')
        },
    })
}
