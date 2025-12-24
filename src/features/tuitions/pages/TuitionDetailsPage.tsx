/**
 * Tuition Details Page
 * Shows complete tuition information
 * Apply button for tutors (with modal form)
 */

import { ApplyModal, SimilarTuitionsCard, StudentInfoCard, TuitionInfoSection } from '@/features/tuitions'
import type { Tuition } from '@/features/tuitions/components/TuitionCard'
import type { TuitionDetails } from '@/features/tuitions/components/types'
import { useAuth } from '@/features/auth'
import { useParams } from 'react-router'

const TuitionDetailsPage = () => {
    // Get tuition ID from URL params
    const { id: tuitionId } = useParams<{ id: string }>()
    const { user } = useAuth()

    // #TODO: Fetch tuition details from backend
    // const { data: tuition, isLoading, error } = useTuition(tuitionId)

    // Mock tuition data for demonstration
    const mockTuition: TuitionDetails = {
        _id: tuitionId || '1',
        title: 'Mathematics Tutor Needed for HSC Student',
        description: 'Looking for an experienced mathematics tutor for HSC preparation. The student is currently in Class 12 and needs help with higher mathematics, calculus, and algebra. Previous experience teaching HSC students is preferred. The tutor should be patient and able to explain complex concepts in simple terms.',
        subject: 'Mathematics',
        classLevel: 'Class 12 (HSC)',
        location: 'Dhaka',
        budget: 8000,
        schedule: '3 days per week (Saturday, Monday, Wednesday) - Evening (6:00 PM - 8:00 PM)',
        requirements: ['Experience teaching HSC Mathematics', 'Strong understanding of calculus and algebra', 'Patient and good communication skills', 'Flexible with timing'],
        status: 'approved',
        postedAt: '2025-01-15T10:00:00.000Z', 
        student: {
            _id: 'student-1',
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+880 1700-000000',
        },
    }

    // Mock similar tuitions
    const mockSimilarTuitions: Tuition[] = [
        {
            _id: '2',
            title: 'Physics Tutor for SSC Exam Preparation',
            class: 'Class 10',
            subjects: ['Physics'],
            location: 'Dhaka',
            salary: { min: 6000, max: 8000 },
            daysPerWeek: 3,
            preferredTime: 'Evening',
            status: 'approved',
            createdAt: new Date().toISOString(),
        },
        {
            _id: '3',
            title: 'Math and Chemistry Tutor Needed',
            class: 'Class 11',
            subjects: ['Mathematics', 'Chemistry'],
            location: 'Chittagong',
            salary: { min: 7000, max: 10000 },
            daysPerWeek: 4,
            preferredTime: 'Afternoon',
            status: 'approved',
            createdAt: new Date().toISOString(),
        },
    ]

    // Check if user is a tutor (can apply)
    const canApply = user?.role === 'tutor'

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Tuition Details */}
                <div className="lg:col-span-2 space-y-6">
                    <TuitionInfoSection tuition={mockTuition} />
                </div>

                {/* Sidebar - Student Info & Apply Button */}
                <div className="space-y-6">
                    {/* Student Info Card */}
                    <StudentInfoCard student={mockTuition.student} />

                    {/* Apply Button with Modal - Only for tutors */}
                    {canApply && tuitionId && user && (
                        <ApplyModal
                            tuitionId={tuitionId}
                            tutorName={user.name}
                            tutorEmail={user.email}
                        />
                    )}

                    {/* Similar Tuitions */}
                    <SimilarTuitionsCard tuitions={mockSimilarTuitions} currentTuitionId={tuitionId || ''} />
                </div>
            </div>
        </div>
    )
}

export default TuitionDetailsPage
