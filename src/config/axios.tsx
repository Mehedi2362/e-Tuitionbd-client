import { SERVER } from '@/config/api'
import axios from 'axios'
import { toast } from 'sonner'

// ==================== API CONFIG ====================
const baseUrl = SERVER.replace(/\/$/, '') + '/api/v1'

// ==================== ERROR CONFIG ====================
export const ERROR_CONFIG = {
    serverErrors: [500, 502, 503, 504], // Server errors - show toast
    validationErrors: [400, 422], // Validation errors - form handles (no toast)
    authErrors: [401], // Auth errors - redirect to login
    forbiddenErrors: [403], // Forbidden errors - access denied
    // Bengali error messages
    messages: {
        500: 'সার্ভারে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।',
        502: 'সার্ভার সাময়িকভাবে অনুপলব্ধ।',
        503: 'সার্ভিস অনুপলব্ধ। পরে আবার চেষ্টা করুন।',
        504: 'সার্ভার সাড়া দিচ্ছে না।',
        401: 'সেশন এক্সপায়ার্ড। আবার লগইন করুন।',
        403: 'আপনার এই কাজটি করার অনুমতি নেই।',
        404: 'রিসোর্স পাওয়া যায়নি।',
        network: 'ইন্টারনেট সংযোগ নেই।',
        default: 'কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।',
    } as Record<string | number, string>,
}

// Helper: Get error message
const getErrorMessage = (status?: number, backendMessage?: string): string => {
    if (backendMessage) return backendMessage
    if (status && ERROR_CONFIG.messages[status]) return ERROR_CONFIG.messages[status]
    return ERROR_CONFIG.messages.default
}

// ==================== PUBLIC AXIOS ====================
// For non-authenticated requests (login, register, public data)
// withCredentials: true is needed for auth endpoints to receive/send cookies
export const publicAxios = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable cookies for auth
})

// Public response interceptor
publicAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status
        const backendMessage = error.response?.data?.message
        const message = getErrorMessage(status, backendMessage)

        // Network error
        if (!error.response) {
            toast.error(ERROR_CONFIG.messages.network)
            return Promise.reject(new Error(ERROR_CONFIG.messages.network))
        }

        // Server errors (500+) - show toast
        if (ERROR_CONFIG.serverErrors.includes(status)) {
            toast.error(message)
        }

        return Promise.reject(new Error(message))
    }
)

// ==================== PRIVATE AXIOS ====================
// For authenticated requests (dashboard, user data)
export const privateAxios = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Send cookies
})

// Request interceptor - no need to attach token (HTTP-Only Cookie handles it)
privateAxios.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
)

// Response interceptor - error handling
privateAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response?.status
        const backendMessage = error.response?.data?.message
        const message = getErrorMessage(status, backendMessage)
        // const originalRequest = error.config  // Reserved for future use

        // Network error
        if (!error.response) {
            toast.error(ERROR_CONFIG.messages.network)
            return Promise.reject(new Error(ERROR_CONFIG.messages.network))
        }

        // Server errors (500+) - show toast
        if (ERROR_CONFIG.serverErrors.includes(status)) {
            toast.error(message)
        }

        // // Auth error (401) - try refresh or redirect
        // if (ERROR_CONFIG.authErrors.includes(status) && !originalRequest._retry) {
        //     originalRequest._retry = true
        //     try {
        //         // Try to refresh token (cookie-based)
        //         await publicAxios.post('/auth/refresh')
        //         return privateAxios(originalRequest)
        //     } catch {
        //         // Refresh failed - redirect to login
        //         toast.error(ERROR_CONFIG.messages[401])
        //         // window.location.href = '/login'
        //     }
        // }

        // Forbidden (403) - show toast
        if (ERROR_CONFIG.forbiddenErrors.includes(status)) {
            toast.error(ERROR_CONFIG.messages[403])
        }

        // Validation errors (400, 422) - no toast, form handles
        // Just reject with error

        return Promise.reject(new Error(message))
    }
)
