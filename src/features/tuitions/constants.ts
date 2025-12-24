// ==================== Tuitions Constants ====================
// Client-side route paths and re-exports from shared

// ==================== Route Paths (Client-side) ====================
export const TUITIONS = '/tuitions'
export const TUITION_DETAILS = '/tuitions/:id'

// Helper functions
export const getTuitionDetailsRoute = (id: string) => `/tuitions/${id}`
