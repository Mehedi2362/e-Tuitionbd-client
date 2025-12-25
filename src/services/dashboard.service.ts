// ==================== Dashboard Services ====================
import { privateAxios } from '@/config/axios'
import type {
    ApiResponse,
    Application,
    PaginatedResponse,
    Payment,
    Tuition,
    User
} from '@/types'

// ==================== Types ====================
interface DashboardStats {
    totalUsers: number
    totalTuitions: number
    totalApplications: number
    totalPayments: number
    totalRevenue: number
    recentTransactions: Payment[]
}

interface AnalyticsData {
    revenue: Array<{ month: string; amount: number }>
    usersByRole: Array<{ role: string; count: number }>
    tuitionsByStatus: Array<{ status: string; count: number }>
    applicationsByStatus: Array<{ status: string; count: number }>
}

interface EarningsData {
    totalEarnings: number
    pendingEarnings: number
    paidEarnings: number
    transactions: Payment[]
}

// ==================== Admin Dashboard Service ====================
export const AdminDashboardService = {
    // Get dashboard stats
    getDashboard: (): Promise<DashboardStats> =>
        privateAxios.get<ApiResponse<DashboardStats>>('/admin/dashboard')
            .then(res => res.data.data || {
                totalUsers: 0,
                totalTuitions: 0,
                totalApplications: 0,
                totalPayments: 0,
                totalRevenue: 0,
                recentTransactions: []
            })
            .catch(() => ({
                totalUsers: 0,
                totalTuitions: 0,
                totalApplications: 0,
                totalPayments: 0,
                totalRevenue: 0,
                recentTransactions: []
            })),

    // Get analytics data
    getAnalytics: (): Promise<AnalyticsData> =>
        privateAxios.get<ApiResponse<AnalyticsData>>('/admin/analytics')
            .then(res => res.data.data || {
                revenue: [],
                usersByRole: [],
                tuitionsByStatus: [],
                applicationsByStatus: []
            })
            .catch(() => ({
                revenue: [],
                usersByRole: [],
                tuitionsByStatus: [],
                applicationsByStatus: []
            })),

    // User management
    getUsers: (params?: {
        page?: number
        limit?: number
        role?: string
        status?: string
        search?: string
    }): Promise<PaginatedResponse<User>> =>
        privateAxios.get<PaginatedResponse<User>>('/admin/users', { params })
            .then(res => res.data)
            .catch((): PaginatedResponse<User> => ({
                success: true,
                data: [],
                pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
            })),

    getUserByEmail: (email: string): Promise<User | null> =>
        privateAxios.get<ApiResponse<User>>(`/admin/users/${email}`)
            .then(res => res.data.data || null)
            .catch(() => null),

    updateUserRole: (email: string, role: string): Promise<User | null> =>
        privateAxios.patch<ApiResponse<User>>(`/admin/users/${email}/role`, { role })
            .then(res => res.data.data || null)
            .catch(() => null),

    updateUserStatus: (email: string, status: string): Promise<User | null> =>
        privateAxios.patch<ApiResponse<User>>(`/admin/users/${email}/status`, { status })
            .then(res => res.data.data || null)
            .catch(() => null),

    deleteUser: (email: string): Promise<void> =>
        privateAxios.delete(`/admin/users/${email}`)
            .then(() => undefined)
            .catch(() => undefined),

    // Tuition management
    getAllTuitions: (params?: {
        page?: number
        limit?: number
        status?: string
        search?: string
    }): Promise<PaginatedResponse<Tuition>> =>
        privateAxios.get<PaginatedResponse<Tuition>>('/admin/tuitions', { params })
            .then(res => res.data)
            .catch((): PaginatedResponse<Tuition> => ({
                success: true,
                data: [],
                pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
            })),

    getTuitionStats: (): Promise<{
        total: number
        pending: number
        approved: number
        rejected: number
    }> =>
        privateAxios.get<ApiResponse<{
            total: number
            pending: number
            approved: number
            rejected: number
        }>>('/admin/tuitions/stats/overview')
            .then(res => res.data.data || {
                total: 0,
                pending: 0,
                approved: 0,
                rejected: 0
            })
            .catch(() => ({
                total: 0,
                pending: 0,
                approved: 0,
                rejected: 0
            })),

    updateTuitionStatus: (id: string, status: 'approved' | 'rejected'): Promise<Tuition | null> =>
        privateAxios.patch<ApiResponse<Tuition>>(`/admin/tuitions/${id}/status`, { status })
            .then(res => res.data.data || null)
            .catch(() => null),

    // Payments
    getAllPayments: (params?: {
        page?: number
        limit?: number
        status?: string
    }): Promise<PaginatedResponse<Payment>> =>
        privateAxios.get<PaginatedResponse<Payment>>('/admin/payments', { params })
            .then(res => res.data)
            .catch((): PaginatedResponse<Payment> => ({
                success: true,
                data: [],
                pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
            })),

    // Application management
    getApplications: (params?: {
        page?: number
        limit?: number
        status?: string
    }): Promise<PaginatedResponse<Application>> =>
        privateAxios.get<PaginatedResponse<Application>>('/admin/applications', { params })
            .then(res => res.data)
            .catch((): PaginatedResponse<Application> => ({
                success: true,
                data: [],
                pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
            })),
}

