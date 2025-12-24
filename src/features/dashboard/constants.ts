// ==================== Dashboard Constants ====================
// All dashboard-related paths and endpoints

import { API_BASE_URL } from '@/config/api'

// ==================== Student Dashboard Paths ====================
export const STUDENT_DASHBOARD = '/student/dashboard'
export const STUDENT_MY_TUITIONS = '/student/my-tuitions'
export const STUDENT_POST_TUITION = '/student/post-tuition'
export const STUDENT_APPLIED_TUTORS = '/student/applied-tutors'
export const STUDENT_PAYMENTS = '/student/payments'
export const STUDENT_PROFILE = '/student/profile'

// ==================== Tutor Dashboard Paths ====================
export const TUTOR_DASHBOARD = '/tutor/dashboard'
export const TUTOR_MY_APPLICATIONS = '/tutor/my-applications'
export const TUTOR_ONGOING_TUITIONS = '/tutor/ongoing-tuitions'
export const TUTOR_REVENUE = '/tutor/revenue'
export const TUTOR_PROFILE_SETTINGS = '/tutor/profile'

// ==================== Admin Dashboard Paths ====================
export const ADMIN_DASHBOARD = '/admin/dashboard'
export const ADMIN_USERS = '/admin/users'
export const ADMIN_TUITIONS = '/admin/tuitions'
export const ADMIN_REPORTS = '/admin/reports'
export const ADMIN_PROFILE = '/admin/profile'

// ==================== Admin API Endpoints ====================
export const ADMIN_ENDPOINTS = {
    GET_ANALYTICS: `${API_BASE_URL}/admin/analytics`,
    GET_REPORTS: `${API_BASE_URL}/admin/reports`,
    GET_TRANSACTIONS: `${API_BASE_URL}/admin/transactions`,
    GET_DASHBOARD_STATS: `${API_BASE_URL}/admin/dashboard-stats`,
}

// ==================== Sidebar Links ====================
export const STUDENT_SIDEBAR_LINKS = [
    { label: 'My Tuitions', path: STUDENT_MY_TUITIONS },
    { label: 'Post Tuition', path: STUDENT_POST_TUITION },
    { label: 'Applied Tutors', path: STUDENT_APPLIED_TUTORS },
    { label: 'Payments', path: STUDENT_PAYMENTS },
    { label: 'Profile Settings', path: STUDENT_PROFILE },
]

export const TUTOR_SIDEBAR_LINKS = [
    { label: 'My Applications', path: TUTOR_MY_APPLICATIONS },
    { label: 'Ongoing Tuitions', path: TUTOR_ONGOING_TUITIONS },
    { label: 'Revenue History', path: TUTOR_REVENUE },
    { label: 'Profile Settings', path: TUTOR_PROFILE_SETTINGS },
]

export const ADMIN_SIDEBAR_LINKS = [
    { label: 'User Management', path: ADMIN_USERS },
    { label: 'Tuition Management', path: ADMIN_TUITIONS },
    { label: 'Reports & Analytics', path: ADMIN_REPORTS },
    { label: 'Profile Settings', path: ADMIN_PROFILE },
]
