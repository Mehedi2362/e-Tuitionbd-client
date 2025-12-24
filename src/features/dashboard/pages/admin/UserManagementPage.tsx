/**
 * Admin Dashboard - User Management Page
 * View all users (name, email, image, status, role)
 * Update user information, change roles, delete accounts
 * Real API integration with fallback handling
 */

import { useAdminUsers, useDeleteUser, useUpdateUserRole } from '@/features/dashboard/hooks'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GraduationCap, MoreHorizontal, RefreshCw, Search, Shield, Trash, UserCog, Users } from 'lucide-react'
import { useMemo, useState } from 'react'

// Role badge variant helper
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

// Status badge variant helper
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
        {[1, 2, 3, 4].map((i) => (
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

const UserManagementPage = () => {
    // State for search and filters
    const [searchQuery, setSearchQuery] = useState('')
    const [roleFilter, setRoleFilter] = useState('all')

    // Fetch all users from backend with real API
    const { data, isLoading, error, refetch } = useAdminUsers({
        search: searchQuery || undefined,
        role: roleFilter !== 'all' ? roleFilter : undefined,
    })

    // Mutations
    const updateRoleMutation = useUpdateUserRole()
    const deleteUserMutation = useDeleteUser()

    // Extract users with fallback
    const users = data?.data || []
    const total = data?.pagination?.total || users.length

    // Calculate stats
    const stats = useMemo(() => {
        return {
            total: total || 0,
            students: users.filter((u) => u.role === 'student').length,
            tutors: users.filter((u) => u.role === 'tutor').length,
            admins: users.filter((u) => u.role === 'admin').length,
        }
    }, [users, total])

    // Handle role change
    const handleRoleChange = (email: string, newRole: string) => {
        updateRoleMutation.mutate({ email, role: newRole })
    }

    // Handle delete user
    const handleDeleteUser = (email: string) => {
        deleteUserMutation.mutate(email)
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-destructive">Failed to load users</p>
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
                <h1 className="text-2xl font-bold">User Management</h1>
                <p className="text-muted-foreground">Manage all registered users on the platform</p>
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
                                <CardDescription>Total Users</CardDescription>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">{stats.total}</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Students</CardDescription>
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">{stats.students}</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Tutors</CardDescription>
                                <UserCog className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">{stats.tutors}</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardDescription>Admins</CardDescription>
                                <Shield className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-2xl">{stats.admins}</CardTitle>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            {/* Search and Filter */}
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

                    {/* Users Table */}
                    <div className="overflow-x-auto">
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
                                {isLoading ? (
                                    <TableSkeleton />
                                ) : users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            <p className="text-muted-foreground">No users found</p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={user.photoUrl} />
                                                        <AvatarFallback>
                                                            {user.name
                                                                ?.split(' ')
                                                                .map((n) => n[0])
                                                                .join('') || 'U'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{user.name || 'Unknown'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.email || 'N/A'}</TableCell>
                                            <TableCell>{user.phone || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Badge variant={getRoleVariant(user.role)}>{user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'N/A'}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(user.status || 'active')}>{(user.status || 'active').charAt(0).toUpperCase() + (user.status || 'active').slice(1)}</Badge>
                                            </TableCell>
                                            <TableCell>{user.createdAt ? formatDate(user.createdAt) : 'N/A'}</TableCell>
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

                                                        {/* Change Role */}
                                                        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleRoleChange(user.email, 'student')} disabled={user.role === 'student'}>
                                                            <GraduationCap className="mr-2 h-4 w-4" />
                                                            Make Student
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleRoleChange(user.email, 'tutor')} disabled={user.role === 'tutor'}>
                                                            <UserCog className="mr-2 h-4 w-4" />
                                                            Make Tutor
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleRoleChange(user.email, 'admin')} disabled={user.role === 'admin'}>
                                                            <Shield className="mr-2 h-4 w-4" />
                                                            Make Admin
                                                        </DropdownMenuItem>

                                                        {/* Delete User */}
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
                                                                    <AlertDialogAction onClick={() => handleDeleteUser(user.email)} className="bg-destructive text-destructive-foreground">
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
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

export default UserManagementPage