// ==================== Student Dashboard Service ====================
export const StudentDashboardService = {
    // Get applications for a specific tuition
    getApplicationsForTuition: (tuitionId: string): Promise<Application[]> =>
        privateAxios.get<ApiResponse<Application[]>>(`/student/tuitions/${tuitionId}/applications`)
            .then(res => res.data.data || [])
            .catch(() => []),

    // Accept tutor application
    acceptApplication: (applicationId: string): Promise<Application | null> =>
        privateAxios.patch<ApiResponse<Application>>(`/student/applications/${applicationId}/accept`)
            .then(res => res.data.data || null)
            .catch(() => null),

    // Reject tutor application
    rejectApplication: (applicationId: string): Promise<Application | null> =>
        privateAxios.patch<ApiResponse<Application>>(`/student/applications/${applicationId}/reject`)
            .then(res => res.data.data || null)
            .catch(() => null),

    // Get payment history
    getPayments: (params?: {
        page?: number
        limit?: number
    }): Promise<PaginatedResponse<Payment>> =>
        privateAxios.get<PaginatedResponse<Payment>>('/student/payments', { params })
            .then(res => res.data)
            .catch((): PaginatedResponse<Payment> => ({
                success: true,
                data: [],
                pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
            })),
}

// ==================== Tutor Dashboard Service ====================
export const TutorDashboardService = {
    // Get ongoing tuitions (approved applications)
    getOngoingTuitions: (params?: {
        page?: number
        limit?: number
    }): Promise<PaginatedResponse<Tuition>> =>
        privateAxios.get<PaginatedResponse<Tuition>>('/tutor/tuitions/ongoing', { params })
            .then(res => res.data)
            .catch((): PaginatedResponse<Tuition> => ({
                success: true,
                data: [],
                pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
            })),

    // Get earnings/revenue
    getEarnings: (): Promise<EarningsData> =>
        privateAxios.get<ApiResponse<EarningsData>>('/tutor/earnings')
            .then(res => res.data.data || {
                totalEarnings: 0,
                pendingEarnings: 0,
                paidEarnings: 0,
                transactions: []
            })
            .catch(() => ({
                totalEarnings: 0,
                pendingEarnings: 0,
                paidEarnings: 0,
                transactions: []
            })),

    // Get payment history
    getPayments: (params?: {
        page?: number
        limit?: number
    }): Promise<PaginatedResponse<Payment>> =>
        privateAxios.get<PaginatedResponse<Payment>>('/tutor/payments', { params })
            .then(res => res.data)
            .catch((): PaginatedResponse<Payment> => ({
                success: true,
                data: [],
                pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
            })),
}
