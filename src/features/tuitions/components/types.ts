// Tuition Details Types

export interface TuitionDetails {
    _id: string
    studentId?: string
    studentEmail?: string
    studentName?: string
    subject: string
    class: string
    location: string
    budget: number
    schedule: string
    description?: string
    requirements?: string
    status: 'pending' | 'approved' | 'rejected' | 'completed'
    applicationsCount?: number
    createdAt: string
    updatedAt?: string
}

export interface TutorApplication {
    _id: string
    tuitionId: string
    tutorId: string
    tutorEmail: string
    tutorName: string
    tutorPhotoUrl?: string
    qualifications: string
    experience: string
    expectedSalary: number
    coverLetter?: string
    status: 'pending' | 'approved' | 'rejected' | 'completed'
    createdAt: string
    updatedAt?: string
}
