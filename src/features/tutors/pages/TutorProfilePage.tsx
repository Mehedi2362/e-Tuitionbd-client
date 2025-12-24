// #TODO: Tutor Profile Page
// #TODO: Display tutor information
// #TODO: Qualifications and experience
// #TODO: Rating & reviews (Optional)

import { AboutTab, ExperienceTab, ProfileSidebar } from '@/features/tutors'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useParams } from 'react-router'
import { useTutor } from '@/features/tutors/queries'
import { Skeleton } from '@/components/ui/skeleton'

const TutorProfilePage = () => {
    // Get tutor ID from URL params
    const { id: tutorId } = useParams<{ id: string }>()

    // Fetch tutor data
    const { data: tutor, isLoading: tutorLoading, error: tutorError } = useTutor(tutorId || '')

    const handleSendMessage = () => {
        // #TODO: Open messaging dialog or redirect to chat
    }

    // Show loading state
    if (tutorLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Skeleton className="h-80 w-full rounded-lg" />
                    </div>
                    <div className="lg:col-span-2">
                        <Skeleton className="h-96 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        )
    }

    // Show error state
    if (tutorError || !tutor) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">Tutor not found</h2>
                    <p className="text-muted-foreground mt-2">The tutor you're looking for doesn't exist.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar - Tutor Basic Info */}
                <div className="lg:col-span-1">
                    <ProfileSidebar tutor={tutor} onSendMessage={handleSendMessage} />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="about" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="experience">Experience</TabsTrigger>
                            <TabsTrigger value="reviews" disabled>
                                Reviews
                            </TabsTrigger>
                        </TabsList>

                        {/* About Tab */}
                        <TabsContent value="about">
                            <AboutTab tutor={tutor} />
                        </TabsContent>

                        {/* Experience Tab */}
                        <TabsContent value="experience">
                            <ExperienceTab tutor={tutor} />
                        </TabsContent>

                        {/* Reviews Tab - Coming Soon */}
                        <TabsContent value="reviews" className="space-y-6">
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                                    <p className="text-muted-foreground">Tutor reviews feature will be available soon.</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default TutorProfilePage
