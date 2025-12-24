/**
 * Payment Success Page
 * - Displays payment confirmation
 * - Verifies payment with backend
 */

import { useVerifyPayment } from '@/features/payments'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle2, Home, LayoutDashboard, XCircle } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router'

export default function PaymentSuccessPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const sessionId = searchParams.get('session_id') || ''

    const { data: payment, isLoading, error } = useVerifyPayment(sessionId)

    // Loading state
    if (isLoading) {
        return (
            <div className="container mx-auto max-w-lg py-16 px-4">
                <Card>
                    <CardHeader className="text-center">
                        <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                        <Skeleton className="h-8 w-48 mx-auto mt-4" />
                        <Skeleton className="h-4 w-64 mx-auto mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Error state
    if (error || !payment) {
        return (
            <div className="container mx-auto max-w-lg py-16 px-4">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                            <XCircle className="h-10 w-10 text-destructive" />
                        </div>
                        <CardTitle className="mt-4 text-destructive">পেমেন্ট ভেরিফিকেশন ব্যর্থ</CardTitle>
                        <CardDescription>
                            আপনার পেমেন্ট ভেরিফাই করতে সমস্যা হয়েছে। অনুগ্রহ করে সাপোর্টে যোগাযোগ করুন।
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center gap-4">
                        <Button variant="outline" onClick={() => navigate('/')}>
                            <Home className="mr-2 h-4 w-4" />
                            হোমে যান
                        </Button>
                        <Button onClick={() => navigate('/student/payments')}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            ড্যাশবোর্ড
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    // Success state
    return (
        <div className="container mx-auto max-w-lg py-16 px-4">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="mt-4 text-green-600">পেমেন্ট সফল!</CardTitle>
                    <CardDescription>আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Payment Details */}
                    <div className="rounded-lg border p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">পেমেন্ট আইডি:</span>
                            <span className="font-mono">{payment._id?.slice(-8) || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">পরিমাণ:</span>
                            <span className="font-semibold text-primary">৳{payment.amount?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">স্ট্যাটাস:</span>
                            <span className="text-green-600 font-medium">সম্পন্ন</span>
                        </div>
                        {payment.paidAt && (
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">তারিখ:</span>
                                <span>
                                    {new Date(payment.paidAt).toLocaleDateString('bn-BD', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground text-center">
                        আপনার টিউটরের সাথে যোগাযোগ করুন এবং ক্লাস শুরু করুন!
                    </p>
                </CardContent>

                <CardFooter className="justify-center gap-4">
                    <Button variant="outline" onClick={() => navigate('/')}>
                        <Home className="mr-2 h-4 w-4" />
                        হোমে যান
                    </Button>
                    <Button onClick={() => navigate('/student/payments')}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        পেমেন্ট হিস্ট্রি
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
