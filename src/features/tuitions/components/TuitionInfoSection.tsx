import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BookOpen, Calendar, Clock, DollarSign, GraduationCap, MapPin } from 'lucide-react'
import type { Tuition } from '@/types'

interface TuitionInfoSectionProps {
    tuition: Tuition
}

// Get badge variant based on status
const getStatusBadge = (status: Tuition['status']) => {
    const variants = {
        pending: { variant: 'outline' as const, label: 'Pending', className: 'border-yellow-500 text-yellow-600' },
        approved: { variant: 'secondary' as const, label: 'Approved', className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' },
        rejected: { variant: 'destructive' as const, label: 'Rejected', className: '' },
        completed: { variant: 'default' as const, label: 'Completed', className: 'bg-blue-600' },
    }
    return variants[status]
}

// Format date
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })
}

const TuitionInfoSection = ({ tuition }: TuitionInfoSectionProps) => {
    const statusBadge = getStatusBadge(tuition.status)

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl mb-2">{tuition.subject}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Posted {formatDate(tuition.createdAt)}
                        </CardDescription>
                    </div>
                    <Badge variant={statusBadge.variant} className={statusBadge.className}>
                        {statusBadge.label}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary shrink-0" />
                        <div>
                            <p className="text-sm text-muted-foreground">Subject</p>
                            <p className="font-medium">{tuition.subject}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary shrink-0" />
                        <div>
                            <p className="text-sm text-muted-foreground">Class</p>
                            <p className="font-medium">{tuition.class}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary shrink-0" />
                        <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{tuition.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary shrink-0" />
                        <div>
                            <p className="text-sm text-muted-foreground">Budget</p>
                            <p className="font-medium">৳{tuition.budget.toLocaleString()}/month</p>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Schedule */}
                <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Schedule
                    </h3>
                    <p className="text-muted-foreground">{tuition.schedule}</p>
                </div>

                <Separator />

                {/* Description */}
                {tuition.description && (
                    <>
                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-muted-foreground leading-relaxed">{tuition.description}</p>
                        </div>
                        <Separator />
                    </>
                )}

                {/* Requirements */}
                {tuition.requirements && (
                    <div>
                        <h3 className="font-semibold mb-2">Requirements</h3>
                        <p className="text-muted-foreground">{tuition.requirements}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default TuitionInfoSection
