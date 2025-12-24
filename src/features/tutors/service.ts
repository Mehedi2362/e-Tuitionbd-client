// ==================== User Service ====================
// import { USER_ROUTES, TUTOR_ROUTES } from '@etuitionbd/shared/api'
import { privateAxios, publicAxios } from '@/config/axios'
import type { ApiResponse, PaginatedResponse, TutorProfile, UpdateProfileInput, User, UserRole } from '@/types'

// Route constants - TODO: move to shared package
const USER_ROUTES = {
    ALL: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE_ROLE: (id: string) => `/users/${id}/role`,
    PROFILE: '/profile/me',
}

const TUTOR_ROUTES = {
    ALL: '/tutors',
    FEATURED: '/tutors/featured',
    FILTER_OPTIONS: '/tutors/filter-options',
    BY_ID: (id: string) => `/tutors/${id}`,
}

// ==================== Query Params ====================
export interface UserQueryParams {
    page?: number
    limit?: number
    role?: UserRole
    search?: string
}

export interface TutorQueryParams {
    page?: number
    limit?: number
    subject?: string
    search?: string
}

// ==================== User Service Class ====================
export const UserService = {
    // Get all users (admin)
    getAll: (params?: UserQueryParams): Promise<PaginatedResponse<User>> =>
        privateAxios.get<PaginatedResponse<User>>(USER_ROUTES.ALL, { params })
            .then(res => res.data),

    // Get user by ID (admin)
    getById: (id: string): Promise<User> =>
        privateAxios.get<ApiResponse<User>>(USER_ROUTES.BY_ID(id))
            .then(res => res.data.data!),

    // Update user role (admin)
    updateRole: (id: string, role: UserRole): Promise<User> =>
        privateAxios.patch<ApiResponse<User>>(USER_ROUTES.UPDATE_ROLE(id), { role })
            .then(res => res.data.data!),

    // Get current user profile
    getProfile: (): Promise<User> =>
        privateAxios.get<ApiResponse<User>>(USER_ROUTES.PROFILE)
            .then(res => res.data.data!),

    // Update current user profile
    updateProfile: (input: UpdateProfileInput): Promise<User> =>
        privateAxios.patch<ApiResponse<User>>(USER_ROUTES.PROFILE, input)
            .then(res => res.data.data!),
}

// ==================== Tutor Service Class ====================
export const TutorService = {
    // Get all tutors (public)
    getAll: (params?: TutorQueryParams): Promise<PaginatedResponse<TutorProfile>> =>
        publicAxios.get<PaginatedResponse<TutorProfile>>(TUTOR_ROUTES.ALL, { params })
            .then(res => res.data),

    // Get featured tutors (public)
    getFeatured: (limit: number = 6): Promise<TutorProfile[]> =>
        publicAxios.get<ApiResponse<TutorProfile[]>>(TUTOR_ROUTES.FEATURED, { params: { limit } })
            .then(res => res.data.data || []),

    // Get filter options (public)
    getFilterOptions: (): Promise<{ subjects: string[]; locations: string[]; experience: string[] }> =>
        publicAxios.get<ApiResponse<{ subjects: string[]; locations: string[]; experience: string[] }>>(TUTOR_ROUTES.FILTER_OPTIONS)
            .then(res => res.data.data!),

    // Get tutor by ID (public)
    getById: (id: string): Promise<TutorProfile> =>
        publicAxios.get<ApiResponse<TutorProfile>>(TUTOR_ROUTES.BY_ID(id))
            .then(res => res.data.data!),
}
