// ==================== Dashboard Sidebar Component ====================
// Using shadcn Sidebar components for dashboard navigation

import { ADMIN_DASHBOARD, ADMIN_PROFILE, ADMIN_REPORTS, ADMIN_TUITIONS, ADMIN_USERS, STUDENT_APPLIED_TUTORS, STUDENT_DASHBOARD, STUDENT_MY_TUITIONS, STUDENT_PAYMENTS, STUDENT_POST_TUITION, STUDENT_PROFILE, TUTOR_DASHBOARD, TUTOR_MY_APPLICATIONS, TUTOR_ONGOING_TUITIONS, TUTOR_PROFILE_SETTINGS, TUTOR_REVENUE } from '@/features/dashboard/constants'
import { HOME } from '@/pages/home/constants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarSeparator } from '@/components/ui/sidebar'
import { BarChart3, BookOpen, CheckCircle, ChevronsUpDown, Clock, CreditCard, FileText, GraduationCap, LayoutDashboard, LogOut, PlusCircle, Settings, User, Users, Wallet } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'

// ==================== Types ====================
type UserRole = 'student' | 'tutor' | 'admin'

interface NavItem {
    title: string
    url: string
    icon: React.ElementType
    badge?: string | number
    items?: NavItem[]
}

interface SidebarNavProps {
    role?: UserRole
}

// ==================== Navigation Items ====================
const studentNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: STUDENT_DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        title: 'My Tuitions',
        url: STUDENT_MY_TUITIONS,
        icon: BookOpen,
        badge: 3,
    },
    {
        title: 'Post Tuition',
        url: STUDENT_POST_TUITION,
        icon: PlusCircle,
    },
    {
        title: 'Applied Tutors',
        url: STUDENT_APPLIED_TUTORS,
        icon: Users,
        badge: 5,
    },
    {
        title: 'Payments',
        url: STUDENT_PAYMENTS,
        icon: CreditCard,
    },
    {
        title: 'Profile',
        url: STUDENT_PROFILE,
        icon: Settings,
    },
]

const tutorNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: TUTOR_DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        title: 'My Applications',
        url: TUTOR_MY_APPLICATIONS,
        icon: FileText,
        badge: 2,
    },
    {
        title: 'Ongoing Tuitions',
        url: TUTOR_ONGOING_TUITIONS,
        icon: CheckCircle,
    },
    {
        title: 'Revenue',
        url: TUTOR_REVENUE,
        icon: Wallet,
    },
    {
        title: 'Profile',
        url: TUTOR_PROFILE_SETTINGS,
        icon: Settings,
    },
]

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: ADMIN_DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        title: 'Users',
        url: ADMIN_USERS,
        icon: Users,
        badge: 'New',
    },
    {
        title: 'Tuitions',
        url: ADMIN_TUITIONS,
        icon: BookOpen,
        badge: 4,
    },
    {
        title: 'Reports',
        url: ADMIN_REPORTS,
        icon: BarChart3,
    },
    {
        title: 'Settings',
        url: ADMIN_PROFILE,
        icon: Settings,
    },
]

// ==================== Get Nav Items by Role ====================
const getNavItemsByRole = (role: UserRole): NavItem[] => {
    switch (role) {
        case 'admin':
            return adminNavItems
        case 'tutor':
            return tutorNavItems
        default:
            return studentNavItems
    }
}

// ==================== Dashboard Sidebar Component ====================
const DashboardSidebar = ({ role = 'student' }: SidebarNavProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    const navItems = getNavItemsByRole(role)

    // TODO: Get user from auth context
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '',
        role: role,
    }

    const isActiveLink = (url: string) => {
        return location.pathname === url || location.pathname.startsWith(url + '/')
    }

    const handleLogout = () => {
        // TODO: Implement logout logic
        navigate(HOME)
    }

    const getRoleBadgeColor = (role: UserRole) => {
        switch (role) {
            case 'admin':
                return 'destructive'
            case 'tutor':
                return 'secondary'
            default:
                return 'default'
        }
    }

    return (
        <Sidebar collapsible="icon">
            {/* Sidebar Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to={HOME}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <GraduationCap className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">eTuitionBd</span>
                                    <span className="truncate text-xs capitalize">{role} Dashboard</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator />

            {/* Main Navigation */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActiveLink(item.url)} tooltip={item.title}>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Quick Stats for Admin */}
                {role === 'admin' && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <div className="grid gap-2 px-2">
                                <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs">Total Users</span>
                                    </div>
                                    <span className="text-xs font-bold">1,234</span>
                                </div>
                                <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs">Pending</span>
                                    </div>
                                    <span className="text-xs font-bold">12</span>
                                </div>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>

            {/* Sidebar Footer - User Menu */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="rounded-lg bg-primary/10">
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user.name}</span>
                                        <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="rounded-lg">
                                                <User className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{user.name}</span>
                                            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                        <Badge variant={getRoleBadgeColor(role)} className="capitalize">
                                            {role}
                                        </Badge>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate(HOME)}>
                                    <GraduationCap className="mr-2 h-4 w-4" />
                                    Go to Home
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}

export default DashboardSidebar
