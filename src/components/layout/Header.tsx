// ==================== Enhanced Header Component ====================
// Using shadcn NavigationMenu for desktop navigation

import { ABOUT } from '@/pages/about/constants'
import { useAuth } from '@/features/auth'
import { SIGNIN, SIGNUP } from '@/features/auth/constants'
import { CONTACT } from '@/pages/contact/constants'
import { ADMIN_DASHBOARD, STUDENT_DASHBOARD, TUTOR_DASHBOARD } from '@/features/dashboard/constants'
import { HOME, PUBLIC_NAV_LINKS } from '@/pages/home/constants'
import { TUITIONS } from '@/features/tuitions/constants'
import { TUTORS } from '@/features/tutors/constants'
import { useTheme } from '@/hooks'
import { cn } from '@/lib/utils'
import { GlobalSearch } from '@/components/GlobalSearch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { BookOpen, GraduationCap, Info, LayoutDashboard, LogOut, Mail, Menu, MoonIcon, Settings, SunIcon, User, Users } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import authService from '@/features/auth/service'

// ==================== Navigation Items ====================
const navigationItems = [
    {
        title: 'Tuitions',
        href: TUITIONS,
        description: 'Browse available tuition opportunities',
        icon: BookOpen,
    },
    {
        title: 'Tutors',
        href: TUTORS,
        description: 'Find experienced and verified tutors',
        icon: Users,
    },
    {
        title: 'About',
        href: ABOUT,
        description: 'Learn more about our platform',
        icon: Info,
    },
    {
        title: 'Contact',
        href: CONTACT,
        description: 'Get in touch with us',
        icon: Mail,
    },
]

