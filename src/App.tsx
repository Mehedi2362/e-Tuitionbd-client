import { RouterProvider } from 'react-router/dom'
import { router } from './routes'
import { AuthProvider } from './features/auth'
import { Toaster } from './components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from './hooks'
const queryClient = new QueryClient()

export const App = () => {
    useTheme()
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
                <Toaster richColors position="top-right" />
            </AuthProvider>
        </QueryClientProvider>
    )
}
