/**
 * Tuitions Grid Component - Display tuition cards in a grid
 * Uses: TuitionCard, Empty state, Skeleton
 */

import { STUDENT_POST_TUITION } from '@/features/dashboard/constants'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'
import { Inbox } from 'lucide-react'
import { useNavigate } from 'react-router'
import { TuitionCard, type Tuition } from './TuitionCard'

interface TuitionsGridProps {
    tuitions: Tuition[]
    isLoading?: boolean
    error?: Error | null
}

// Skeleton for loading state
function TuitionCardSkeleton() {
    return (
        <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex justify-between">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-4 w-1/4" />
            <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    )
}

export function TuitionsGrid({ tuitions, isLoading, error }: TuitionsGridProps) {
    const navigate = useNavigate()

    // Loading state
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <TuitionCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <Empty>
                <EmptyMedia>
                    <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Inbox className="size-8 text-destructive" />
                    </div>
                </EmptyMedia>
                <EmptyHeader>
                    <EmptyTitle>সমস্যা হয়েছে</EmptyTitle>
                    <EmptyDescription>{error.message || 'টিউশন লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।'}</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        পুনরায় চেষ্টা করুন
                    </Button>
                </EmptyContent>
            </Empty>
        )
    }

    // Empty state
    if (!tuitions || tuitions.length === 0) {
        return (
            <Empty>
                <EmptyMedia>
                    <div className="size-16 rounded-full bg-muted flex items-center justify-center">
                        <Inbox className="size-8 text-muted-foreground" />
                    </div>
                </EmptyMedia>
                <EmptyHeader>
                    <EmptyTitle>কোনো টিউশন পাওয়া যায়নি</EmptyTitle>
                    <EmptyDescription>আপনার সার্চ অনুযায়ী কোনো টিউশন পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button onClick={() => navigate(STUDENT_POST_TUITION)}>নতুন টিউশন পোস্ট করুন</Button>
                </EmptyContent>
            </Empty>
        )
    }

    // Grid of tuition cards
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tuitions.map((tuition, index) => (
                <TuitionCard key={tuition._id} tuition={tuition} index={index} />
            ))}
        </div>
    )
}

export default TuitionsGrid
