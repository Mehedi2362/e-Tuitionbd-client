// Tutor Profile Types

export interface TutorProfile {
    _id: string
    name: string
    email: string
    phone?: string
    photo?: string
    title: string // e.g., "Mathematics Specialist"
    bio: string
    location: string
    subjects: string[]
    education: {
        degree: string
        institution: string
        year: string
    }[]
    certifications: {
        name: string
        issuer: string
        year: string
    }[]
    experience: number // years
    rating: number
    reviewCount: number
    studentsCount: number
    classesCount: number
    isVerified: boolean
    availability: {
        weekdays: string
        weekends: string
    }
}

export interface TutorReview {
    _id: string
    student: {
        name: string
        photo?: string
    }
    rating: number
    comment: string
    createdAt: string
}
