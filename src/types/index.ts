// #TODO: Define all TypeScript types for the eTuitionBd application

// ==================== User Types ====================
// #TODO: User role types for role-based access control
export type UserRole = 'student' | 'tutor' | 'admin'
export type UserStatus = 'active' | 'inactive' | 'blocked'

// #TODO: User interface for MongoDB user document
export interface User {
    _id: string
    name: string
    email: string
    phone?: string
    photoUrl?: string
    role: UserRole
    status: UserStatus
    createdAt: string
    updatedAt: string
}

// #TODO: User registration input type
export interface RegisterInput {
    name: string
    email: string
    password: string
    phone: string
    role: 'student' | 'tutor'
}

// #TODO: User login input type
export interface LoginInput {
    email: string
    password: string
}

// #TODO: User profile update input type
export interface UpdateProfileInput {
    name?: string
    phone?: string
    photoUrl?: string
    bio?: string
    qualifications?: string
    experience?: string
    subjects?: string[]
}

// ==================== Tuition Types ====================
// #TODO: Tuition status types for approval workflow
export type TuitionStatus = 'pending' | 'approved' | 'rejected'

// #TODO: Tuition interface for MongoDB tuition document
export interface Tuition {
    _id: string
    title: string
    subject: string
    class: string
    location: string
    budget: number
    schedule: string
    description?: string
    requirements?: string
    status: TuitionStatus
    studentId: string
    student?: User
    createdAt: string
    updatedAt: string
}

// #TODO: Tuition creation input type
export interface CreateTuitionInput {
    title?: string
    subject: string
    class: string
    location: string
    budget: number
    schedule: string
    description?: string
    requirements?: string
}

// #TODO: Tuition update input type
export interface UpdateTuitionInput extends Partial<CreateTuitionInput> {
    status?: TuitionStatus
}

// ==================== Application Types ====================
// #TODO: Application status types for tutor applications
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

// #TODO: Application interface for tutor applications
export interface Application {
    _id: string
    tuitionId: string
    tutorId: string
    tuition?: Tuition
    tutor?: User
    qualifications: string
    experience: string
    expectedSalary: number
    status: ApplicationStatus
    createdAt: string
    updatedAt: string
}

// #TODO: Application creation input type
export interface CreateApplicationInput {
    tuitionId: string
    qualifications: string
    experience: string
    expectedSalary: number
}

// #TODO: Application update input type
export interface UpdateApplicationInput {
    qualifications?: string
    experience?: string
    expectedSalary?: number
}

// ==================== Payment Types ====================
// Payment status types
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

// Payment interface for transaction records
export interface Payment {
    _id: string
    studentId: string
    tutorId: string
    tuitionId: string
    applicationId: string
    amount: number
    platformFee?: number
    tutorEarnings?: number
    stripePaymentId?: string
    stripeSessionId?: string
    status: PaymentStatus
    paidAt?: string
    student?: User
    tutor?: User
    tuition?: Tuition
    createdAt: string
    updatedAt: string
}

// Payment checkout input - server retrieves amount from application
export interface CreatePaymentInput {
    applicationId: string
}

// ==================== Tutor Profile Types ====================
// #TODO: Tutor profile interface for extended tutor information
export interface TutorProfile extends User {
    qualifications?: string
    experience?: string
    subjects?: string[]
    rating?: number
    totalReviews?: number
    bio?: string
}

// ==================== Review Types (Optional) ====================
// #TODO: Review interface for tutor rating system
export interface Review {
    _id: string
    tutorId: string
    studentId: string
    tuitionId: string
    rating: number
    comment?: string
    student?: User
    createdAt: string
}

// #TODO: Review creation input type
export interface CreateReviewInput {
    tutorId: string
    tuitionId: string
    rating: number
    comment?: string
}

// ==================== API Response Types ====================
// Generic API response type
export interface ApiResponse<T> {
    success: boolean
    message: string
    data?: T
    error?: string
    meta?: PaginationMeta
}

// Pagination meta type
export interface PaginationMeta {
    page: number
    limit: number
    total: number
    totalPages: number
}

// Paginated response type for listings
export interface PaginatedResponse<T> {
    success: boolean
    message: string
    data: T[]
    meta: PaginationMeta
}

// API error response
export interface ApiError {
    success: false
    message: string
    error?: string
    statusCode?: number
}

// ==================== Auth Types ====================
// #TODO: Auth context type
export interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    loginWithGoogle: () => Promise<void>
    register: (data: RegisterInput) => Promise<void>
    logout: () => Promise<void>
    updateProfile: (data: Partial<User>) => Promise<void>
}

// #TODO: JWT payload type
export interface JWTPayload {
    userId: string
    email: string
    role: UserRole
    exp: number
    iat: number
}

// ==================== Filter & Search Types ====================
// #TODO: Tuition filter options
export interface TuitionFilters {
    subject?: string
    class?: string
    location?: string
    minBudget?: number
    maxBudget?: number
    status?: TuitionStatus
}

// #TODO: Sort options
export interface SortOptions {
    field: string
    order: 'asc' | 'desc'
}

// #TODO: Pagination options
export interface PaginationOptions {
    page: number
    limit: number
}

// ==================== Analytics Types (Admin) ====================
// #TODO: Platform analytics data type
export interface PlatformAnalytics {
    totalUsers: number
    totalStudents: number
    totalTutors: number
    totalTuitions: number
    totalApplications: number
    totalRevenue: number
    recentTransactions: Payment[]
    monthlyRevenue: { month: string; revenue: number }[]
}
