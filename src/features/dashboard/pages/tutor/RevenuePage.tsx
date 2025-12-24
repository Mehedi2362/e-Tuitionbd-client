// #TODO: Tutor Dashboard - Revenue History Page
// #TODO: Total earnings display
// #TODO: Transaction history

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpRight, Calendar, CreditCard, DollarSign, TrendingUp } from 'lucide-react'

const RevenuePage = () => {
    // #TODO: Fetch revenue data from backend
    // const { data: revenueData, isLoading, error } = useQuery({
    //   queryKey: ['tutor-revenue'],
    //   queryFn: fetchTutorRevenue,
    // });

    // Mock data for demonstration
    const mockTransactions = [
        {
            _id: 'tr1',
            tuition: {
                title: 'Mathematics Tutor Needed',
                subject: 'Mathematics',
            },
            student: {
                name: 'Ahmed Rahman',
            },
            amount: 7500,
            status: 'completed',
            createdAt: '2024-01-25',
        },
        {
            _id: 'tr2',
            tuition: {
                title: 'Physics Home Tutor',
                subject: 'Physics',
            },
            student: {
                name: 'Fatima Akter',
            },
            amount: 9000,
            status: 'completed',
            createdAt: '2024-01-20',
        },
        {
            _id: 'tr3',
            tuition: {
                title: 'Chemistry Tutoring',
                subject: 'Chemistry',
            },
            student: {
                name: 'Karim Hassan',
            },
            amount: 6000,
            status: 'pending',
            createdAt: '2024-01-28',
        },
    ]

    // #TODO: Calculate totals
    const totalEarnings = mockTransactions.filter((t) => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)

    const pendingAmount = mockTransactions.filter((t) => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0)

    // #TODO: Mock monthly data for chart
    const monthlyData = [
        { month: 'Jan', revenue: 16500 },
        { month: 'Feb', revenue: 22000 },
        { month: 'Mar', revenue: 18500 },
        { month: 'Apr', revenue: 25000 },
        { month: 'May', revenue: 21000 },
        { month: 'Jun', revenue: 28000 },
    ]

    return (
        <div className="space-y-6">
            {/* #TODO: Page Header */}
            <div>
                <h1 className="text-2xl font-bold">Revenue History</h1>
                <p className="text-muted-foreground">Track your earnings and transactions</p>
            </div>

            {/* #TODO: Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Total Earnings</CardDescription>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl text-green-600">৳{totalEarnings.toLocaleString()}</CardTitle>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Pending</CardDescription>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl text-yellow-600">৳{pendingAmount.toLocaleString()}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">{mockTransactions.filter((t) => t.status === 'pending').length} pending</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>This Month</CardDescription>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">৳28,000</CardTitle>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            Best month yet!
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Average/Month</CardDescription>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">৳21,833</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                    </CardContent>
                </Card>
            </div>

            {/* #TODO: Monthly Revenue Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Revenue Overview</CardTitle>
                    <CardDescription>Your earnings over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* #TODO: Implement chart with recharts */}
                    <div className="h-64 flex items-end justify-between gap-2">
                        {monthlyData.map((data) => (
                            <div key={data.month} className="flex flex-col items-center flex-1">
                                <div
                                    className="w-full bg-primary rounded-t"
                                    style={{
                                        height: `${(data.revenue / 30000) * 200}px`,
                                    }}
                                />
                                <p className="text-sm mt-2">{data.month}</p>
                                <p className="text-xs text-muted-foreground">৳{(data.revenue / 1000).toFixed(1)}k</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* #TODO: Transaction History Table */}
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
                            {mockTransactions.map((transaction) => (
                                <TableRow key={transaction._id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{transaction.tuition.title}</p>
                                            <p className="text-sm text-muted-foreground">{transaction.tuition.subject}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{transaction.student.name}</TableCell>
                                    <TableCell className="font-medium">৳{transaction.amount.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</Badge>
                                    </TableCell>
                                    <TableCell>{transaction.createdAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default RevenuePage
