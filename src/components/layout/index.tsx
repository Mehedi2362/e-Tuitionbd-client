// ==================== Layout Components ====================
import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'

// Root Layout Component
const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Root

// Re-export all layout components
export { default as DashboardLayout } from './DashboardLayout'
export { default as Footer } from './Footer'
export { default as Header } from './Header'
export { default as Sidebar } from './Sidebar'
