// #TODO: Tutors Listing Page
// #TODO: Display all verified tutors
// #TODO: Search functionality
// #TODO: Filter options

import { TutorSearchFilters, TutorsGrid } from '@/features/tutors'
import type { TutorFilters } from '@/features/tutors/components/TutorSearchFilters'
import { useTutors } from '@/features/tutors/queries'
import { useState } from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const initialFilters: TutorFilters & { page: number } = {
    page: 1,
    search: '',
    subject: 'all',
    location: 'all',
    experience: 'all',
}

const TutorsPage = () => {
    // Filter state
    const [filters, setFilters] = useState<TutorFilters & { page: number }>(initialFilters)

    // Fetch tutors from server
    const { data, isLoading } = useTutors(filters as any)
    const tutors = data?.data
    const paginationMeta = data?.pagination

    const handleFiltersChange = (newFilters: Partial<TutorFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
    }

    const handleSearch = () => {
        setFilters((prev) => ({ ...prev, page: 1 }))
    }

    const handleClear = () => {
        setFilters(initialFilters)
    }

    const totalPages = paginationMeta?.totalPages || 1

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Find Tutors</h1>
                <p className="text-muted-foreground">Browse through our verified and experienced tutors</p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-8">
                <TutorSearchFilters filters={filters} onFiltersChange={handleFiltersChange} onSearch={handleSearch} onClear={handleClear} />
            </div>

            {/* Tutors Grid */}
            <div className="mb-8">
                <TutorsGrid tutors={tutors} isLoading={isLoading} />
            </div>

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => setFilters((prev) => ({ ...prev, page: Math.max((prev.page ?? 1) - 1, 1) }))} />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i + 1}>
                            <PaginationLink href="#" isActive={filters.page === i + 1} onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => setFilters((prev) => ({ ...prev, page: Math.min((prev.page ?? 1) + 1, totalPages) }))} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default TutorsPage
