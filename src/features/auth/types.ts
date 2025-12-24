export type User = {
    name: string
    email: string
    phone: string
    role: 'student' | 'tutor' | 'admin'
    avatar?: string
}

export type SignInCreds = {
    email: string
    password: string
}

export type SignUpCreds = User & { password: string; confirmPassword: string }
export type UserRole = 'student' | 'tutor' | 'admin'
export type UserStatus = 'active' | 'inactive' | 'blocked'
