// ==================== Tuition Service ====================
import { TUITION_ROUTES } from '@/shared/tuition'
import { privateAxios, publicAxios } from '@/config/axios'
import type { ApiResponse, CreateTuitionInput, PaginatedResponse, Tuition, TuitionFilters, UpdateTuitionInput } from '@/types'

// ==================== Query Params ====================
export interface TuitionQueryParams extends TuitionFilters {
    page?: number
    limit?: number
    sort?: string
    order?: 'asc' | 'desc'
    search?: string
}

// ==================== Tuition Service Class ====================
export const TuitionService = {
    getAll: (params?: TuitionQueryParams): Promise<PaginatedResponse<Tuition>> =>
        publicAxios.get<PaginatedResponse<Tuition>>(TUITION_ROUTES.ALL, { params })
            .then(res => res.data),

    getFeatured: (limit: number = 6): Promise<Tuition[]> =>
        publicAxios.get<ApiResponse<Tuition[]>>(TUITION_ROUTES.FEATURED, { params: { limit } })
            .then(res => res.data.data || []),

    getFilterOptions: (): Promise<{ classes: string[]; subjects: string[]; locations: string[] }> =>
        publicAxios.get<ApiResponse<{ classes: string[]; subjects: string[]; locations: string[] }>>(TUITION_ROUTES.FILTER_OPTIONS)
            .then(res => res.data.data!),

    getById: (id: string): Promise<Tuition> =>
        publicAxios.get<ApiResponse<Tuition>>(TUITION_ROUTES.BY_ID(id))
            .then(res => res.data.data!),

    getMyTuitions: (params?: TuitionQueryParams): Promise<PaginatedResponse<Tuition>> =>
        privateAxios.get<PaginatedResponse<Tuition>>(TUITION_ROUTES.MY, { params })
            .then(res => res.data),

    create: (tuition: CreateTuitionInput): Promise<Tuition> =>
        privateAxios.post<ApiResponse<Tuition>>(TUITION_ROUTES.CREATE, tuition)
            .then(res => res.data.data!),

    update: (id: string, updates: UpdateTuitionInput): Promise<Tuition> =>
        privateAxios.patch<ApiResponse<Tuition>>(TUITION_ROUTES.UPDATE(id), updates)
            .then(res => res.data.data!),

    delete: (id: string): Promise<void> =>
        privateAxios.delete(TUITION_ROUTES.DELETE(id)).then(() => { }),

    approve: (id: string): Promise<Tuition> =>
        privateAxios.patch<ApiResponse<Tuition>>(TUITION_ROUTES.APPROVE(id), { status: 'approved' })
            .then(res => res.data.data!),

    reject: (id: string): Promise<Tuition> =>
        privateAxios.patch<ApiResponse<Tuition>>(TUITION_ROUTES.REJECT(id), { status: 'rejected' })
            .then(res => res.data.data!)
}

