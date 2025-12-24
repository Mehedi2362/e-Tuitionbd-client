// ==================== Dashboard Feature Barrel Export ====================
// Centralized export for dashboard feature

// ==================== Components ====================
export * from './components'

// ==================== Hooks ====================
export * from './hooks'

// ==================== Fields ====================
export { profileFormFields, tutorProfileFields } from './fields'
export type { ProfileFieldConfig, ProfileFieldType } from './fields'

// ==================== Shared Dashboard Pages ====================
export { default as ProfileSettings } from './pages/ProfileSettingsPage'

// ==================== Student Dashboard Pages ====================
export { default as StudentAppliedTutors } from './pages/student/AppliedTutorsPage'
export { default as StudentMyTuitions } from './pages/student/MyTuitionsPage'
export { default as StudentPayments } from './pages/student/PaymentsPage'
export { default as StudentPostTuition } from './pages/student/PostTuitionPage'

// ==================== Tutor Dashboard Pages ====================
export { default as TutorMyApplications } from './pages/tutor/MyApplicationsPage'
export { default as TutorOngoingTuitions } from './pages/tutor/OngoingTuitionsPage'
export { default as TutorRevenue } from './pages/tutor/RevenuePage'

// ==================== Admin Dashboard Pages ====================
export { default as AdminReports } from './pages/admin/ReportsPage'
export { default as AdminTuitions } from './pages/admin/TuitionManagementPage'
export { default as AdminUsers } from './pages/admin/UserManagementPage'
