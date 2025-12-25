// ==================== Dashboard Hooks ====================
// React Query hooks for dashboard features
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AdminDashboardService, StudentDashboardService, TutorDashboardService } from '@/services/dashboard.service'
import { ApplicationService } from '@/features/tuitions'
import type { ApplicationStatus, UpdateApplicationInput } from '@/types'

interface QueryParams {
    page?: number
    limit?: number
    role?: string
    status?: string
    search?: string
}

// ==================== Query Keys ====================
export const dashboardKeys = {
    // Admin
    adminDashboard: ['admin', 'dashboard'] as const,
    adminAnalytics: ['admin', 'analytics'] as const,
    adminUsers: (params?: QueryParams) => ['admin', 'users', params] as const,
    adminTuitions: (params?: QueryParams) => ['admin', 'tuitions', params] as const,
    adminApplications: (params?: QueryParams) => ['admin', 'applications', params] as const,
    adminPayments: (params?: QueryParams) => ['admin', 'payments', params] as const,

    // Student
    studentApplications: (tuitionId: string) => ['student', 'applications', tuitionId] as const,
    studentPayments: (params?: QueryParams) => ['student', 'payments', params] as const,

    // Tutor
    tutorApplications: (params?: QueryParams) => ['tutor', 'applications', params] as const,
    tutorOngoingTuitions: (params?: QueryParams) => ['tutor', 'ongoing', params] as const,
    tutorEarnings: ['tutor', 'earnings'] as const,
    tutorPayments: (params?: QueryParams) => ['tutor', 'payments', params] as const,
}

// ==================== Admin Dashboard Hooks ====================

export const useAdminDashboard = () => {
    return useQuery({
        queryKey: dashboardKeys.adminDashboard,
        queryFn: () => AdminDashboardService.getDashboard(),
    })
}

export const useAdminAnalytics = () => {
    return useQuery({
        queryKey: dashboardKeys.adminAnalytics,
        queryFn: () => AdminDashboardService.getAnalytics(),
    })
}

export const useAdminUsers = (params?: {
    page?: number
    limit?: number
    role?: string
    status?: string
    search?: string
}) => {
    return useQuery({
        queryKey: dashboardKeys.adminUsers(params),
        queryFn: () => AdminDashboardService.getUsers(params),
    })
}

export const useUpdateUserRole = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ email, role }: { email: string; role: string }) =>
            AdminDashboardService.updateUserRole(email, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
            toast.success('User role updated successfully')
        },
        onError: () => {
            toast.error('Failed to update user role')
        },
    })
}

export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ email, status }: { email: string; status: string }) =>
            AdminDashboardService.updateUserStatus(email, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
            toast.success('User status updated successfully')
        },
        onError: () => {
            toast.error('Failed to update user status')
        },
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (email: string) => AdminDashboardService.deleteUser(email),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
            toast.success('User deleted successfully')
        },
        onError: () => {
            toast.error('Failed to delete user')
        },
    })
}

export const useAdminTuitions = (params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
}) => {
    return useQuery({
        queryKey: dashboardKeys.adminTuitions(params),
        queryFn: () => AdminDashboardService.getAllTuitions(params),
    })
}

export const useAdminTuitionStats = () => {
    return useQuery({
        queryKey: ['admin', 'tuitions', 'stats'],
        queryFn: () => AdminDashboardService.getTuitionStats(),
    })
}

export const useUpdateTuitionStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: 'approved' | 'rejected' }) =>
            AdminDashboardService.updateTuitionStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'tuitions'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'tuitions', 'stats'] })
            toast.success('Tuition status updated successfully')
        },
        onError: () => {
            toast.error('Failed to update tuition status')
        },
    })
}

export const useAdminPayments = (params?: {
    page?: number
    limit?: number
    status?: string
}) => {
    return useQuery({
        queryKey: dashboardKeys.adminPayments(params),
        queryFn: () => AdminDashboardService.getAllPayments(params),
    })
}

export const useAdminApplications = (params?: {
    page?: number
    limit?: number
    status?: string
}) => {
    return useQuery({
        queryKey: dashboardKeys.adminApplications(params),
        queryFn: () => AdminDashboardService.getApplications(params),
    })
}

// ==================== Student Dashboard Hooks ====================

export const useApplicationsForTuition = (tuitionId: string) => {
    return useQuery({
        queryKey: dashboardKeys.studentApplications(tuitionId),
        queryFn: () => StudentDashboardService.getApplicationsForTuition(tuitionId),
        enabled: !!tuitionId,
    })
}

export const useAcceptApplication = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (applicationId: string) =>
            StudentDashboardService.acceptApplication(applicationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['student', 'applications'] })
            toast.success('Application accepted successfully')
        },
        onError: () => {
            toast.error('Failed to accept application')
        },
    })
}

export const useRejectApplication = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (applicationId: string) =>
            StudentDashboardService.rejectApplication(applicationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['student', 'applications'] })
            toast.success('Application rejected successfully')
        },
        onError: () => {
            toast.error('Failed to reject application')
        },
    })
}

export const useStudentPayments = (params?: {
    page?: number
    limit?: number
}) => {
    return useQuery({
        queryKey: dashboardKeys.studentPayments(params),
        queryFn: () => StudentDashboardService.getPayments(params),
    })
}

// ==================== Tutor Dashboard Hooks ====================

export const useTutorOngoingTuitions = (params?: {
    page?: number
    limit?: number
}) => {
    return useQuery({
        queryKey: dashboardKeys.tutorOngoingTuitions(params),
        queryFn: () => TutorDashboardService.getOngoingTuitions(params),
    })
}

export const useTutorEarnings = () => {
    return useQuery({
        queryKey: dashboardKeys.tutorEarnings,
        queryFn: () => TutorDashboardService.getEarnings(),
    })
}

export const useTutorPayments = (params?: {
    page?: number
    limit?: number
}) => {
    return useQuery({
        queryKey: dashboardKeys.tutorPayments(params),
        queryFn: () => TutorDashboardService.getPayments(params),
    })
}

// ==================== Tutor Application Hooks ====================

export const useTutorApplications = (params?: {
    page?: number
    limit?: number
    status?: ApplicationStatus
}) => {
    return useQuery({
        queryKey: dashboardKeys.tutorApplications(params),
        queryFn: () => ApplicationService.getAll(params),
    })
}

export const useUpdateApplication = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateApplicationInput }) =>
            ApplicationService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tutor', 'applications'] })
            toast.success('Application updated successfully')
        },
        onError: () => {
            toast.error('Failed to update application')
        },
    })
}

export const useDeleteApplication = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => ApplicationService.withdraw(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tutor', 'applications'] })
            toast.success('Application deleted successfully')
        },
        onError: () => {
            toast.error('Failed to delete application')
        },
    })
}
