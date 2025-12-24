// ==================== Dashboard Layout Component ====================
// Wraps dashboard pages with Sidebar navigation

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/features/auth'
import { Outlet } from 'react-router'
import DashboardSidebar from './Sidebar'

type UserRole = 'student' | 'tutor' | 'admin'

const DashboardLayout = () => {
    const { user } = useAuth()

    // Get role from authenticated user, default to student
    const role = (user?.role as UserRole) || 'student'

    return (
        <SidebarProvider>
            <DashboardSidebar role={role} />
            <SidebarInset className="flex flex-col">
                {/* Mobile toggle for sidebar */}
                <div className="md:hidden p-2">
                    <SidebarTrigger />
                </div>

                <main className="flex-1 w-full p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout
