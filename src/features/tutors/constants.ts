// ==================== Tutors Constants ====================
// Client-side route paths only (API endpoints in services)

// ==================== Route Paths (Client-side) ====================
export const TUTORS = '/tutors'
export const TUTOR_PROFILE = '/tutors/:id'

// Helper functions
export const getTutorProfileRoute = (id: string) => `/tutors/${id}`
