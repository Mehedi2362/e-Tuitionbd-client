// ==================== Auth Feature Barrel Export ====================
// Centralized export for auth feature

// Types first (required by other modules)
export * from './types'

// Auth Context & Provider (lightweight - no heavy dependencies)
export * from './context'

// NOTE: authService is NOT exported here to enable tree-shaking
// Import directly from './service' when needed to avoid loading Firebase in bundle
// export { default as authService } from './service'

// NOTE: validators NOT exported here to enable tree-shaking (zod is heavy)
// Import directly from './validators' when needed
// export * from './validators'

// NOTE: auth Components use react-hook-form, so they pull vendor-form into bundle
// Import directly from './components' when needed in form pages
// export * from './components'

// NOTE: hooks use react-hook-form, so they pull vendor-form into bundle
// Import directly from './hooks' when needed in form pages
// export * from './hooks'

// NOTE: Pages are NOT exported here to enable lazy loading with code splitting
// Import pages directly when needed via React.lazy():
// - const LoginPage = React.lazy(() => import('@/features/auth/pages/LoginPage'))
// - const RegisterPage = React.lazy(() => import('@/features/auth/pages/RegisterPage'))
// export { default as Login } from './pages/LoginPage'
// export { default as Register } from './pages/RegisterPage'
