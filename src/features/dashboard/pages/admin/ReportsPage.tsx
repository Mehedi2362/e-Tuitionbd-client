/**
 * Admin Dashboard - Reports & Analytics Page
 * Total platform earnings, transaction history, charts and graphs
 * Real API integration with fallback handling
 */

import { useAdminAnalytics, useAdminDashboard, useAdminPayments } from '@/features/dashboard/hooks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { PaymentStatus } from '@/types'
import { BookOpen, DollarSign, FileText, RefreshCw, TrendingUp, Users } from 'lucide-react'
import React, { useState } from 'react'

// Format date helper
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

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

const ReportsPage = () => {
    const [page, setPage] = useState(1)
    const limit = 10

    // Fetch analytics data from backend with real API
    const { data: dashboardData, isLoading: isLoadingDashboard, error: dashboardError, refetch: refetchDashboard } = useAdminDashboard()
    const { data: analyticsData, isLoading: isLoadingAnalytics } = useAdminAnalytics()
    const { data: paymentsData, isLoading: isLoadingPayments } = useAdminPayments({ page, limit })

    // Extract data with fallbacks
    const stats = dashboardData || {
        totalUsers: 0,
        totalTuitions: 0,
        totalApplications: 0,
        totalPayments: 0,
        totalRevenue: 0,
        recentTransactions: [],
    }

    const analytics = analyticsData || {
        revenue: [],
        usersByRole: [],
        tuitionsByStatus: [],
        applicationsByStatus: [],
    }

    const payments = paymentsData?.data || []

    // Error state
    if (dashboardError) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-destructive">Failed to load analytics data</p>
                <Button onClick={() => refetchDashboard()} variant="outline">
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
                <h1 className="text-2xl font-bold">Reports & Analytics</h1>
                <p className="text-muted-foreground">Platform performance and financial reports</p>
            </div>

            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoadingDashboard ? (
                    <>
                        {[1, 2, 3, 4].map((i) => (
                            <StatCardSkeleton key={i} />
                        ))}
                    </>
                ) : (
                    <>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Total Revenue</CardDescription>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl text-green-600">৳{stats.totalRevenue.toLocaleString()}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">All time earnings</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Total Users</CardDescription>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">{stats.totalUsers.toLocaleString()}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Registered users</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Total Tuitions</CardDescription>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">{stats.totalTuitions}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Posted tuitions</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Total Payments</CardDescription>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">{stats.totalPayments}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Completed transactions</p>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            {/* Tabs for different reports */}
            <Tabs defaultValue="transactions" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* Transactions Tab */}
                <TabsContent value="transactions" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>Latest payment transactions on the platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Tutor</TableHead>
                                        <TableHead>Tuition</TableHead>
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
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <p className="text-muted-foreground">No transactions yet</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        payments.map((payment) => (
                                            <TableRow key={payment._id}>
                                                <TableCell className="font-medium">{payment.student?.name || 'Unknown'}</TableCell>
                                                <TableCell>{payment.tutor?.name || 'Unknown'}</TableCell>
                                                <TableCell>{payment.tuition?.subject || 'Unknown'}</TableCell>
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

                            {/* Pagination */}
                            {!isLoadingPayments && payments.length > 0 && paymentsData?.pagination && (
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {(page - 1) * limit + 1} to {Math.min(page * limit, paymentsData.pagination.total)} of {paymentsData.pagination.total} transactions
                                    </p>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                                            </PaginationItem>

                                            {Array.from({ length: paymentsData.pagination.totalPages }, (_, i) => i + 1)
                                                .filter((p) => {
                                                    return p === 1 || p === paymentsData.pagination.totalPages || (p >= page - 1 && p <= page + 1)
                                                })
                                                .map((p, i, arr) => {
                                                    const showEllipsisBefore = i > 0 && p - arr[i - 1] > 1
                                                    return (
                                                        <React.Fragment key={p}>
                                                            {showEllipsisBefore && (
                                                                <PaginationItem>
                                                                    <PaginationEllipsis />
                                                                </PaginationItem>
                                                            )}
                                                            <PaginationItem>
                                                                <PaginationLink onClick={() => setPage(p)} isActive={page === p} className="cursor-pointer">
                                                                    {p}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        </React.Fragment>
                                                    )
                                                })}

                                            <PaginationItem>
                                                <PaginationNext onClick={() => setPage((p) => Math.min(paymentsData.pagination.totalPages, p + 1))} className={page === paymentsData.pagination.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Users by Role */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Users by Role
                                </CardTitle>
                                <CardDescription>Distribution of users by role</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoadingAnalytics ? (
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <Skeleton key={i} className="h-8 w-full" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {analytics.usersByRole.length === 0 ? (
                                            <p className="text-muted-foreground text-center py-4">No data available</p>
                                        ) : (
                                            analytics.usersByRole.map((item) => (
                                                <div key={item.role} className="flex items-center justify-between">
                                                    <span className="capitalize">{item.role}</span>
                                                    <Badge variant="outline">{item.count}</Badge>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Tuitions by Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Tuitions by Status
                                </CardTitle>
                                <CardDescription>Distribution of tuitions by status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoadingAnalytics ? (
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <Skeleton key={i} className="h-8 w-full" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {analytics.tuitionsByStatus.length === 0 ? (
                                            <p className="text-muted-foreground text-center py-4">No data available</p>
                                        ) : (
                                            analytics.tuitionsByStatus.map((item) => (
                                                <div key={item.status} className="flex items-center justify-between">
                                                    <span className="capitalize">{item.status}</span>
                                                    <Badge variant="outline">{item.count}</Badge>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Applications by Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Applications by Status
                                </CardTitle>
                                <CardDescription>Distribution of applications by status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoadingAnalytics ? (
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <Skeleton key={i} className="h-8 w-full" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {analytics.applicationsByStatus.length === 0 ? (
                                            <p className="text-muted-foreground text-center py-4">No data available</p>
                                        ) : (
                                            analytics.applicationsByStatus.map((item) => (
                                                <div key={item.status} className="flex items-center justify-between">
                                                    <span className="capitalize">{item.status}</span>
                                                    <Badge variant="outline">{item.count}</Badge>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Revenue Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Revenue Overview
                                </CardTitle>
                                <CardDescription>Monthly revenue breakdown</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoadingAnalytics ? (
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <Skeleton key={i} className="h-8 w-full" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {analytics.revenue.length === 0 ? (
                                            <p className="text-muted-foreground text-center py-4">No data available</p>
                                        ) : (
                                            analytics.revenue.slice(0, 6).map((item) => (
                                                <div key={item.month} className="flex items-center justify-between">
                                                    <span>{item.month}</span>
                                                    <Badge variant="outline">৳{item.amount.toLocaleString()}</Badge>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ReportsPage
