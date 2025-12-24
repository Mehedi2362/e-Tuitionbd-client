// ==================== User Query Hooks ====================
// Uses UserService & TutorService with TanStack Query
import { TutorService, UserService, type TutorQueryParams, type UserQueryParams } from '@/services'
import { reviewApi } from '@/services/reviewApi'
import type { UserRole } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// ==================== Query Keys ====================
export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (params?: UserQueryParams) => [...userKeys.lists(), params] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: string) => [...userKeys.details(), id] as const,
}

export const tutorKeys = {
    all: ['tutors'] as const,
    lists: () => [...tutorKeys.all, 'list'] as const,
    list: (params?: TutorQueryParams) => [...tutorKeys.lists(), params] as const,
    featured: () => [...tutorKeys.all, 'featured'] as const,
    details: () => [...tutorKeys.all, 'detail'] as const,
    detail: (id: string) => [...tutorKeys.details(), id] as const,
}

// ==================== Review Query Keys ====================
export const reviewKeys = {
    all: ['reviews'] as const,
    byTutor: () => [...reviewKeys.all, 'by-tutor'] as const,
    byTutorId: (tutorId: string) => [...reviewKeys.byTutor(), tutorId] as const,
    byTutorWithPagination: (tutorId: string, skip: number, limit: number) => [...reviewKeys.byTutorId(tutorId), skip, limit] as const,
    stats: () => [...reviewKeys.all, 'stats'] as const,
    statsByTutor: (tutorId: string) => [...reviewKeys.stats(), tutorId] as const,
}

// ==================== User Queries (Admin) ====================

// Get all users (admin)
export const useUsers = (params?: UserQueryParams) => {
    return useQuery({
        queryKey: userKeys.list(params),
        queryFn: () => UserService.getAll(params),
    })
}

// Get user by ID (admin)
export const useUser = (id: string) => {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => UserService.getById(id),
        enabled: !!id,
    })
}

// Update user role (admin)
export const useUpdateUserRole = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, role }: { id: string; role: UserRole }) => UserService.updateRole(id, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all })
            toast.success('ইউজারের রোল আপডেট হয়েছে!')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'রোল আপডেট ব্যর্থ!')
        },
    })
}

// ==================== Tutor Queries (Public) ====================

// Get all tutors (public)
export const useTutors = (params?: TutorQueryParams) => {
    return useQuery({
        queryKey: tutorKeys.list(params),
        queryFn: () => TutorService.getAll(params),
    })
}

// Get featured tutors (public)
export const useFeaturedTutors = (limit?: number) => {
    return useQuery({
        queryKey: tutorKeys.featured(),
        queryFn: () => TutorService.getFeatured(limit),
    })
}

// Get tutor by ID (public)
export const useTutor = (id: string) => {
    return useQuery({
        queryKey: tutorKeys.detail(id),
        queryFn: () => TutorService.getById(id),
        enabled: !!id,
    })
}

// ==================== Review Queries ====================

// Get reviews for a tutor
export const useTutorReviews = (tutorId: string, skip = 0, limit = 10) => {
    return useQuery({
        queryKey: reviewKeys.byTutorWithPagination(tutorId, skip, limit),
        queryFn: () => reviewApi.getReviewsByTutor(tutorId, skip, limit),
        enabled: !!tutorId,
    })
}

// Get rating stats for a tutor
export const useTutorRatingStats = (tutorId: string) => {
    return useQuery({
        queryKey: reviewKeys.statsByTutor(tutorId),
        queryFn: () => reviewApi.getTutorRatingStats(tutorId),
        enabled: !!tutorId,
    })
}

// Create a review
export const useCreateReview = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: reviewApi.createReview,
        onSuccess: (_, variables) => {
            // Invalidate reviews for this tutor
            queryClient.invalidateQueries({
                queryKey: reviewKeys.byTutorId(variables.tutorId),
            })
            // Invalidate rating stats
            queryClient.invalidateQueries({
                queryKey: reviewKeys.statsByTutor(variables.tutorId),
            })
            toast.success('Review added successfully!')
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.error || error?.message || 'Failed to add review'
            toast.error(errorMessage)
        },
    })
}

// Update a review
export const useUpdateReview = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ reviewId, data }: { reviewId: string; data: any }) => {
            return reviewApi.updateReview(reviewId, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reviewKeys.all })
            toast.success('Review updated successfully!')
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.error || error?.message || 'Failed to update review'
            toast.error(errorMessage)
        },
    })
}

// Delete a review
export const useDeleteReview = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: reviewApi.deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reviewKeys.all })
            toast.success('Review deleted successfully!')
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.error || error?.message || 'Failed to delete review'
            toast.error(errorMessage)
        },
    })
}
