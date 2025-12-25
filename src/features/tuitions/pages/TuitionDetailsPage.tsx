/**
 * Tuition Details Page
 * Shows complete tuition information
 * Apply button for tutors (with modal form)
 */

import { ApplyModal, StudentInfoCard, TuitionInfoSection, useTuition } from '@/features/tuitions'
import { useAuth } from '@/features/auth'
import { useParams } from 'react-router'

const TuitionDetailsPage = () => {
    // Get tuition ID from URL params
    const { id: tuitionId } = useParams<{ id: string }>()
    const { user } = useAuth()

    // Fetch tuition details from backend
    const { data: tuition, isLoading, error } = useTuition(tuitionId || '')

    // Mock similar tuitions - TODO: Replace with API call
    // const mockSimilarTuitions: Tuition[] = [...]

    // Check if user is a tutor (can apply)
    const canApply = user?.role === 'tutor'

    // Loading state
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading tuition details...</p>
                    </div>
                </div>
            </div>
        )
    }

    // Error state
    if (error || !tuition) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <p className="text-destructive mb-2">Failed to load tuition details</p>
                        <p className="text-muted-foreground text-sm">{error?.message || 'Tuition not found'}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Tuition Details */}
                <div className="lg:col-span-2 space-y-6">
                    <TuitionInfoSection tuition={tuition} />
                </div>

                {/* Sidebar - Student Info & Apply Button */}
                <div className="space-y-6">
                    {/* Student Info Card */}
                    <StudentInfoCard studentName={tuition.student.name} studentEmail={tuition.student.email} />

                    {/* Apply Button with Modal - Only for tutors */}
                    {canApply && tuitionId && user && <ApplyModal tuitionId={tuitionId} tutorName={user.name} tutorEmail={user.email} />}
                </div>
            </div>
        </div>
    )
}

export default TuitionDetailsPage
