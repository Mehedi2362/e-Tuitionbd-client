// ==================== API Configuration ====================
import { AUTH_ROUTES } from '@/shared/auth'
import type { ApiError } from '@/types'
import type { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const baseUrl = API_BASE_URL.replace(/\/$/, '') + '/api/v1'

// ==================== Axios Instances ====================
// Public axios instance for non-authenticated requests
export const publicAxios: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable cookies for auth
})

// Private axios instance for authenticated requests
export const privateAxios: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable HTTP-only cookies
})

// ==================== Response Interceptor ====================
const handleResponseError = async (error: AxiosError<ApiError>) => {
    // Network error
    if (!error.response) {
        console.error('Network Error:', error.message)
        return Promise.reject({
            success: false,
            message: 'Network error. Please check your connection.',
            statusCode: 0,
        })
    }

    const { status, data } = error.response
    const originalRequest = error.config

    // Unauthorized - Try to refresh token
    if (status === 401 && originalRequest && !(originalRequest as { _retry?: boolean })._retry) {
        (originalRequest as { _retry?: boolean })._retry = true
        try {
            // Try to refresh the token
            await publicAxios.post(AUTH_ROUTES.REFRESH)
            // Retry the original request
            return privateAxios(originalRequest)
        } catch {
            // Refresh failed - redirect to login
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login?session=expired'
            }
        }
    }

    // Forbidden - Not enough permissions
    if (status === 403) {
        console.error('Forbidden:', data?.message)
    }

    // Server error
    if (status >= 500) {
        console.error('Server Error:', data?.message)
    }

    return Promise.reject({
        success: false,
        message: data?.message || 'An unexpected error occurred',
        error: data?.error,
        statusCode: status,
    })
}

// Apply response interceptor to both instances
publicAxios.interceptors.response.use((response) => response, handleResponseError)
privateAxios.interceptors.response.use((response) => response, handleResponseError)

// Note: Import routes directly from @/shared in your services
// Example: import { USER_ROUTES } from '@/shared/users'
