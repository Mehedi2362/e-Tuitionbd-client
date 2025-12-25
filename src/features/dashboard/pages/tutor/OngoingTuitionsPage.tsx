/**
 * Tutor Dashboard - Ongoing Tuitions Page
 * Display all approved tuitions with real API data
 * Student contact information and tuition details
 */

import { useTutorOngoingTuitions } from '@/features/dashboard/hooks'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import type { Tuition } from '@/types'
import { BookOpen, Calendar, DollarSign, GraduationCap, Mail, MapPin, MessageSquare, RefreshCw } from 'lucide-react'
import { useMemo } from 'react'

// Loading Skeleton
const TuitionCardSkeleton = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-32 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                ))}
            </div>
            <Skeleton className="h-4 w-full" />
            <Separator />
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-full" />
                </div>
            </div>
        </CardContent>
    </Card>
)

// Tuition Card Component
const TuitionCard = ({ tuition }: { tuition: Tuition }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{tuition.subject}</CardTitle>
                        <CardDescription>Started: {new Date(tuition.createdAt).toLocaleDateString('bn-BD')}</CardDescription>
                    </div>
                    <Badge variant="default">Active</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Tuition Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{tuition.subject}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span>{tuition.class}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{tuition.location || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>৳{tuition.budget?.toLocaleString() || 0}/month</span>
                    </div>
                </div>

                {tuition.schedule && (
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{tuition.schedule}</span>
                    </div>
                )}

                <Separator />

                {/* Student Contact Information */}
                <div>
                    <p className="text-sm font-medium mb-3">Student Contact</p>
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>
                                {tuition.student.name
                                    ?.split(' ')
                                    .map((n) => n[0])
                                    .join('') || 'S'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-medium">{tuition.student.name || 'Unknown Student'}</p>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                    {tuition.student.email && (
                                    <span className="flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        {tuition.student.email}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" disabled>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

const OngoingTuitionsPage = () => {
    // Fetch ongoing tuitions with real API
    const { data, isLoading, error, refetch } = useTutorOngoingTuitions()

    // Extract tuitions with fallback
    const ongoingTuitions = useMemo(() => data?.data || [], [data])

    // Calculate stats
    const stats = useMemo(() => {
        const totalSalary = ongoingTuitions.reduce((sum, t) => sum + (t.budget || 0), 0)
        return {
            activeTuitions: ongoingTuitions.length,
            monthlyIncome: totalSalary,
            totalStudents: ongoingTuitions.length,
        }
    }, [ongoingTuitions])

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-destructive">Failed to load ongoing tuitions</p>
                <Button onClick={() => refetch()} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold">Ongoing Tuitions</h1>
                <p className="text-muted-foreground">Your active tuition engagements with students</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Active Tuitions</CardDescription>
                        <CardTitle className="text-3xl">{stats.activeTuitions}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Monthly Income</CardDescription>
                        <CardTitle className="text-3xl">৳{stats.monthlyIncome.toLocaleString()}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Students</CardDescription>
                        <CardTitle className="text-3xl">{stats.totalStudents}</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                        <TuitionCardSkeleton key={i} />
                    ))}
                </div>
            ) : ongoingTuitions.length === 0 ? (
                // Empty State
                <Card>
                    <CardHeader className="text-center py-12">
                        <CardTitle>No Ongoing Tuitions</CardTitle>
                        <CardDescription>You don&apos;t have any active tuitions yet. Apply to tuitions to start teaching!</CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                // Ongoing Tuitions List
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {ongoingTuitions.map((tuition) => (
                        <TuitionCard key={tuition._id} tuition={tuition} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default OngoingTuitionsPage
