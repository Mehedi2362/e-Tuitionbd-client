/**
 * Payments Page (Student Dashboard)
 * - View payment history with real API
 * - Transaction details and stats
 */

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useMyPayments } from '@/features/payments'
import type { Payment, PaymentStatus } from '@/types'
import { Calendar, CheckCircle, CreditCard, RefreshCw, TrendingUp, XCircle } from 'lucide-react'
import { useMemo } from 'react'

// Status badge variant helper
const getPaymentStatusVariant = (status: PaymentStatus) => {
    switch (status) {
        case 'completed':
            return 'default'
        case 'pending':
            return 'secondary'
        case 'failed':
            return 'destructive'
        case 'refunded':
            return 'outline'
        default:
            return 'outline'
    }
}

// Status label helper (Bangla)
const getStatusLabel = (status: PaymentStatus) => {
    switch (status) {
        case 'completed':
            return 'সম্পন্ন'
        case 'pending':
            return 'পেন্ডিং'
        case 'failed':
            return 'ব্যর্থ'
        case 'refunded':
            return 'ফেরত'
        default:
            return status
    }
}

// Format date helper
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

// Stats Card Component
const StatCard = ({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color?: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>{label}</CardDescription>
            <Icon className={`h-4 w-4 ${color || 'text-muted-foreground'}`} />
        </CardHeader>
        <CardContent>
            <CardTitle className={`text-2xl ${color || ''}`}>{value}</CardTitle>
        </CardContent>
    </Card>
)

// Loading Skeleton
const TableSkeleton = () => (
    <>
        {[1, 2, 3].map((i) => (
            <TableRow key={i}>
                {[1, 2, 3, 4, 5, 6].map((j) => (
                    <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </>
)

// Payment Row Component
const PaymentRow = ({ payment }: { payment: Payment }) => (
    <TableRow>
        <TableCell className="font-mono text-xs">{payment.stripePaymentId || payment._id.slice(-8)}</TableCell>
        <TableCell>
            <div>
                <p className="font-medium">{payment.tuition?.subject || 'Unknown'}</p>
                <p className="text-xs text-muted-foreground">{payment.tuition?.subject}</p>
            </div>
        </TableCell>
        <TableCell>{payment.tutor?.name || 'Unknown'}</TableCell>
        <TableCell className="font-medium">৳{payment.amount.toLocaleString()}</TableCell>
        <TableCell>
            <Badge variant={getPaymentStatusVariant(payment.status)}>{getStatusLabel(payment.status)}</Badge>
        </TableCell>
        <TableCell>{formatDate(payment.createdAt)}</TableCell>
    </TableRow>
)

const PaymentsPage = () => {
    // Fetch payments with real API
    const { data, isLoading, error, refetch } = useMyPayments()

    // Extract payments from response
    const payments = data?.data || []

    // Calculate stats
    const stats = useMemo(() => {
        const completed = payments.filter((p) => p.status === 'completed')
        const thisMonth = payments.filter((p) => {
            const paymentDate = new Date(p.createdAt)
            const now = new Date()
            return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()
        })

        return {
            totalSpent: completed.reduce((sum, p) => sum + p.amount, 0),
            totalTransactions: payments.length,
            completedCount: completed.length,
            thisMonthSpent: thisMonth.filter((p) => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
        }
    }, [payments])

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
                <h1 className="text-2xl font-bold">পেমেন্ট</h1>
                <p className="text-muted-foreground">আপনার পেমেন্ট ইতিহাস এবং লেনদেন দেখুন</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="মোট খরচ" value={`৳${stats.totalSpent.toLocaleString()}`} icon={TrendingUp} />
                <StatCard label="মোট লেনদেন" value={stats.totalTransactions} icon={CreditCard} />
                <StatCard label="সম্পন্ন" value={stats.completedCount} icon={CheckCircle} color="text-green-600" />
                <StatCard label="এই মাসে" value={`৳${stats.thisMonthSpent.toLocaleString()}`} icon={Calendar} />
            </div>

            {/* Payment History Table */}
            <Card>
                <CardHeader>
                    <CardTitle>পেমেন্ট ইতিহাস</CardTitle>
                    <CardDescription>আপনার সকল পেমেন্ট লেনদেন</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ট্রানজ্যাকশন আইডি</TableHead>
                                <TableHead>টিউশন</TableHead>
                                <TableHead>টিউটর</TableHead>
                                <TableHead>পরিমাণ</TableHead>
                                <TableHead>স্ট্যাটাস</TableHead>
                                <TableHead>তারিখ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableSkeleton />
                            ) : payments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">
                                        <div className="flex flex-col items-center gap-2">
                                            <XCircle className="h-8 w-8 text-muted-foreground" />
                                            <p className="text-muted-foreground">এখনো কোনো পেমেন্ট করা হয়নি</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                payments.map((payment) => <PaymentRow key={payment._id} payment={payment} />)
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default PaymentsPage
