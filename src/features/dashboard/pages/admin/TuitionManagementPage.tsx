// #TODO: Admin Dashboard - Tuition Management Page
// #TODO: View all tuition posts
// #TODO: Approve button (change status to Approved)
// #TODO: Reject button (change status to Rejected)
// #TODO: Review tuition details

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BookOpen, Calendar, Check, CheckCircle, Clock, DollarSign, Eye, FileText, MapPin, Search, X, XCircle } from 'lucide-react'
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

const TuitionManagementPage = () => {
    // #TODO: State for search
    const [searchQuery, setSearchQuery] = useState('')

    // #TODO: State for status filter
    const [statusFilter, setStatusFilter] = useState('all')

    // #TODO: State for selected tuition (view details)
    const [_selectedTuition, setSelectedTuition] = useState<(typeof mockTuitions)[0] | null>(null)

    // #TODO: Fetch all tuitions from backend
    // const { data: tuitions, isLoading, refetch } = useQuery({
    //   queryKey: ['admin-tuitions', searchQuery, statusFilter],
    //   queryFn: () => fetchAllTuitions({ search: searchQuery, status: statusFilter }),
    // });

    // #TODO: Approve tuition mutation
    // const approveMutation = useMutation({
    //   mutationFn: approveTuition,
    //   onSuccess: () => {
    //     toast.success('Tuition approved');
    //     refetch();
    //   },
    // });

    // #TODO: Reject tuition mutation
    // const rejectMutation = useMutation({
    //   mutationFn: rejectTuition,
    //   onSuccess: () => {
    //     toast.success('Tuition rejected');
    //     refetch();
    //   },
    // });

    // #TODO: Handle approve
    const handleApprove = (_tuitionId: string) => {
        // approveMutation.mutate(tuitionId);
    }

    // #TODO: Handle reject
    const handleReject = (_tuitionId: string) => {
        // rejectMutation.mutate(tuitionId);
    }

    // Mock data for demonstration
    const mockTuitions = [
        {
            _id: '1',
            title: 'Mathematics Tutor Needed',
            subject: 'Mathematics',
            class: 'Class 10',
            location: 'Dhaka',
            budget: 8000,
            schedule: '3 days/week, Evening',
            description: 'Looking for an experienced math tutor for HSC preparation.',
            requirements: 'Must have teaching experience',
            status: 'pending',
            student: {
                name: 'Ahmed Rahman',
                email: 'ahmed@email.com',
            },
            createdAt: '2024-01-25',
        },
        {
            _id: '2',
            title: 'Physics Home Tutor',
            subject: 'Physics',
            class: 'HSC',
            location: 'Chittagong',
            budget: 10000,
            schedule: '4 days/week, Morning',
            description: 'Need a physics tutor for HSC exam preparation.',
            requirements: 'Experience in HSC physics required',
            status: 'approved',
            student: {
                name: 'Fatima Akter',
                email: 'fatima@email.com',
            },
            createdAt: '2024-01-20',
        },
        {
            _id: '3',
            title: 'English Speaking Course',
            subject: 'English',
            class: 'Class 8',
            location: 'Sylhet',
            budget: 5000,
            schedule: '2 days/week, Evening',
            description: 'Need help with English speaking and grammar.',
            requirements: 'Native or fluent English speaker preferred',
            status: 'rejected',
            student: {
                name: 'Karim Hassan',
                email: 'karim@email.com',
            },
            createdAt: '2024-01-15',
        },
        {
            _id: '4',
            title: 'Chemistry Tutoring',
            subject: 'Chemistry',
            class: 'Class 12',
            location: 'Dhaka',
            budget: 7000,
            schedule: '3 days/week, Afternoon',
            description: 'Need chemistry tutor for organic chemistry.',
            requirements: 'Must have good knowledge of organic chemistry',
            status: 'pending',
            student: {
                name: 'Rina Begum',
                email: 'rina@email.com',
            },
            createdAt: '2024-01-28',
        },
    ]

    return (
        <div className="space-y-6">
            {/* #TODO: Page Header */}
            <div>
                <h1 className="text-2xl font-bold">Tuition Management</h1>
                <p className="text-muted-foreground">Review and manage all tuition posts</p>
            </div>

            {/* #TODO: Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Total Tuitions</CardDescription>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">{mockTuitions.length}</CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Pending Review</CardDescription>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl text-yellow-600">{mockTuitions.filter((t) => t.status === 'pending').length}</CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Approved</CardDescription>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl text-green-600">{mockTuitions.filter((t) => t.status === 'approved').length}</CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Rejected</CardDescription>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl text-red-600">{mockTuitions.filter((t) => t.status === 'rejected').length}</CardTitle>
                    </CardContent>
                </Card>
            </div>

            {/* #TODO: Search and Filter */}
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
                            <Input placeholder="Search by title or subject..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
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

                    {/* #TODO: Tuitions Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Subject/Class</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Posted By</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockTuitions.map((tuition) => (
                                <TableRow key={tuition._id}>
                                    <TableCell className="font-medium">{tuition.title}</TableCell>
                                    <TableCell>
                                        {tuition.subject} • {tuition.class}
                                    </TableCell>
                                    <TableCell>{tuition.location}</TableCell>
                                    <TableCell>৳{tuition.budget}</TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{tuition.student.name}</p>
                                            <p className="text-xs text-muted-foreground">{tuition.student.email}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(tuition.status)}>{tuition.status.charAt(0).toUpperCase() + tuition.status.slice(1)}</Badge>
                                    </TableCell>
                                    <TableCell>{tuition.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* #TODO: View Details Button */}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setSelectedTuition(tuition)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle>{tuition.title}</DialogTitle>
                                                        <DialogDescription>
                                                            Posted by {tuition.student.name} on {tuition.createdAt}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="flex items-center gap-2">
                                                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                                <span>Subject: {tuition.subject}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span>Class: {tuition.class}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                <span>Location: {tuition.location}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                                <span>Budget: ৳{tuition.budget}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span>Schedule: {tuition.schedule}</span>
                                                        </div>
                                                        <Separator />
                                                        <div>
                                                            <h4 className="font-medium mb-2">Description</h4>
                                                            <p className="text-muted-foreground">{tuition.description}</p>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium mb-2">Requirements</h4>
                                                            <p className="text-muted-foreground">{tuition.requirements}</p>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            {/* #TODO: Approve/Reject Buttons (only for pending) */}
                                            {tuition.status === 'pending' && (
                                                <>
                                                    {/* Approve Button */}
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <Check className="h-4 w-4 text-green-500" />
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
                                                            <Button variant="ghost" size="icon">
                                                                <X className="h-4 w-4 text-red-500" />
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
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default TuitionManagementPage
