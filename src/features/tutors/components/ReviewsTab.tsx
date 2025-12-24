import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageSquareOff, Star } from 'lucide-react'
import type { TutorReviewResponse } from '@/shared/reviews'

interface ReviewsTabProps {
    reviews: TutorReviewResponse[]
    isLoading?: boolean
}

// Get initials for avatar fallback
const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

// Format date to relative time
const formatRelativeDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
}

// Review skeleton for loading state
const ReviewSkeleton = () => (
    <div className="flex items-start gap-4 border-b pb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-16" />
        </div>
    </div>
)

const ReviewsTab = ({ reviews, isLoading = false }: ReviewsTabProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
                <CardDescription>What students say about this tutor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    // Loading state
                    <>
                        <ReviewSkeleton />
                        <ReviewSkeleton />
                        <ReviewSkeleton />
                    </>
                ) : reviews.length === 0 ? (
                    // Empty state
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <MessageSquareOff />
                            </EmptyMedia>
                            <EmptyTitle>No Reviews Yet</EmptyTitle>
                            <EmptyDescription>This tutor hasn't received any reviews yet.</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                ) : (
                    // Reviews list
                    reviews.map((review) => (
                        <div key={review._id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={review.student.photo} alt={review.student.name} />
                                    <AvatarFallback>{getInitials(review.student.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">{review.student.name}</p>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                                    <p className="text-xs text-muted-foreground mt-2">{formatRelativeDate(review.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}

export default ReviewsTab
