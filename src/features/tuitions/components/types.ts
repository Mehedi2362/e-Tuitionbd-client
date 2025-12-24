// Tuition Details Types

export interface TuitionDetails {
    _id: string
    title: string
    description: string
    subject: string
    classLevel: string
    location: string
    budget: number
    schedule: string
    requirements: string[]
    status: 'pending' | 'approved' | 'rejected' | 'hired'
    postedAt: string
    student: {
        _id: string
        name: string
        email: string
        phone?: string
        photo?: string
    }
}

export interface TutorApplication {
    _id: string
    tutor: {
        _id: string
        name: string
        email: string
        photo?: string
        education: string
    }
    qualifications: string
    experience: string
    expectedSalary: number
    status: 'pending' | 'accepted' | 'rejected'
    appliedAt: string
}
