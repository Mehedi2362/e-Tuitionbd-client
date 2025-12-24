// #TODO: Tutor Dashboard - My Applications Page
// #TODO: Track application status (Pending/Approved/Rejected)
// #TODO: Update application (until approved)
// #TODO: Delete application (until approved)

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, Clock, Eye, MoreHorizontal, Pencil, Trash, XCircle } from 'lucide-react'
import { useState } from 'react'

// #TODO: Status badge variant helper
const getStatusVariant = (status: string) => {
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

// #TODO: Status icon helper
const StatusIcon = ({ status }: { status: string }) => {
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

const MyApplicationsPage = () => {
    // #TODO: State for edit dialog
    const [editApplication, setEditApplication] = useState<{
        _id: string
        qualifications: string
        experience: string
        expectedSalary: number
    } | null>(null)

    // #TODO: Fetch my applications from backend
    // const { data: applications, isLoading, refetch } = useQuery({
    //   queryKey: ['my-applications'],
    //   queryFn: fetchMyApplications,
    // });

    // #TODO: Update application mutation
    // const updateMutation = useMutation({
    //   mutationFn: updateApplication,
    //   onSuccess: () => {
    //     toast.success('Application updated successfully');
    //     refetch();
    //     setEditApplication(null);
    //   },
    // });

    // #TODO: Delete application mutation
    // const deleteMutation = useMutation({
    //   mutationFn: deleteApplication,
    //   onSuccess: () => {
    //     toast.success('Application deleted successfully');
    //     refetch();
    //   },
    // });

    // #TODO: Handle update
    const handleUpdate = () => {
        if (editApplication) {
            // updateMutation.mutate(editApplication);
            setEditApplication(null)
        }
    }

    // #TODO: Handle delete
    const handleDelete = (_id: string) => {
        // deleteMutation.mutate(id);
    }

    // Mock data for demonstration
    const mockApplications = [
        {
            _id: 'app1',
            tuition: {
                _id: 't1',
                title: 'Mathematics Tutor Needed',
                subject: 'Mathematics',
                class: 'Class 10',
                location: 'Dhaka',
                budget: 8000,
            },
            qualifications: 'MSc in Mathematics from University of Dhaka',
            experience: '5 years of teaching experience in HSC level mathematics',
            expectedSalary: 7500,
            status: 'pending',
            createdAt: '2024-01-25',
        },
        {
            _id: 'app2',
            tuition: {
                _id: 't2',
                title: 'Physics Home Tutor',
                subject: 'Physics',
                class: 'HSC',
                location: 'Chittagong',
                budget: 10000,
            },
            qualifications: 'MSc in Physics',
            experience: '3 years tutoring experience',
            expectedSalary: 9000,
            status: 'approved',
            createdAt: '2024-01-20',
        },
        {
            _id: 'app3',
            tuition: {
                _id: 't3',
                title: 'English Speaking Course',
                subject: 'English',
                class: 'Class 8',
                location: 'Sylhet',
                budget: 5000,
            },
            qualifications: 'BA in English Literature',
            experience: '2 years teaching experience',
            expectedSalary: 4500,
            status: 'rejected',
            createdAt: '2024-01-15',
        },
    ]

    return (
        <div className="space-y-6">
            {/* #TODO: Page Header */}
            <div>
                <h1 className="text-2xl font-bold">My Applications</h1>
                <p className="text-muted-foreground">Track and manage your tuition applications</p>
            </div>

            {/* #TODO: Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Applications</CardDescription>
                        <CardTitle className="text-3xl">{mockApplications.length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Approved</CardDescription>
                        <CardTitle className="text-3xl text-green-600">{mockApplications.filter((a) => a.status === 'approved').length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Pending</CardDescription>
                        <CardTitle className="text-3xl text-yellow-600">{mockApplications.filter((a) => a.status === 'pending').length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Rejected</CardDescription>
                        <CardTitle className="text-3xl text-red-600">{mockApplications.filter((a) => a.status === 'rejected').length}</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* #TODO: Applications Table */}
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
                            {mockApplications.map((application) => (
                                <TableRow key={application._id}>
                                    <TableCell className="font-medium">{application.tuition.title}</TableCell>
                                    <TableCell>
                                        {application.tuition.subject} • {application.tuition.class}
                                    </TableCell>
                                    <TableCell>{application.tuition.location}</TableCell>
                                    <TableCell>৳{application.expectedSalary}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <StatusIcon status={application.status} />
                                            <Badge variant={getStatusVariant(application.status)}>{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>{application.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Tuition
                                                </DropdownMenuItem>

                                                {/* #TODO: Edit option (only for pending) */}
                                                {application.status === 'pending' && (
                                                    <Dialog>
                                                        <DialogTrigger asChild>
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
                                                        </DialogTrigger>
                                                    </Dialog>
                                                )}

                                                {/* #TODO: Delete option (only for pending) */}
                                                {application.status === 'pending' && (
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                                                <Trash className="mr-2 h-4 w-4" />
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
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* #TODO: Edit Application Dialog */}
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
                        <Button onClick={handleUpdate}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MyApplicationsPage
