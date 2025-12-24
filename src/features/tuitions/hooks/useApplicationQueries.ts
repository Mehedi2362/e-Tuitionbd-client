// ==================== Application Query Hooks ====================
// Uses ApplicationService with TanStack Query
import type { Application, CreateApplicationInput } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ApplicationService, type ApplicationQueryParams } from '../services/application.service'

// ==================== Query Keys ====================
export const applicationKeys = {
    all: ['applications'] as const,
    lists: () => [...applicationKeys.all, 'list'] as const,
    list: (params?: ApplicationQueryParams) => [...applicationKeys.lists(), params] as const,
    byTuition: (tuitionId: string) => [...applicationKeys.all, 'tuition', tuitionId] as const,
    details: () => [...applicationKeys.all, 'detail'] as const,
    detail: (id: string) => [...applicationKeys.details(), id] as const,
}

// ==================== Queries ====================

// Get all applications (tutor)
export const useApplications = (params?: ApplicationQueryParams) => {
    return useQuery({
        queryKey: applicationKeys.list(params),
        queryFn: () => ApplicationService.getAll(params),
    })
}

// Get applications for a tuition (student)
export const useApplicationsByTuition = (tuitionId: string) => {
    return useQuery({
        queryKey: applicationKeys.byTuition(tuitionId),
        queryFn: () => ApplicationService.getByTuitionId(tuitionId),
        enabled: !!tuitionId,
    })
}

// Get application by ID
export const useApplication = (id: string) => {
    return useQuery({
        queryKey: applicationKeys.detail(id),
        queryFn: () => ApplicationService.getById(id),
        enabled: !!id,
    })
}

// ==================== Mutations ====================

// Apply for tuition (tutor)
export const useApplyForTuition = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ tuitionId, data }: { tuitionId: string; data?: CreateApplicationInput }) => ApplicationService.create(tuitionId, data),
        onSuccess: (_: Application, variables) => {
            queryClient.invalidateQueries({ queryKey: applicationKeys.all })
            queryClient.invalidateQueries({
                queryKey: applicationKeys.byTuition(variables.tuitionId),
            })
            toast.success('আবেদন সফল হয়েছে!')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'আবেদন ব্যর্থ!')
        },
    })
}

// Accept application (student)
export const useAcceptApplication = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => ApplicationService.accept(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicationKeys.all })
            toast.success('আবেদন গ্রহণ করা হয়েছে!')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'আবেদন গ্রহণ ব্যর্থ!')
        },
    })
}

// Reject application (student)
export const useRejectApplication = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => ApplicationService.reject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicationKeys.all })
            toast.success('আবেদন প্রত্যাখ্যান করা হয়েছে!')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'আবেদন প্রত্যাখ্যান ব্যর্থ!')
        },
    })
}

// Withdraw application (tutor)
export const useWithdrawApplication = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => ApplicationService.withdraw(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicationKeys.all })
            toast.success('আবেদন প্রত্যাহার করা হয়েছে!')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'আবেদন প্রত্যাহার ব্যর্থ!')
        },
    })
}
