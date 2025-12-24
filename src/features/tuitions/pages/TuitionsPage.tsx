/**
 * Tuitions Page - Browse and search tuitions
 * Modular structure with components
 */

import { SearchFilters, TuitionsGrid, useTuitions } from '@/features/tuitions'
import type { TuitionFilters } from '@/features/tuitions/components/SearchFilters'
import type { Tuition } from '@/types'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { useState } from 'react'

// Demo data for tuitions

// const tuitions: Tuition[] = [
//     {
//         _id: '1',
//         subject: 'গণিত, উচ্চতর গণিত',
//         class: '১০',
//         location: 'ধানমন্ডি, ঢাকা',
//         budget: 8000,
//         schedule: 'সপ্তাহে ৪ দিন, বিকাল',
//         status: 'approved',
//         createdAt: '2024-01-15',
//     },
//     {
//         _id: '2',
//         subject: 'ইংরেজি',
//         class: '৮',
//         location: 'মিরপুর, ঢাকা',
//         budget: 6000,
//         schedule: 'সপ্তাহে ৩ দিন, সন্ধ্যা',
//         status: 'approved',
//         createdAt: '2024-01-14',
//     },
//     {
//         _id: '3',
//         subject: 'পদার্থবিজ্ঞান, রসায়ন',
//         class: '১২',
//         location: 'গুলশান, ঢাকা',
//         budget: 12000,
//         schedule: 'সপ্তাহে ৫ দিন, সকাল',
//         status: 'approved',
//         createdAt: '2024-01-13',
//     },
//     {
//         _id: '4',
//         subject: 'বাংলা, ইংরেজি, গণিত, বিজ্ঞান',
//         class: '৫',
//         location: 'উত্তরা, ঢাকা',
//         budget: 5000,
//         schedule: 'সপ্তাহে ৬ দিন, বিকাল',
//         status: 'approved',
//         createdAt: '2024-01-12',
//     },
//     {
//         _id: '5',
//         subject: 'জীববিজ্ঞান',
//         class: '১২',
//         location: 'মোহাম্মদপুর, ঢাকা',
//         budget: 10000,
//         schedule: 'সপ্তাহে ৪ দিন, রাত',
//         status: 'approved',
//         createdAt: '2024-01-11',
//     },
//     {
//         _id: '6',
//         subject: 'তথ্য ও যোগাযোগ প্রযুক্তি',
//         class: '৯',
//         location: 'অনলাইন',
//         budget: 7000,
//         schedule: 'সপ্তাহে ৩ দিন, সন্ধ্যা',
//         status: 'approved',
//         createdAt: '2024-01-10',
//     },
// ]

const initialFilters: TuitionFilters = {
    page: 1,
    search: '',
    class: 'all',
    subject: 'all',
    location: 'all',
    sort: 'date',
    order: 'desc',
}

const TuitionsPage = () => {
    const [filters, setFilters] = useState<TuitionFilters>(initialFilters)

    // Fetch tuitions from API
    const { data, isLoading, error } = useTuitions(filters)
    const tuitions = data?.data
    const paginationMeta = data?.pagination

    const handleFiltersChange = (newFilters: Partial<TuitionFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }))
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
                <h1 className="text-3xl font-bold mb-2">টিউশন খুঁজুন</h1>
                <p className="text-muted-foreground">সব অনুমোদিত টিউশন ব্রাউজ করুন এবং আপনার পছন্দের টিউশনে আবেদন করুন</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8">
                <SearchFilters filters={filters} onFiltersChange={handleFiltersChange} onSearch={handleSearch} onClear={handleClear} />
            </div>

            {/* Tuitions Grid */}
            <div className="mb-8">
                <TuitionsGrid tuitions={tuitions as Tuition[]} isLoading={isLoading} error={error} />
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

export default TuitionsPage
