// #TODO: Admin Dashboard - Reports & Analytics Page
// #TODO: Total platform earnings chart
// #TODO: Transaction history table
// #TODO: Charts and graphs for analytics

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, BookOpen, Calendar, DollarSign, FileText, TrendingUp, Users } from 'lucide-react'

const ReportsPage = () => {
    // #TODO: Fetch analytics data from backend
    // const { data: analytics, isLoading, error } = useQuery({
    //   queryKey: ['admin-analytics'],
    //   queryFn: fetchPlatformAnalytics,
    // });

    // Mock data for demonstration
    const mockAnalytics = {
        totalRevenue: 156000,
        totalUsers: 1250,
        totalStudents: 980,
        totalTutors: 250,
        totalTuitions: 320,
        totalApplications: 890,
        recentTransactions: [
            {
                _id: 'tr1',
                student: 'Ahmed Rahman',
                tutor: 'John Doe',
                tuition: 'Mathematics Tutor',
                amount: 7500,
                date: '2024-01-28',
            },
            {
                _id: 'tr2',
                student: 'Fatima Akter',
                tutor: 'Jane Smith',
                tuition: 'Physics Tutor',
                amount: 9000,
                date: '2024-01-27',
            },
            {
                _id: 'tr3',
                student: 'Karim Hassan',
                tutor: 'Mike Johnson',
                tuition: 'Chemistry Tutor',
                amount: 6000,
                date: '2024-01-26',
            },
            {
                _id: 'tr4',
                student: 'Rina Begum',
                tutor: 'Sarah Khan',
                tuition: 'English Tutor',
                amount: 5000,
                date: '2024-01-25',
            },
            {
                _id: 'tr5',
                student: 'Omar Ali',
                tutor: 'David Lee',
                tuition: 'Biology Tutor',
                amount: 8000,
                date: '2024-01-24',
            },
        ],
        monthlyRevenue: [
            { month: 'Jan', revenue: 28000 },
            { month: 'Feb', revenue: 32000 },
            { month: 'Mar', revenue: 25000 },
            { month: 'Apr', revenue: 38000 },
            { month: 'May', revenue: 42000 },
            { month: 'Jun', revenue: 35000 },
        ],
        userGrowth: [
            { month: 'Jan', users: 150 },
            { month: 'Feb', users: 200 },
            { month: 'Mar', users: 180 },
            { month: 'Apr', users: 250 },
            { month: 'May', users: 280 },
            { month: 'Jun', users: 320 },
        ],
    }

    return (
        <div className="space-y-6">
            {/* #TODO: Page Header */}
            <div>
                <h1 className="text-2xl font-bold">Reports & Analytics</h1>
                <p className="text-muted-foreground">Platform performance and financial reports</p>
            </div>

            {/* #TODO: Overview Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Total Revenue</CardDescription>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl text-green-600">৳{mockAnalytics.totalRevenue.toLocaleString()}</CardTitle>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            +18% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Total Users</CardDescription>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">{mockAnalytics.totalUsers.toLocaleString()}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                            {mockAnalytics.totalStudents} Students, {mockAnalytics.totalTutors} Tutors
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Total Tuitions</CardDescription>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">{mockAnalytics.totalTuitions}</CardTitle>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            +25 new this month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Applications</CardDescription>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">{mockAnalytics.totalApplications}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">Across all tuitions</p>
                    </CardContent>
                </Card>
            </div>

            {/* #TODO: Analytics Tabs */}
            <Tabs defaultValue="revenue" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="users">User Growth</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>

                {/* #TODO: Revenue Tab */}
                <TabsContent value="revenue" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Monthly Revenue
                            </CardTitle>
                            <CardDescription>Platform earnings over the past 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* #TODO: Implement chart with recharts */}
                            <div className="h-64 flex items-end justify-between gap-2">
                                {mockAnalytics.monthlyRevenue.map((data) => (
                                    <div key={data.month} className="flex flex-col items-center flex-1">
                                        <div
                                            className="w-full bg-primary rounded-t"
                                            style={{
                                                height: `${(data.revenue / 45000) * 200}px`,
                                            }}
                                        />
                                        <p className="text-sm mt-2">{data.month}</p>
                                        <p className="text-xs text-muted-foreground">৳{(data.revenue / 1000).toFixed(0)}k</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Revenue Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Average Monthly</CardDescription>
                                <CardTitle className="text-xl">৳{Math.round(mockAnalytics.monthlyRevenue.reduce((a, b) => a + b.revenue, 0) / 6).toLocaleString()}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Highest Month</CardDescription>
                                <CardTitle className="text-xl text-green-600">৳{Math.max(...mockAnalytics.monthlyRevenue.map((m) => m.revenue)).toLocaleString()}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Growth Rate</CardDescription>
                                <CardTitle className="text-xl text-green-600">+18%</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </TabsContent>

                {/* #TODO: User Growth Tab */}
                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                User Growth
                            </CardTitle>
                            <CardDescription>New user registrations over the past 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* #TODO: Implement chart with recharts */}
                            <div className="h-64 flex items-end justify-between gap-2">
                                {mockAnalytics.userGrowth.map((data) => (
                                    <div key={data.month} className="flex flex-col items-center flex-1">
                                        <div
                                            className="w-full bg-blue-500 rounded-t"
                                            style={{
                                                height: `${(data.users / 350) * 200}px`,
                                            }}
                                        />
                                        <p className="text-sm mt-2">{data.month}</p>
                                        <p className="text-xs text-muted-foreground">{data.users}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* #TODO: Transactions Tab */}
                <TabsContent value="transactions" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Recent Transactions
                            </CardTitle>
                            <CardDescription>All successful payment transactions on the platform</CardDescription>
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
                                    {mockAnalytics.recentTransactions.map((transaction) => (
                                        <TableRow key={transaction._id}>
                                            <TableCell className="font-medium">{transaction.student}</TableCell>
                                            <TableCell>{transaction.tutor}</TableCell>
                                            <TableCell>{transaction.tuition}</TableCell>
                                            <TableCell className="font-medium">৳{transaction.amount.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge variant="default">Completed</Badge>
                                            </TableCell>
                                            <TableCell>{transaction.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ReportsPage
