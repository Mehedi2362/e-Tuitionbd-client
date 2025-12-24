// #TODO: Admin Dashboard - User Management Page
// #TODO: View all users (name, email, image, status, role)
// #TODO: Update user information
// #TODO: Change user roles (Student/Tutor/Admin)
// #TODO: Delete user accounts

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GraduationCap, MoreHorizontal, Pencil, Search, Shield, Trash, UserCog, Users } from 'lucide-react'
import { useState } from 'react'

// #TODO: Role badge variant helper
const getRoleVariant = (role: string) => {
    switch (role) {
        case 'admin':
            return 'destructive'
        case 'tutor':
            return 'default'
        case 'student':
            return 'secondary'
        default:
            return 'outline'
    }
}

// #TODO: Status badge variant helper
const getStatusVariant = (status: string) => {
    switch (status) {
        case 'active':
            return 'default'
        case 'inactive':
            return 'secondary'
        case 'blocked':
            return 'destructive'
        default:
            return 'outline'
    }
}

const UserManagementPage = () => {
    // #TODO: State for search
    const [searchQuery, setSearchQuery] = useState('')

    // #TODO: State for role filter
    const [roleFilter, setRoleFilter] = useState('all')

    // #TODO: Fetch all users from backend
    // const { data: users, isLoading, refetch } = useQuery({
    //   queryKey: ['admin-users', searchQuery, roleFilter],
    //   queryFn: () => fetchAllUsers({ search: searchQuery, role: roleFilter }),
    // });

    // #TODO: Update user role mutation
    // const updateRoleMutation = useMutation({
    //   mutationFn: updateUserRole,
    //   onSuccess: () => {
    //     toast.success('User role updated');
    //     refetch();
    //   },
    // });

    // #TODO: Delete user mutation
    // const deleteUserMutation = useMutation({
    //   mutationFn: deleteUser,
    //   onSuccess: () => {
    //     toast.success('User deleted');
    //     refetch();
    //   },
    // });

    // #TODO: Handle role change
    const handleRoleChange = (_userId: string, _newRole: string) => {
        // updateRoleMutation.mutate({ userId, role: newRole });
    }

    // #TODO: Handle delete user
    const handleDeleteUser = (_userId: string) => {
        // deleteUserMutation.mutate(userId);
    }

    // Mock data for demonstration
    const mockUsers = [
        {
            _id: '1',
            name: 'John Doe',
            email: 'john@email.com',
            phone: '+880 1700-000001',
            photoUrl: '',
            role: 'student',
            status: 'active',
            createdAt: '2024-01-15',
        },
        {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane@email.com',
            phone: '+880 1700-000002',
            photoUrl: '',
            role: 'tutor',
            status: 'active',
            createdAt: '2024-01-10',
        },
        {
            _id: '3',
            name: 'Admin User',
            email: 'admin@etuitionbd.com',
            phone: '+880 1700-000003',
            photoUrl: '',
            role: 'admin',
            status: 'active',
            createdAt: '2024-01-01',
        },
        {
            _id: '4',
            name: 'Mike Johnson',
            email: 'mike@email.com',
            phone: '+880 1700-000004',
            photoUrl: '',
            role: 'tutor',
            status: 'inactive',
            createdAt: '2024-01-20',
        },
    ]

    return (
        <div className="space-y-6">
            {/* #TODO: Page Header */}
            <div>
                <h1 className="text-2xl font-bold">User Management</h1>
                <p className="text-muted-foreground">Manage all registered users on the platform</p>
            </div>

            {/* #TODO: Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Total Users</CardDescription>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">{mockUsers.length}</CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Students</CardDescription>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">{mockUsers.filter((u) => u.role === 'student').length}</CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Tutors</CardDescription>
                        <UserCog className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">{mockUsers.filter((u) => u.role === 'tutor').length}</CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Admins</CardDescription>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">{mockUsers.filter((u) => u.role === 'admin').length}</CardTitle>
                    </CardContent>
                </Card>
            </div>

            {/* #TODO: Search and Filter */}
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>View and manage all user accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search and Filter Row */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="student">Students</SelectItem>
                                <SelectItem value="tutor">Tutors</SelectItem>
                                <SelectItem value="admin">Admins</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* #TODO: Users Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockUsers.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.photoUrl} />
                                                <AvatarFallback>
                                                    {user.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <Badge variant={getRoleVariant(user.role)}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(user.status)}>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</Badge>
                                    </TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                {/* #TODO: Edit User */}
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit User
                                                </DropdownMenuItem>

                                                {/* #TODO: Change Role */}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleRoleChange(user._id, 'student')}>
                                                    <GraduationCap className="mr-2 h-4 w-4" />
                                                    Make Student
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleRoleChange(user._id, 'tutor')}>
                                                    <UserCog className="mr-2 h-4 w-4" />
                                                    Make Tutor
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleRoleChange(user._id, 'admin')}>
                                                    <Shield className="mr-2 h-4 w-4" />
                                                    Make Admin
                                                </DropdownMenuItem>

                                                {/* #TODO: Delete User */}
                                                <DropdownMenuSeparator />
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete User
                                                        </DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete User?</AlertDialogTitle>
                                                            <AlertDialogDescription>Are you sure you want to delete this user? This action cannot be undone.</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteUser(user._id)} className="bg-destructive text-destructive-foreground">
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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

export default UserManagementPage
