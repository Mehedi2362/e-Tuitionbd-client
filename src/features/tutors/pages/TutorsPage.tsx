// #TODO: Tutors Listing Page
// #TODO: Display all verified tutors
// #TODO: Search functionality
// #TODO: Filter options

import { TutorSearchFilters, TutorsGrid } from '@/features/tutors'
import type { TutorFilters } from '@/features/tutors/components/TutorSearchFilters'
import { useTutors } from '@/features/tutors/queries'
import { useState } from 'react'

const TutorsPage = () => {
    // Filter state
    const [filters, setFilters] = useState<TutorFilters>({
        search: '',
        subject: 'all',
        location: 'all',
        experience: 'all',
    })

    // Fetch tutors from server
    const { data: response, isLoading, error } = useTutors(filters as any)

    // Extract tutors array from paginated response
    const tutors = response?.data || []

    // Show error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">Failed to load tutors</h2>
                    <p className="text-muted-foreground mt-2">Please try again later</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Find Tutors</h1>
                <p className="text-muted-foreground">Browse through our verified and experienced tutors</p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-8">
                <TutorSearchFilters filters={filters} onFiltersChange={setFilters} onSearch={() => {}} />
            </div>

            {/* Tutors Grid */}
            <TutorsGrid tutors={tutors} isLoading={isLoading} />
        </div>
    )
}

export default TutorsPage
