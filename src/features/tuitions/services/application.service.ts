// ==================== Application Service ====================
import { APPLICATION_ROUTES } from '@/shared/application'
import { privateAxios } from '@/services/api'
import type { ApiResponse, Application, ApplicationStatus, CreateApplicationInput, PaginatedResponse } from '@/types'

// ==================== Query Params ====================
export interface ApplicationQueryParams {
    page?: number
    limit?: number
    status?: ApplicationStatus
    tuitionId?: string
}

// ==================== Application Service Class ====================
export const ApplicationService = {
    getAll: (params?: ApplicationQueryParams): Promise<PaginatedResponse<Application>> =>
        privateAxios.get<PaginatedResponse<Application>>(APPLICATION_ROUTES.ALL, { params })
            .then(res => res.data),

    getByTuitionId: (tuitionId: string): Promise<Application[]> =>
        privateAxios.get<ApiResponse<Application[]>>(APPLICATION_ROUTES.BY_TUITION(tuitionId))
            .then(res => res.data.data || []),

    getById: (id: string): Promise<Application> =>
        privateAxios.get<ApiResponse<Application>>(APPLICATION_ROUTES.BY_ID(id))
            .then(res => res.data.data!),

    create: (tuitionId: string, application?: CreateApplicationInput): Promise<Application> =>
        privateAxios.post<ApiResponse<Application>>(APPLICATION_ROUTES.BY_TUITION(tuitionId), application || {})
            .then(res => res.data.data!),

    accept: (id: string): Promise<Application> =>
        privateAxios.patch<ApiResponse<Application>>(APPLICATION_ROUTES.ACCEPT(id), { status: 'accepted' })
            .then(res => res.data.data!),

    reject: (id: string): Promise<Application> =>
        privateAxios.patch<ApiResponse<Application>>(APPLICATION_ROUTES.REJECT(id), { status: 'rejected' })
            .then(res => res.data.data!),

    withdraw: (id: string): Promise<void> =>
        privateAxios.delete(APPLICATION_ROUTES.BY_ID(id)).then(() => { })
}
