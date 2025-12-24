import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'
import { UserX } from 'lucide-react'
import TutorCard, { type Tutor } from './TutorCard'

interface TutorsGridProps {
    tutors: Tutor[]
    isLoading?: boolean
    emptyMessage?: string
}

// Loading skeleton for tutor card
const TutorCardSkeleton = () => (
    <div className="rounded-lg border bg-card p-6">
        <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
        </div>
        <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2 mt-4">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
            </div>
        </div>
        <Skeleton className="h-10 w-full mt-6" />
    </div>
)

const TutorsGrid = ({ tutors, isLoading = false, emptyMessage = 'No tutors found matching your criteria.' }: TutorsGridProps) => {
    // Show loading skeletons
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <TutorCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    // Show empty state
    if (!tutors || tutors.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <UserX />
                    </EmptyMedia>
                    <EmptyTitle>No Tutors Found</EmptyTitle>
                    <EmptyDescription>{emptyMessage}</EmptyDescription>
                </EmptyHeader>
            </Empty>
        )
    }

    // Show tutors grid
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tutors.map((tutor) => (
                <TutorCard key={tutor._id} tutor={tutor} />
            ))}
        </div>
    )
}

export default TutorsGrid
