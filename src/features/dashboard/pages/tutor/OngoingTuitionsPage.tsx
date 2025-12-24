// #TODO: Tutor Dashboard - Ongoing Tuitions Page
// #TODO: Display all approved tuitions
// #TODO: Student contact information

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BookOpen, Calendar, DollarSign, GraduationCap, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'

const OngoingTuitionsPage = () => {
    // #TODO: Fetch ongoing tuitions from backend
    // const { data: ongoingTuitions, isLoading, error } = useQuery({
    //   queryKey: ['ongoing-tuitions'],
    //   queryFn: fetchOngoingTuitions,
    // });

    // Mock data for demonstration
    const mockOngoingTuitions = [
        {
            _id: '1',
            title: 'Mathematics Tutor Needed',
            subject: 'Mathematics',
            class: 'Class 10',
            location: 'Dhaka',
            schedule: '3 days/week, Evening (6:00 PM - 8:00 PM)',
            salary: 7500,
            startDate: '2024-01-25',
            student: {
                _id: 's1',
                name: 'Ahmed Rahman',
                email: 'ahmed@email.com',
                phone: '+880 1700-111111',
                photoUrl: '',
            },
        },
        {
            _id: '2',
            title: 'Physics Home Tutor',
            subject: 'Physics',
            class: 'HSC',
            location: 'Chittagong',
            schedule: '4 days/week, Morning (10:00 AM - 12:00 PM)',
            salary: 9000,
            startDate: '2024-01-20',
            student: {
                _id: 's2',
                name: 'Fatima Akter',
                email: 'fatima@email.com',
                phone: '+880 1700-222222',
                photoUrl: '',
            },
        },
    ]

    return (
        <div className="space-y-6">
            {/* #TODO: Page Header */}
            <div>
                <h1 className="text-2xl font-bold">Ongoing Tuitions</h1>
                <p className="text-muted-foreground">Your active tuition engagements with students</p>
            </div>

            {/* #TODO: Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Active Tuitions</CardDescription>
                        <CardTitle className="text-3xl">{mockOngoingTuitions.length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Monthly Income</CardDescription>
                        <CardTitle className="text-3xl">৳{mockOngoingTuitions.reduce((sum, t) => sum + t.salary, 0).toLocaleString()}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Students</CardDescription>
                        <CardTitle className="text-3xl">{mockOngoingTuitions.length}</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* #TODO: Ongoing Tuitions List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockOngoingTuitions.map((tuition) => (
                    <Card key={tuition._id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{tuition.title}</CardTitle>
                                    <CardDescription>Started: {tuition.startDate}</CardDescription>
                                </div>
                                <Badge variant="default">Active</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* #TODO: Tuition Details */}
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <span>{tuition.subject}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <span>{tuition.class}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{tuition.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span>৳{tuition.salary}/month</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{tuition.schedule}</span>
                            </div>

                            <Separator />

                            {/* #TODO: Student Contact Information */}
                            <div>
                                <p className="text-sm font-medium mb-3">Student Contact</p>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={tuition.student.photoUrl} />
                                        <AvatarFallback>
                                            {tuition.student.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-medium">{tuition.student.name}</p>
                                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                {tuition.student.email}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Phone className="h-3 w-3" />
                                                {tuition.student.phone}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* #TODO: Action Buttons */}
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Message
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    View Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* #TODO: Empty State */}
            {mockOngoingTuitions.length === 0 && (
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>No Ongoing Tuitions</CardTitle>
                        <CardDescription>You don&apos;t have any active tuitions yet. Apply to tuitions to start teaching!</CardDescription>
                    </CardHeader>
                </Card>
            )}
        </div>
    )
}

export default OngoingTuitionsPage
