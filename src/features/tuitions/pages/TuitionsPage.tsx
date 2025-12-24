/**
 * Tuitions Page - Browse and search tuitions
 * Modular structure with components
 */

import { SearchFilters, TuitionsGrid } from '@/features/tuitions'
import type { TuitionFilters } from '@/features/tuitions/components/SearchFilters'
import type { Tuition } from '@/features/tuitions/components/TuitionCard'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { useState } from 'react'

// Demo data for tuitions
const demoTuitions: Tuition[] = [
    {
        _id: '1',
        title: 'গণিত টিউটর দরকার - SSC পরীক্ষার প্রস্তুতি',
        class: '১০',
        subjects: ['গণিত', 'উচ্চতর গণিত'],
        location: 'ধানমন্ডি, ঢাকা',
        salary: { min: 5000, max: 8000 },
        daysPerWeek: 4,
        preferredTime: 'বিকাল',
        status: 'approved',
        createdAt: '2024-01-15',
    },
    {
        _id: '2',
        title: 'ইংরেজি টিউটর - কথা বলা ও লেখার দক্ষতা বাড়াতে',
        class: '৮',
        subjects: ['ইংরেজি'],
        location: 'মিরপুর, ঢাকা',
        salary: { min: 4000, max: 6000 },
        daysPerWeek: 3,
        preferredTime: 'সন্ধ্যা',
        status: 'approved',
        createdAt: '2024-01-14',
    },
    {
        _id: '3',
        title: 'পদার্থবিজ্ঞান ও রসায়ন - HSC',
        class: '১২',
        subjects: ['পদার্থবিজ্ঞান', 'রসায়ন'],
        location: 'গুলশান, ঢাকা',
        salary: { min: 8000, max: 12000 },
        daysPerWeek: 5,
        preferredTime: 'সকাল',
        status: 'approved',
        createdAt: '2024-01-13',
    },
    {
        _id: '4',
        title: 'প্রাথমিক স্তরের সব বিষয়',
        class: '৫',
        subjects: ['বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান'],
        location: 'উত্তরা, ঢাকা',
        salary: { min: 3000, max: 5000 },
        daysPerWeek: 6,
        preferredTime: 'বিকাল',
        status: 'approved',
        createdAt: '2024-01-12',
    },
    {
        _id: '5',
        title: 'জীববিজ্ঞান টিউটর - মেডিকেল এডমিশন প্রস্তুতি',
        class: '১২',
        subjects: ['জীববিজ্ঞান'],
        location: 'মোহাম্মদপুর, ঢাকা',
        salary: { min: 6000, max: 10000 },
        daysPerWeek: 4,
        preferredTime: 'রাত',
        status: 'approved',
        createdAt: '2024-01-11',
    },
    {
        _id: '6',
        title: 'আইসিটি টিউটর - প্রোগ্রামিং বেসিক',
        class: '৯',
        subjects: ['তথ্য ও যোগাযোগ প্রযুক্তি'],
        location: 'অনলাইন',
        salary: { min: 4000, max: 7000 },
        daysPerWeek: 3,
        preferredTime: 'সন্ধ্যা',
        status: 'approved',
        createdAt: '2024-01-10',
    },
]

const initialFilters: TuitionFilters = {
    search: '',
    classFilter: 'all',
    subjectFilter: 'all',
    locationFilter: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
}

const TuitionsPage = () => {
    const [filters, setFilters] = useState<TuitionFilters>(initialFilters)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading] = useState(false)

    // TODO: Replace with useQuery
    // const { data: tuitions, isLoading, error } = useQuery({
    //   queryKey: ['tuitions', filters, currentPage],
    //   queryFn: () => fetchTuitions({ ...filters, page: currentPage }),
    // });

    const handleFiltersChange = (newFilters: Partial<TuitionFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }))
    }

    const handleSearch = () => {
        setCurrentPage(1)
        // TODO: Trigger query refetch
    }

    const handleClear = () => {
        setFilters(initialFilters)
        setCurrentPage(1)
    }

    const totalPages = 5 // TODO: Get from API response

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
                <TuitionsGrid tuitions={demoTuitions} isLoading={isLoading} />
            </div>

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i + 1}>
                            <PaginationLink href="#" isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default TuitionsPage
