/**
 * Tutor Dashboard - Revenue History Page
 * Total earnings display and transaction history with real API data
 */

import { useTutorEarnings, useTutorPayments } from '@/features/dashboard/hooks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { PaymentStatus } from '@/types'
import { Calendar, CreditCard, DollarSign, RefreshCw, TrendingUp } from 'lucide-react'
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

// Format date helper
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

// Loading Skeleton
const StatCardSkeleton = () => (
    <Card>
        <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-8 w-32" />
        </CardContent>
    </Card>
)

const TableSkeleton = () => (
    <>
        {[1, 2, 3].map((i) => (
            <TableRow key={i}>
                {[1, 2, 3, 4, 5].map((j) => (
                    <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </>
)

const RevenuePage = () => {
    // Fetch revenue data with real API
    const { data: earningsData, isLoading: isLoadingEarnings, error: earningsError, refetch: refetchEarnings } = useTutorEarnings()
    const { data: paymentsData, isLoading: isLoadingPayments } = useTutorPayments()

    // Extract data with fallbacks
    const earnings = useMemo(
        () =>
            earningsData || {
                totalEarnings: 0,
                pendingEarnings: 0,
                paidEarnings: 0,
                transactions: [],
            },
        [earningsData]
    )

    const payments = useMemo(() => paymentsData?.data || [], [paymentsData])

    // Calculate stats from real data
    const stats = useMemo(() => {
        const thisMonth = payments.filter((p) => {
            const paymentDate = new Date(p.createdAt)
            const now = new Date()
            return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear() && p.status === 'completed'
        })

        const thisMonthTotal = thisMonth.reduce((sum, p) => sum + p.amount, 0)

        // Calculate last 6 months average
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

        const lastSixMonths = payments.filter((p) => {
            const paymentDate = new Date(p.createdAt)
            return paymentDate >= sixMonthsAgo && p.status === 'completed'
        })

        const averageMonthly = lastSixMonths.length > 0 ? lastSixMonths.reduce((sum, p) => sum + p.amount, 0) / 6 : 0

        return {
            totalEarnings: earnings.totalEarnings || 0,
            pendingAmount: earnings.pendingEarnings || 0,
            thisMonthTotal,
            averageMonthly: Math.round(averageMonthly),
        }
    }, [earnings, payments])

    // Error state
    if (earningsError) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-destructive">Failed to load revenue data</p>
                <Button onClick={() => refetchEarnings()} variant="outline">
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
                <h1 className="text-2xl font-bold">Revenue History</h1>
                <p className="text-muted-foreground">Track your earnings and transactions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {isLoadingEarnings ? (
                    <>
                        {[1, 2, 3, 4].map((i) => (
                            <StatCardSkeleton key={i} />
                        ))}
                    </>
                ) : (
                    <>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Total Earnings</CardDescription>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl text-green-600">৳{stats.totalEarnings.toLocaleString()}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">All time</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Pending</CardDescription>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl text-yellow-600">৳{stats.pendingAmount.toLocaleString()}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>This Month</CardDescription>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">৳{stats.thisMonthTotal.toLocaleString()}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Current month earnings</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Average/Month</CardDescription>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">৳{stats.averageMonthly.toLocaleString()}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            {/* Transaction History Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>All your payment transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tuition</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoadingPayments ? (
                                <TableSkeleton />
                            ) : payments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        <p className="text-muted-foreground">No transactions yet</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                payments.map((payment) => (
                                    <TableRow key={payment._id}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{payment.tuition?.subject || 'Unknown'}</p>
                                                <p className="text-sm text-muted-foreground">{payment.tuition?.class || 'N/A'}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{payment.student?.name || 'Unknown'}</TableCell>
                                        <TableCell className="font-medium">৳{payment.amount.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={getPaymentStatusVariant(payment.status)}>{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</Badge>
                                        </TableCell>
                                        <TableCell>{formatDate(payment.createdAt)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default RevenuePage
