// ==================== Dashboard Routes ====================
// Lazy loaded dashboard pages for student, tutor, admin

import { lazy } from 'react'
import type { RouteObject } from 'react-router'

// ==================== Shared Pages ====================
const ProfileSettingsPage = lazy(() => import('./pages/ProfileSettingsPage'))

// ==================== Student Pages ====================
const StudentMyTuitions = lazy(() => import('./pages/student/MyTuitionsPage'))
const StudentPostTuition = lazy(() => import('./pages/student/PostTuitionPage'))
const StudentAppliedTutors = lazy(() => import('./pages/student/AppliedTutorsPage'))
const StudentPayments = lazy(() => import('./pages/student/PaymentsPage'))

// ==================== Tutor Pages ====================
const TutorMyApplications = lazy(() => import('./pages/tutor/MyApplicationsPage'))
const TutorOngoingTuitions = lazy(() => import('./pages/tutor/OngoingTuitionsPage'))
const TutorRevenue = lazy(() => import('./pages/tutor/RevenuePage'))

// ==================== Admin Pages ====================
const AdminUsers = lazy(() => import('./pages/admin/UserManagementPage'))
const AdminTuitions = lazy(() => import('./pages/admin/TuitionManagementPage'))
const AdminReports = lazy(() => import('./pages/admin/ReportsPage'))

// ==================== Student Routes ====================
export const studentRoutes: RouteObject[] = [
    { index: true, element: <StudentMyTuitions /> },
    { path: 'dashboard', element: <StudentMyTuitions /> },
    { path: 'my-tuitions', element: <StudentMyTuitions /> },
    { path: 'post-tuition', element: <StudentPostTuition /> },
    { path: 'applied-tutors', element: <StudentAppliedTutors /> },
    { path: 'payments', element: <StudentPayments /> },
    { path: 'profile', element: <ProfileSettingsPage /> },
]

// ==================== Tutor Routes ====================
export const tutorRoutes: RouteObject[] = [
    { index: true, element: <TutorMyApplications /> },
    { path: 'dashboard', element: <TutorMyApplications /> },
    { path: 'applications', element: <TutorMyApplications /> },
    { path: 'ongoing-tuitions', element: <TutorOngoingTuitions /> },
    { path: 'revenue', element: <TutorRevenue /> },
    { path: 'profile', element: <ProfileSettingsPage /> },
]

// ==================== Admin Routes ====================
export const adminRoutes: RouteObject[] = [
    { index: true, element: <AdminUsers /> },
    { path: 'dashboard', element: <AdminUsers /> },
    { path: 'users', element: <AdminUsers /> },
    { path: 'tuitions', element: <AdminTuitions /> },
    { path: 'reports', element: <AdminReports /> },
    { path: 'profile', element: <ProfileSettingsPage /> },
]
