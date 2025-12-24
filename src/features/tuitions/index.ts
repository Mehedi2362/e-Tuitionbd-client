// ==================== Tuitions Feature Barrel Export ====================
// Centralized export for tuitions feature

// Components
export * from './components'

// Services
export { TuitionService } from './services/tuition.service'
export type { TuitionQueryParams } from './services/tuition.service'

export { ApplicationService } from './services/application.service'
export type { ApplicationQueryParams } from './services/application.service'

// Hooks (Query hooks + Form hooks)
export * from './hooks'

// Fields (Constants + Form field definitions - all in one place)
export { applicationFields, CLASSES, LOCATIONS, OPTIONS_MAP, postTuitionFields, SUBJECTS } from './fields'
export type { Class, FieldType, Location, OptionsKey, Subject, TuitionFieldConfig } from './fields'


// Pages
export { default as TuitionDetails } from './pages/TuitionDetailsPage'
export { default as Tuitions } from './pages/TuitionsPage'

// Validators
export * from './validators'