// ==================== Header Component ====================
const Header = () => {
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Get user from auth context
    const { user, isAuthenticated, signOut } = useAuth({
        signOutFn: async () => {
            await authService.signOut()
            return null
        },
    })

    // Get dashboard route based on role
    const getDashboardRoute = (role?: string): string => {
        switch (role) {
            case 'admin':
                return ADMIN_DASHBOARD
            case 'tutor':
                return TUTOR_DASHBOARD
            default:
                return STUDENT_DASHBOARD
        }
    }

    // Get role badge variant
    const getRoleBadgeVariant = (role?: string) => {
        switch (role) {
            case 'admin':
                return 'destructive'
            case 'tutor':
                return 'default'
            default:
                return 'secondary'
        }
    }

    // Check if link is active
    const isActiveLink = (path: string) => {
        if (path === HOME) {
            return location.pathname === HOME
        }
        return location.pathname.startsWith(path)
    }

    // Handle logout
    const handleLogout = async () => {
        await signOut?.()
        navigate(HOME)
    }

    // Get user initials
    const getUserInitials = (name?: string) => {
        if (!name) return 'U'
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo & Website Name */}
                    <Link to={HOME} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">eTuitionBd</span>
                    </Link>

                    {/* Desktop Navigation with NavigationMenu */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>
                            {/* Home Link */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to={HOME}>Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* Browse Dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {navigationItems.slice(0, 2).map((item) => (
                                            <li key={item.title}>
                                                <Link to={item.href} className={cn('block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground')}>
                                                    <div className="flex items-center gap-2">
                                                        {item.icon && <item.icon className="h-4 w-4" />}
                                                        <div className="text-sm font-medium leading-none">{item.title}</div>
                                                    </div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* About Link */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to={ABOUT}>About</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* Contact Link */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to={CONTACT}>Contact</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* Dashboard Link - Only when logged in */}
                            {isAuthenticated && user && (
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to={getDashboardRoute(user.role)}>
                                            Dashboard
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Tablet/Small Desktop Navigation */}
                    <nav className="hidden md:flex lg:hidden items-center gap-4">
                        {PUBLIC_NAV_LINKS.map((link) => (
                            <Link key={link.path} to={link.path} className={cn('text-sm font-medium transition-colors hover:text-primary', isActiveLink(link.path) ? 'text-primary' : 'text-muted-foreground')}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-2">
                        {/* Global Search (Cmd+K) */}
                        <GlobalSearch />

                        {/* Theme Toggle */}
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                            {theme === 'dark' ? <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all" /> : <MoonIcon className="h-5 w-5 rotate-0 scale-100 transition-all" />}
                        </Button>

                        {/* Auth-based Navigation */}
                        {isAuthenticated && user ? (
                            // Logged in - Show profile dropdown
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="bg-primary/10">{getUserInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs capitalize">
                                                    {user.role || 'student'}
                                                </Badge>
                                            </div>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate(getDashboardRoute(user.role))}>
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate(`${getDashboardRoute(user.role)}/profile`)}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            // Logged out - Show Login/Register
                            <div className="hidden md:flex items-center gap-2">
                                <Button variant="ghost" asChild>
                                    <Link to={SIGNIN}>Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link to={SIGNUP}>Get Started</Link>
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-2">
                                        <GraduationCap className="h-6 w-6 text-primary" />
                                        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">eTuitionBd</span>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-2 mt-6">
                                    {/* User info in mobile menu */}
                                    {isAuthenticated && user && (
                                        <>
                                            <div className="flex items-center gap-3 px-3 py-2">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                                <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs capitalize">
                                                    {user.role || 'student'}
                                                </Badge>
                                            </div>
                                            <Separator className="my-2" />
                                        </>
                                    )}

                                    {/* Mobile Navigation Links */}
                                    {navigationItems.map((item) => (
                                        <Link key={item.href} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors', isActiveLink(item.href) ? 'bg-primary/10 text-primary' : 'hover:bg-accent hover:text-accent-foreground')}>
                                            <item.icon className="h-4 w-4" />
                                            {item.title}
                                        </Link>
                                    ))}

                                    {/* Dashboard link in mobile for logged in users */}
                                    {isAuthenticated && user && (
                                        <Link to={getDashboardRoute(user.role)} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors', isActiveLink(getDashboardRoute(user.role)) ? 'bg-primary/10 text-primary' : 'hover:bg-accent hover:text-accent-foreground')}>
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    )}

                                    <Separator className="my-2" />

                                    {/* Mobile Theme Toggle */}
                                    <div className="flex items-center justify-between px-3 py-2">
                                        <span className="text-sm">Theme</span>
                                        <Button variant="outline" size="sm" onClick={toggleTheme}>
                                            {theme === 'dark' ? (
                                                <>
                                                    <SunIcon className="h-4 w-4 mr-2" />
                                                    Light
                                                </>
                                            ) : (
                                                <>
                                                    <MoonIcon className="h-4 w-4 mr-2" />
                                                    Dark
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    <Separator className="my-2" />

                                    {/* Mobile Auth Buttons */}
                                    {isAuthenticated && user ? (
                                        <div className="flex flex-col gap-2 px-3">
                                            <Button variant="outline" asChild className="w-full justify-start">
                                                <Link to={`${getDashboardRoute(user.role)}/profile`} onClick={() => setIsMobileMenuOpen(false)}>
                                                    <Settings className="h-4 w-4 mr-2" />
                                                    Settings
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="w-full justify-start"
                                                onClick={() => {
                                                    handleLogout()
                                                    setIsMobileMenuOpen(false)
                                                }}
                                            >
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Logout
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2 px-3">
                                            <Button variant="outline" asChild className="w-full justify-start">
                                                <Link to={SIGNIN} onClick={() => setIsMobileMenuOpen(false)}>
                                                    <User className="h-4 w-4 mr-2" />
                                                    Login
                                                </Link>
                                            </Button>
                                            <Button asChild className="w-full justify-start">
                                                <Link to={SIGNUP} onClick={() => setIsMobileMenuOpen(false)}>
                                                    <GraduationCap className="h-4 w-4 mr-2" />
                                                    Get Started
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
