/**
 * useTutorFilters Hook
 * Custom hook for tutor search and filter logic
 * Manages filter state and provides debounced search
 */

import { useTutors } from '../queries'
import type { TutorQueryParams } from '../service'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

// ==================== Types ====================
export interface TutorFilters {
    search: string
    subject: string
    location: string
    experience: string
}

export interface UseTutorFiltersOptions {
    defaultFilters?: Partial<TutorFilters>
    syncWithUrl?: boolean
}

// ==================== Default Values ====================
const DEFAULT_FILTERS: TutorFilters = {
    search: '',
    subject: 'all',
    location: 'all',
    experience: 'all',
}

// ==================== Filter Options Constants ====================
export const TUTOR_FILTER_SUBJECTS = [
    { value: 'all', label: 'All Subjects' },
    { value: 'math', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'bangla', label: 'Bangla' },
    { value: 'ict', label: 'ICT' },
    { value: 'accounting', label: 'Accounting' },
    { value: 'economics', label: 'Economics' },
] as const

export const TUTOR_FILTER_LOCATIONS = [
    { value: 'all', label: 'All Locations' },
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' },
    { value: 'rajshahi', label: 'Rajshahi' },
    { value: 'khulna', label: 'Khulna' },
    { value: 'barishal', label: 'Barishal' },
    { value: 'rangpur', label: 'Rangpur' },
    { value: 'mymensingh', label: 'Mymensingh' },
] as const

export const TUTOR_FILTER_EXPERIENCE = [
    { value: 'all', label: 'Any Experience' },
    { value: '0-1', label: 'Less than 1 year' },
    { value: '1-2', label: '1-2 Years' },
    { value: '3-5', label: '3-5 Years' },
    { value: '5+', label: '5+ Years' },
] as const

// ==================== Hook ====================
export const useTutorFilters = (options: UseTutorFiltersOptions = {}) => {
    const { defaultFilters = {}, syncWithUrl = false } = options
    const [searchParams, setSearchParams] = useSearchParams()

    // Initialize filters from URL or defaults
    const getInitialFilters = (): TutorFilters => {
        if (syncWithUrl) {
            return {
                search: searchParams.get('q') || defaultFilters.search || DEFAULT_FILTERS.search,
                subject: searchParams.get('subject') || defaultFilters.subject || DEFAULT_FILTERS.subject,
                location: searchParams.get('location') || defaultFilters.location || DEFAULT_FILTERS.location,
                experience: searchParams.get('exp') || defaultFilters.experience || DEFAULT_FILTERS.experience,
            }
        }
        return { ...DEFAULT_FILTERS, ...defaultFilters }
    }

    const [filters, setFilters] = useState<TutorFilters>(getInitialFilters)

    // Convert filters to query params for API
    const queryParams = useMemo<TutorQueryParams>(() => {
        const params: TutorQueryParams = {}

        if (filters.search) params.search = filters.search
        if (filters.subject && filters.subject !== 'all') params.subject = filters.subject

        return params
    }, [filters])

    // Fetch tutors with current filters
    const { data, isLoading, error, refetch } = useTutors(queryParams)

    // Update a single filter
    const updateFilter = useCallback(
        (key: keyof TutorFilters, value: string) => {
            setFilters((prev) => {
                const newFilters = { ...prev, [key]: value }

                // Sync to URL if enabled
                if (syncWithUrl) {
                    const params = new URLSearchParams()
                    if (newFilters.search) params.set('q', newFilters.search)
                    if (newFilters.subject !== 'all') params.set('subject', newFilters.subject)
                    if (newFilters.location !== 'all') params.set('location', newFilters.location)
                    if (newFilters.experience !== 'all') params.set('exp', newFilters.experience)
                    setSearchParams(params, { replace: true })
                }

                return newFilters
            })
        },
        [syncWithUrl, setSearchParams]
    )

    // Update all filters at once
    const setAllFilters = useCallback(
        (newFilters: TutorFilters) => {
            setFilters(newFilters)

            if (syncWithUrl) {
                const params = new URLSearchParams()
                if (newFilters.search) params.set('q', newFilters.search)
                if (newFilters.subject !== 'all') params.set('subject', newFilters.subject)
                if (newFilters.location !== 'all') params.set('location', newFilters.location)
                if (newFilters.experience !== 'all') params.set('exp', newFilters.experience)
                setSearchParams(params, { replace: true })
            }
        },
        [syncWithUrl, setSearchParams]
    )

    // Clear all filters
    const clearFilters = useCallback(() => {
        setAllFilters(DEFAULT_FILTERS)
    }, [setAllFilters])

    // Check if any filter is active
    const hasActiveFilters = useMemo(
        () =>
            filters.search ||
            (filters.subject && filters.subject !== 'all') ||
            (filters.location && filters.location !== 'all') ||
            (filters.experience && filters.experience !== 'all'),
        [filters]
    )

    // Trigger search (refetch with current filters)
    const search = useCallback(() => {
        refetch()
    }, [refetch])

    return {
        // Filter state
        filters,
        setFilters: setAllFilters,
        updateFilter,
        clearFilters,
        hasActiveFilters,

        // Query state
        tutors: data?.data || [],
        totalCount: data?.meta?.total || 0,
        isLoading,
        error,
        search,
        refetch,

        // Filter options (for dropdowns)
        filterOptions: {
            subjects: TUTOR_FILTER_SUBJECTS,
            locations: TUTOR_FILTER_LOCATIONS,
            experience: TUTOR_FILTER_EXPERIENCE,
        },
    }
}

export type UseTutorFiltersReturn = ReturnType<typeof useTutorFilters>
