// ==================== Tuition Hooks Barrel Export ====================

// Query Hooks
export { applicationKeys, useAcceptApplication, useApplication, useApplications, useApplicationsByTuition, useApplyForTuition, useRejectApplication, useWithdrawApplication } from './useApplicationQueries'
export { tuitionKeys, useApproveTuition, useCreateTuition, useDeleteTuition, useFeaturedTuitions, useMyTuitions, useRejectTuition, useTuition, useTuitions, useUpdateTuition } from './useTuitionQueries'
export { useFilterOptions } from './useFilterOptions'
export type { FilterOption, FilterOptions } from './useFilterOptions'

// Form Hooks
export { useApply } from './useApply'
export type { UseApplyOptions, UseApplyReturn } from './useApply'
export { usePostTuition } from './usePostTuition'
export type { UsePostTuitionOptions } from './usePostTuition'

