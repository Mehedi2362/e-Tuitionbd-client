/**
 * Admin Dashboard - Tuition Management Page
 * View all tuition posts, approve/reject with real API
 */

import { useAdminTuitions, useUpdateTuitionStatus } from '@/features/dashboard/hooks'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { TuitionStatus } from '@/types'
import { BookOpen, Calendar, Check, CheckCircle, Clock, DollarSign, Eye, FileText, Loader2, MapPin, RefreshCw, Search, X, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

// Status badge variant helper
const getStatusVariant = (status: TuitionStatus) => {
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

// Format date helper
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

// Loading Skeleton
const StatCardSkeleton = () => (
    <Card>
        <CardHeader className="pb-2">
            <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-8 w-16" />
        </CardContent>
    </Card>
)

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

const TuitionManagementPage = () => {
    // State for search and filters
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    // Fetch all tuitions from backend with real API
    const { data, isLoading, error, refetch } = useAdminTuitions({
        search: searchQuery || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
    })

    // Mutations
    const updateStatusMutation = useUpdateTuitionStatus()

    // Extract tuitions with fallback
    const tuitions = data?.data || []
    const total = data?.pagination?.total || tuitions.length

    // Calculate stats
    const stats = useMemo(() => {
        return {
            total: total || 0,
            pending: tuitions.filter((t) => t.status === 'pending').length,
            approved: tuitions.filter((t) => t.status === 'approved').length,
            rejected: tuitions.filter((t) => t.status === 'rejected').length,
        }
    }, [tuitions, total])

    // Handle approve
    const handleApprove = (tuitionId: string) => {
        updateStatusMutation.mutate({ id: tuitionId, status: 'approved' })
    }

    // Handle reject
    const handleReject = (tuitionId: string) => {
        updateStatusMutation.mutate({ id: tuitionId, status: 'rejected' })
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-destructive">Failed to load tuitions</p>
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
                <h1 className="text-2xl font-bold">Tuition Management</h1>
                <p className="text-muted-foreground">Review and manage all tuition posts</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {isLoading ? (
                    <>
                        {[1, 2, 3, 4].map((i) => (
                            <StatCardSkeleton key={i} />
                        ))}
                    </>
                ) : (
                    <>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Total Tuitions</CardDescription>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">{stats.total}</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Pending Review</CardDescription>
                                <Clock className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl text-yellow-600">{stats.pending}</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Approved</CardDescription>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl text-green-600">{stats.approved}</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Rejected</CardDescription>
                                <XCircle className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl text-red-600">{stats.rejected}</CardTitle>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            {/* Search and Filter */}
            <Card>
                <CardHeader>
                    <CardTitle>All Tuitions</CardTitle>
                    <CardDescription>Review and approve/reject tuition posts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search and Filter Row */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by subject or location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tuitions Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Budget</TableHead>
                                    <TableHead>Posted By</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableSkeleton />
                                ) : tuitions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8">
                                            <p className="text-muted-foreground">No tuitions found</p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tuitions.map((tuition) => (
                                        <TableRow key={tuition._id}>
                                            <TableCell className="font-medium">{tuition.subject || 'N/A'}</TableCell>
                                            <TableCell>{tuition.class || 'N/A'}</TableCell>
                                            <TableCell>{tuition.location || 'N/A'}</TableCell>
                                            <TableCell>৳{tuition.budget?.toLocaleString() || 0}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{tuition.studentName || 'Unknown'}</p>
                                                    <p className="text-xs text-muted-foreground">{tuition.studentEmail || 'N/A'}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(tuition.status)}>{tuition.status?.charAt(0).toUpperCase() + tuition.status?.slice(1) || 'N/A'}</Badge>
                                            </TableCell>
                                            <TableCell>{tuition.createdAt ? formatDate(tuition.createdAt) : 'N/A'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* View Details Button */}
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-2xl">
                                                            <DialogHeader>
                                                                <DialogTitle>{tuition.subject || 'Tuition Details'}</DialogTitle>
                                                                <DialogDescription>
                                                                    Posted by {tuition.studentName || 'Unknown'} on {tuition.createdAt ? formatDate(tuition.createdAt) : 'N/A'}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-4 py-4">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                                        <span>Subject: {tuition.subject || 'N/A'}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span>Class: {tuition.class || 'N/A'}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                        <span>Location: {tuition.location || 'N/A'}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                                        <span>Budget: ৳{tuition.budget?.toLocaleString() || 0}</span>
                                                                    </div>
                                                                </div>
                                                                {tuition.schedule && (
                                                                    <div className="flex items-center gap-2">
                                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                                        <span>Schedule: {tuition.schedule}</span>
                                                                    </div>
                                                                )}
                                                                <Separator />
                                                                {tuition.description && (
                                                                    <div>
                                                                        <h4 className="font-medium mb-2">Description</h4>
                                                                        <p className="text-muted-foreground">{tuition.description}</p>
                                                                    </div>
                                                                )}
                                                                {tuition.requirements && (
                                                                    <div>
                                                                        <h4 className="font-medium mb-2">Requirements</h4>
                                                                        <p className="text-muted-foreground">{tuition.requirements}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    {/* Approve/Reject Buttons (only for pending) */}
                                                    {tuition.status === 'pending' && (
                                                        <>
                                                            {/* Approve Button */}
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="ghost" size="icon" disabled={updateStatusMutation.isPending}>
                                                                        {updateStatusMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 text-green-500" />}
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Approve Tuition?</AlertDialogTitle>
                                                                        <AlertDialogDescription>This will make the tuition visible to tutors who can then apply for it.</AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleApprove(tuition._id)} className="bg-green-600 hover:bg-green-700">
                                                                            Approve
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>

                                                            {/* Reject Button */}
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="ghost" size="icon" disabled={updateStatusMutation.isPending}>
                                                                        {updateStatusMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4 text-red-500" />}
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Reject Tuition?</AlertDialogTitle>
                                                                        <AlertDialogDescription>This tuition will be rejected and won&apos;t be visible to tutors.</AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleReject(tuition._id)} className="bg-destructive text-destructive-foreground">
                                                                            Reject
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default TuitionManagementPage
