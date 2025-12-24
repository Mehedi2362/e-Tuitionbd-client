/**
 * Tutor Dashboard - My Applications Page
 * Track application status (Pending/Approved/Rejected)
 * Update/Delete applications (until approved) with real API
 */

import { useDeleteApplication, useTutorApplications, useUpdateApplication } from '@/features/dashboard/hooks'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import type { ApplicationStatus } from '@/types'
import { CheckCircle, Clock, Eye, Loader2, MoreHorizontal, Pencil, RefreshCw, Trash, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
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

// Status icon helper
const StatusIcon = ({ status }: { status: ApplicationStatus }) => {
    switch (status) {
        case 'approved':
            return <CheckCircle className="h-4 w-4 text-green-500" />
        case 'pending':
            return <Clock className="h-4 w-4 text-yellow-500" />
        case 'rejected':
            return <XCircle className="h-4 w-4 text-red-500" />
        default:
            return null
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
const TableSkeleton = () => (
    <>
        {[1, 2, 3].map((i) => (
            <TableRow key={i}>
                {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                    <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </>
)

const MyApplicationsPage = () => {
    const navigate = useNavigate()

    // State for edit dialog
    const [editApplication, setEditApplication] = useState<{
        _id: string
        qualifications: string
        experience: string
        expectedSalary: number
    } | null>(null)

    // Fetch applications from backend
    const { data, isLoading, error, refetch } = useTutorApplications()
    const updateMutation = useUpdateApplication()
    const deleteMutation = useDeleteApplication()

    // Extract applications with fallback
    const applications = useMemo(() => data?.data || [], [data])

    // Calculate stats
    const stats = useMemo(() => {
        return {
            total: applications.length,
            approved: applications.filter((a) => a.status === 'approved').length,
            pending: applications.filter((a) => a.status === 'pending').length,
            rejected: applications.filter((a) => a.status === 'rejected').length,
        }
    }, [applications])

    // Handle update
    const handleUpdate = () => {
        if (editApplication) {
            updateMutation.mutate(
                {
                    id: editApplication._id,
                    data: {
                        qualifications: editApplication.qualifications,
                        experience: editApplication.experience,
                        expectedSalary: editApplication.expectedSalary,
                    },
                },
                {
                    onSuccess: () => setEditApplication(null),
                }
            )
        }
    }

    // Handle delete
    const handleDelete = (id: string) => {
        deleteMutation.mutate(id)
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-destructive">Failed to load applications</p>
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
                <h1 className="text-2xl font-bold">My Applications</h1>
                <p className="text-muted-foreground">Track and manage your tuition applications</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Applications</CardDescription>
                        <CardTitle className="text-3xl">{stats.total}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Approved</CardDescription>
                        <CardTitle className="text-3xl text-green-600">{stats.approved}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Pending</CardDescription>
                        <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Rejected</CardDescription>
                        <CardTitle className="text-3xl text-red-600">{stats.rejected}</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Applications Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Applications</CardTitle>
                    <CardDescription>View and manage all your tuition applications</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tuition</TableHead>
                                <TableHead>Subject/Class</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Expected Salary</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Applied On</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableSkeleton />
                            ) : applications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8">
                                        <p className="text-muted-foreground">No applications found</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                applications.map((application) => (
                                    <TableRow key={application._id}>
                                        <TableCell className="font-medium">{application.tuition?.subject || 'N/A'}</TableCell>
                                        <TableCell>
                                            {application.tuition?.subject || 'N/A'} • {application.tuition?.class || 'N/A'}
                                        </TableCell>
                                        <TableCell>{application.tuition?.location || 'N/A'}</TableCell>
                                        <TableCell>৳{application.expectedSalary?.toLocaleString() || 0}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <StatusIcon status={application.status} />
                                                <Badge variant={getStatusVariant(application.status)}>{application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'N/A'}</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>{application.createdAt ? formatDate(application.createdAt) : 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => navigate(`/tuitions/${application.tuitionId}`)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Tuition
                                                    </DropdownMenuItem>

                                                    {/* Edit option (only for pending) */}
                                                    {application.status === 'pending' && (
                                                        <DropdownMenuItem
                                                            onSelect={(e) => {
                                                                e.preventDefault()
                                                                setEditApplication({
                                                                    _id: application._id,
                                                                    qualifications: application.qualifications,
                                                                    experience: application.experience,
                                                                    expectedSalary: application.expectedSalary,
                                                                })
                                                            }}
                                                        >
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    )}

                                                    {/* Delete option (only for pending) */}
                                                    {application.status === 'pending' && (
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                                                    {deleteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash className="mr-2 h-4 w-4" />}
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Application?</AlertDialogTitle>
                                                                    <AlertDialogDescription>Are you sure you want to delete this application? This action cannot be undone.</AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDelete(application._id)} className="bg-destructive text-destructive-foreground">
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Edit Application Dialog */}
            <Dialog open={!!editApplication} onOpenChange={() => setEditApplication(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Application</DialogTitle>
                        <DialogDescription>Update your application details</DialogDescription>
                    </DialogHeader>
                    {editApplication && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-qualifications">Qualifications</Label>
                                <Textarea
                                    id="edit-qualifications"
                                    value={editApplication.qualifications}
                                    onChange={(e) =>
                                        setEditApplication({
                                            ...editApplication,
                                            qualifications: e.target.value,
                                        })
                                    }
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-experience">Experience</Label>
                                <Textarea
                                    id="edit-experience"
                                    value={editApplication.experience}
                                    onChange={(e) =>
                                        setEditApplication({
                                            ...editApplication,
                                            experience: e.target.value,
                                        })
                                    }
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-salary">Expected Salary (৳/month)</Label>
                                <Input
                                    id="edit-salary"
                                    type="number"
                                    value={editApplication.expectedSalary}
                                    onChange={(e) =>
                                        setEditApplication({
                                            ...editApplication,
                                            expectedSalary: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditApplication(null)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
                            {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MyApplicationsPage
