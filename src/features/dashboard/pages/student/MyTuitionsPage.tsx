/**
 * My Tuitions Page (Student Dashboard)
 * - View all posted tuitions with real API data
 * - Edit/Delete functionality
 * - Status filtering
 */

import { STUDENT_POST_TUITION } from '@/features/dashboard/constants'
import { useDeleteTuition, useMyTuitions } from '@/features/tuitions'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Tuition, TuitionStatus } from '@/types'
import { Eye, Loader2, MoreHorizontal, Pencil, Plus, RefreshCw, Trash } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router'

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
    return new Date(dateString).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

// Stats Card Component
const StatCard = ({ label, value, color }: { label: string; value: number; color?: string }) => (
    <Card>
        <CardHeader className="pb-2">
            <CardDescription>{label}</CardDescription>
            <CardTitle className={`text-3xl ${color || ''}`}>{value}</CardTitle>
        </CardHeader>
    </Card>
)

// Loading Skeleton
const TableSkeleton = () => (
    <>
        {[1, 2, 3].map((i) => (
            <TableRow key={i}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                    <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </>
)

// Tuition Row Component
const TuitionRow = ({ tuition, onDelete, isDeleting }: { tuition: Tuition; onDelete: (id: string) => void; isDeleting: boolean }) => {
    const navigate = useNavigate()

    return (
        <TableRow>
            <TableCell className="font-medium max-w-[200px] truncate">{tuition.subject}</TableCell>
            <TableCell>{tuition.subject}</TableCell>
            <TableCell>{tuition.class}</TableCell>
            <TableCell>{tuition.location}</TableCell>
            <TableCell>৳{tuition.budget.toLocaleString()}</TableCell>
            <TableCell>
                <Badge variant={getStatusVariant(tuition.status)}>{tuition.status.charAt(0).toUpperCase() + tuition.status.slice(1)}</Badge>
            </TableCell>
            <TableCell>{formatDate(tuition.createdAt)}</TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/tuitions/${tuition._id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                        {tuition.status !== 'approved' && (
                            <DropdownMenuItem onClick={() => navigate(`/dashboard/student/tuitions/${tuition._id}/edit`)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                        )}
                        {/* Delete with confirmation */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive" disabled={isDeleting}>
                                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash className="mr-2 h-4 w-4" />}
                                    Delete
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
                                    <AlertDialogDescription>এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। এটি স্থায়ীভাবে আপনার টিউশন পোস্ট মুছে ফেলবে।</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>বাতিল</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onDelete(tuition._id)} className="bg-destructive text-destructive-foreground">
                                        মুছে ফেলুন
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

const MyTuitionsPage = () => {
    // Fetch tuitions with real API
    const { data, isLoading, error, refetch } = useMyTuitions()
    const deleteMutation = useDeleteTuition()

    // Extract tuitions from response
    const tuitions = data?.data || []

    // Calculate stats
    const stats = useMemo(() => {
        return {
            total: tuitions.length,
            approved: tuitions.filter((t) => t.status === 'approved').length,
            pending: tuitions.filter((t) => t.status === 'pending').length,
            rejected: tuitions.filter((t) => t.status === 'rejected').length,
        }
    }, [tuitions])

    // Handle delete
    const handleDelete = (id: string) => {
        deleteMutation.mutate(id)
    }

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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">আমার টিউশন</h1>
                    <p className="text-muted-foreground">আপনার পোস্ট করা টিউশন অনুরোধগুলো পরিচালনা করুন</p>
                </div>
                <Button asChild>
                    <Link to={STUDENT_POST_TUITION}>
                        <Plus className="mr-2 h-4 w-4" />
                        নতুন টিউশন পোস্ট
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="মোট পোস্ট" value={stats.total} />
                <StatCard label="অনুমোদিত" value={stats.approved} color="text-green-600" />
                <StatCard label="পেন্ডিং" value={stats.pending} color="text-yellow-600" />
                <StatCard label="প্রত্যাখ্যাত" value={stats.rejected} color="text-red-600" />
            </div>

            {/* Tuitions Table */}
            <Card>
                <CardHeader>
                    <CardTitle>সকল টিউশন</CardTitle>
                    <CardDescription>আপনার সকল টিউশন পোস্ট দেখুন এবং পরিচালনা করুন</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>শিরোনাম</TableHead>
                                <TableHead>বিষয়</TableHead>
                                <TableHead>ক্লাস</TableHead>
                                <TableHead>অবস্থান</TableHead>
                                <TableHead>বাজেট</TableHead>
                                <TableHead>স্ট্যাটাস</TableHead>
                                <TableHead>পোস্টের তারিখ</TableHead>
                                <TableHead className="text-right">অ্যাকশন</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableSkeleton />
                            ) : tuitions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                        কোনো টিউশন পোস্ট পাওয়া যায়নি।{' '}
                                        <Link to={STUDENT_POST_TUITION} className="text-primary hover:underline">
                                            এখনই পোস্ট করুন
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tuitions.map((tuition) => <TuitionRow key={tuition._id} tuition={tuition} onDelete={handleDelete} isDeleting={deleteMutation.isPending} />)
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default MyTuitionsPage
