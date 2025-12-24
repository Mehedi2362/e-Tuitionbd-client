/**
 * Checkout Page
 * - Displays payment summary
 * - Initiates Stripe checkout
 */

import { useCreateCheckout } from '@/features/payments'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { CreditCard, Loader2, ShieldCheck, User } from 'lucide-react'
import { useParams, useNavigate } from 'react-router'
import { privateAxios } from '@/services'

// ==================== Types ====================
interface Application {
    _id: string
    tuitionId: string
    tutorId: string
    tutorName: string
    tutorEmail: string
    qualifications: string
    experience: string
    expectedSalary: number
    status: string
    tuition?: {
        title: string
        subject: string
        class: string
        location: string
    }
}

// ==================== Component ====================
export default function CheckoutPage() {
    const { applicationId } = useParams<{ applicationId: string }>()
    const navigate = useNavigate()
    const createCheckout = useCreateCheckout()

    // Fetch application details
    const {
        data: application,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['application', applicationId],
        queryFn: () => privateAxios.get(`/applications/${applicationId}`).then((res) => res.data.data as Application),
        enabled: !!applicationId,
    })

    // Handle checkout
    const handleCheckout = () => {
        if (!applicationId) return
        createCheckout.mutate({ applicationId })
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="container mx-auto max-w-2xl py-8 px-4">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Error state
    if (error || !application) {
        return (
            <div className="container mx-auto max-w-2xl py-8 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-destructive">ত্রুটি</CardTitle>
                        <CardDescription>অ্যাপ্লিকেশন লোড করতে সমস্যা হয়েছে।</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant="outline" onClick={() => navigate(-1)}>
                            ফিরে যান
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    // Check if application is approved
    if (application.status !== 'approved') {
        return (
            <div className="container mx-auto max-w-2xl py-8 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>পেমেন্ট অনুমোদিত নয়</CardTitle>
                        <CardDescription>শুধুমাত্র অনুমোদিত অ্যাপ্লিকেশনের জন্য পেমেন্ট করা যায়।</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="secondary">{application.status}</Badge>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => navigate(-1)}>
                            ফিরে যান
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    const platformFee = Math.round(application.expectedSalary * 0.1)
    const totalAmount = application.expectedSalary

    return (
        <div className="container mx-auto max-w-2xl py-8 px-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CreditCard className="h-6 w-6 text-primary" />
                        <CardTitle>পেমেন্ট চেকআউট</CardTitle>
                    </div>
                    <CardDescription>টিউশন পেমেন্ট সম্পন্ন করুন</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Tuition Details */}
                    {application.tuition && (
                        <div className="rounded-lg border p-4">
                            <h3 className="font-semibold mb-2">টিউশন বিবরণ</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="text-muted-foreground">বিষয়:</span>
                                <span>{application.tuition.subject}</span>
                                <span className="text-muted-foreground">ক্লাস:</span>
                                <span>{application.tuition.class}</span>
                                <span className="text-muted-foreground">অবস্থান:</span>
                                <span>{application.tuition.location}</span>
                            </div>
                        </div>
                    )}

                    {/* Tutor Details */}
                    <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4" />
                            <h3 className="font-semibold">টিউটর তথ্য</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">নাম:</span>
                            <span>{application.tutorName}</span>
                            <span className="text-muted-foreground">অভিজ্ঞতা:</span>
                            <span>{application.experience}</span>
                            <span className="text-muted-foreground">যোগ্যতা:</span>
                            <span>{application.qualifications}</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Payment Summary */}
                    <div className="space-y-2">
                        <h3 className="font-semibold">পেমেন্ট সারাংশ</h3>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">টিউটর ফি:</span>
                            <span>৳{(application.expectedSalary - platformFee).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">প্ল্যাটফর্ম ফি (10%):</span>
                            <span>৳{platformFee.toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                            <span>মোট:</span>
                            <span className="text-primary">৳{totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>আপনার পেমেন্ট Stripe দ্বারা সুরক্ষিত</span>
                    </div>
                </CardContent>

                <CardFooter className="flex gap-4">
                    <Button variant="outline" onClick={() => navigate(-1)} disabled={createCheckout.isPending}>
                        বাতিল
                    </Button>
                    <Button onClick={handleCheckout} disabled={createCheckout.isPending} className="flex-1">
                        {createCheckout.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                প্রসেসিং...
                            </>
                        ) : (
                            <>
                                <CreditCard className="mr-2 h-4 w-4" />
                                পেমেন্ট করুন ৳{totalAmount.toLocaleString()}
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
