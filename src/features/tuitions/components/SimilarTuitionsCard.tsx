import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Empty, EmptyDescription, EmptyTitle } from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'
import { BookOpen, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { getTuitionDetailsRoute } from '../constants'
import type { Tuition } from './TuitionCard'

interface SimilarTuitionsCardProps {
    tuitions: Tuition[]
    isLoading?: boolean
    currentTuitionId: string
}

const SimilarTuitionsCard = ({ tuitions, isLoading = false, currentTuitionId }: SimilarTuitionsCardProps) => {
    // Filter out current tuition
    const filteredTuitions = tuitions.filter((t) => t._id !== currentTuitionId)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Similar Tuitions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    // Loading state
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : filteredTuitions.length === 0 ? (
                    // Empty state
                    <Empty>
                        <EmptyTitle>No similar tuitions</EmptyTitle>
                        <EmptyDescription>We couldn't find any similar tuitions.</EmptyDescription>
                    </Empty>
                ) : (
                    // Tuitions list
                    <div className="space-y-3">
                        {filteredTuitions.slice(0, 3).map((tuition) => (
                            <Link key={tuition._id} to={getTuitionDetailsRoute(tuition._id)} className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                <h4 className="font-medium text-sm line-clamp-1">{tuition.title}</h4>
                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-3 w-3" />
                                        {tuition.subjects.join(', ')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {tuition.location}
                                    </span>
                                </div>
                                <p className="text-xs font-medium text-primary mt-1">
                                    ৳{tuition.salary.min.toLocaleString()}-{tuition.salary.max.toLocaleString()}/month
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default SimilarTuitionsCard
