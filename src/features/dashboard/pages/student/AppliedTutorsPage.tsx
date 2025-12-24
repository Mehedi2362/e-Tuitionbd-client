/**
 * Applied Tutors Page (Student Dashboard)
 * - View tutor applications for each tuition
 * - Accept/Reject applications with real API
 */

import { getCheckoutRoute } from '@/features/payments/constants'
import { useAcceptApplication, useApplicationsByTuition, useMyTuitions, useRejectApplication } from '@/features/tuitions'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import type { Application, ApplicationStatus, Tuition } from '@/types'
import { Briefcase, Check, DollarSign, GraduationCap, Loader2, Mail, Phone, RefreshCw, X } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'

// Status badge variant helper
const getStatusVariant = (status: ApplicationStatus) => {
    switch (status) {
        case 'approved':
            return 'default'
        case 'pending':
            return 'secondary'
        case 'rejected':
            return 'destructive'
        default:
            return 'outline'
    }
}

// Loading Skeleton
const ApplicationSkeleton = () => (
    <div className="space-y-4">
        {[1, 2].map((i) => (
            <Card key={i}>
                <CardContent className="p-4">
                    <div className="flex gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-60" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

// Application Card Component
const ApplicationCard = ({ application, onAccept, onReject, isAccepting, isRejecting }: { application: Application; onAccept: (id: string) => void; onReject: (id: string) => void; isAccepting: boolean; isRejecting: boolean }) => {
    const tutor = application.tutor

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Tutor Info */}
                    <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={tutor?.photoUrl} />
                            <AvatarFallback>
                                {tutor?.name
                                    ?.split(' ')
                                    .map((n) => n[0])
                                    .join('') || 'T'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{tutor?.name || 'Unknown Tutor'}</h3>
                                <Badge variant={getStatusVariant(application.status)}>{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</Badge>
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                {tutor?.email && (
                                    <span className="flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        {tutor.email}
                                    </span>
                                )}
                                {tutor?.phone && (
                                    <span className="flex items-center gap-1">
                                        <Phone className="h-4 w-4" />
                                        {tutor.phone}
                                    </span>
                                )}
                            </div>

                            <Separator />

                            {/* Qualifications */}
                            <div className="flex items-start gap-2">
                                <GraduationCap className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">যোগ্যতা</p>
                                    <p className="text-sm text-muted-foreground">{application.qualifications}</p>
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="flex items-start gap-2">
                                <Briefcase className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">অভিজ্ঞতা</p>
                                    <p className="text-sm text-muted-foreground">{application.experience}</p>
                                </div>
                            </div>

                            {/* Expected Salary */}
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm">
                                    <span className="font-medium">প্রত্যাশিত বেতন:</span> ৳{application.expectedSalary.toLocaleString()}/মাস
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {application.status === 'pending' && (
                        <div className="flex flex-row md:flex-col gap-2 justify-end">
                            {/* Accept Button */}
                            <Button onClick={() => onAccept(application._id)} className="flex-1 md:flex-none" disabled={isAccepting || isRejecting}>
                                {isAccepting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                                গ্রহণ করুন
                            </Button>

                            {/* Reject Button with Confirmation */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="flex-1 md:flex-none" disabled={isAccepting || isRejecting}>
                                        {isRejecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <X className="mr-2 h-4 w-4" />}
                                        প্রত্যাখ্যান
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>আবেদন প্রত্যাখ্যান করবেন?</AlertDialogTitle>
                                        <AlertDialogDescription>আপনি কি নিশ্চিত যে এই টিউটরের আবেদন প্রত্যাখ্যান করতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>বাতিল</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onReject(application._id)} className="bg-destructive text-destructive-foreground">
                                            প্রত্যাখ্যান করুন
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

// Tuition Applications Section
const TuitionApplicationsSection = ({ tuition }: { tuition: Tuition }) => {
    const navigate = useNavigate()
    const { data: applications, isLoading } = useApplicationsByTuition(tuition._id)
    const acceptMutation = useAcceptApplication()
    const rejectMutation = useRejectApplication()

    const handleAccept = (applicationId: string) => {
        acceptMutation.mutate(applicationId, {
            onSuccess: () => {
                navigate(getCheckoutRoute(applicationId))
            },
        })
    }

    const handleReject = (applicationId: string) => {
        rejectMutation.mutate(applicationId)
    }

    const applicationCount = applications?.length || 0

    return (
        <AccordionItem value={tuition._id} className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                    <div>
                        <p className="font-semibold">{tuition.subject}</p>
                        <p className="text-sm text-muted-foreground">
                            {tuition.class} • বাজেট: ৳{tuition.budget.toLocaleString()}
                        </p>
                    </div>
                    <Badge variant="outline" className="ml-auto mr-4">
                        {applicationCount} আবেদন
                    </Badge>
                </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">{isLoading ? <ApplicationSkeleton /> : applicationCount === 0 ? <p className="text-muted-foreground text-center py-4">এখনো কোনো আবেদন আসেনি</p> : applications?.map((application) => <ApplicationCard key={application._id} application={application} onAccept={handleAccept} onReject={handleReject} isAccepting={acceptMutation.isPending} isRejecting={rejectMutation.isPending} />)}</div>
            </AccordionContent>
        </AccordionItem>
    )
}

const AppliedTutorsPage = () => {
    // Fetch my tuitions
    const { data, isLoading, error, refetch } = useMyTuitions()

    // Only show approved tuitions (tutors can only apply to approved)
    const approvedTuitions = useMemo(() => {
        return data?.data?.filter((t) => t.status === 'approved') || []
    }, [data])

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-destructive">কিছু ভুল হয়েছে। আবার চেষ্টা করুন।</p>
                <Button onClick={() => refetch()} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    পুনরায় লোড করুন
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold">আবেদনকারী টিউটর</h1>
                <p className="text-muted-foreground">আপনার টিউশনের জন্য টিউটরদের আবেদন পর্যালোচনা ও পরিচালনা করুন</p>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="border rounded-lg p-4">
                            <Skeleton className="h-6 w-60 mb-2" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    ))}
                </div>
            ) : approvedTuitions.length === 0 ? (
                // Empty State
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>কোনো অনুমোদিত টিউশন নেই</CardTitle>
                        <CardDescription>আপনার অনুমোদিত টিউশন না থাকলে টিউটররা আবেদন করতে পারবে না। নতুন টিউশন পোস্ট করুন এবং অনুমোদনের জন্য অপেক্ষা করুন।</CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                // Tuitions with Applications
                <Accordion type="single" collapsible className="space-y-4">
                    {approvedTuitions.map((tuition) => (
                        <TuitionApplicationsSection key={tuition._id} tuition={tuition} />
                    ))}
                </Accordion>
            )}
        </div>
    )
}

export default AppliedTutorsPage
