/**
 * Search and Filters Component for Tuitions Page
 * Uses: Input, Select, Button, InputGroup
 */

import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowDownAZ, ArrowUpAZ, Filter, Search, X } from 'lucide-react'
import { useFilterOptions } from '../hooks/useFilterOptions'

export interface TuitionFilters {
    page?: number
    limit?: number
    search: string
    class: string
    subject: string
    location: string
    sort: string
    order: 'asc' | 'desc'
}

interface SearchFiltersProps {
    filters: TuitionFilters
    onFiltersChange: (filters: Partial<TuitionFilters>) => void
    onSearch: () => void
    onClear: () => void
}

export function SearchFilters({ filters, onFiltersChange, onSearch, onClear }: SearchFiltersProps) {
    const { data: filterOptions, isLoading } = useFilterOptions()
    const classes = filterOptions?.classes || []
    const subjects = filterOptions?.subjects || []
    const locations = filterOptions?.locations || []

    const hasActiveFilters = filters.search || filters.class !== 'all' || filters.subject !== 'all' || filters.location !== 'all'

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
                <InputGroup className="flex-1">
                    <InputGroupAddon>
                        <InputGroupText>
                            <Search className="h-4 w-4" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="বিষয়, এলাকা, বা কীওয়ার্ড দিয়ে খুঁজুন..." value={filters.search} onChange={(e) => onFiltersChange({ search: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && onSearch()} />
                </InputGroup>
                <Button onClick={onSearch}>
                    <Filter className="mr-2 h-4 w-4" />
                    খুঁজুন
                </Button>
            </div>

            {/* Filter Options */}
            <div className="flex flex-wrap gap-4">
                {isLoading ? (
                    <>
                        <Skeleton className="h-10 w-[180px]" />
                        <Skeleton className="h-10 w-[180px]" />
                        <Skeleton className="h-10 w-[180px]" />
                        <Skeleton className="h-10 w-[150px]" />
                    </>
                ) : (
                    <>
                        <Select value={filters.class} onValueChange={(value) => onFiltersChange({ class: value })}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="ক্লাস নির্বাচন" />
                            </SelectTrigger>
                            <SelectContent>
                                {classes.map((cls) => (
                                    <SelectItem key={cls.value} value={cls.value}>
                                        {cls.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filters.subject} onValueChange={(value) => onFiltersChange({ subject: value })}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="বিষয় নির্বাচন" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map((subject) => (
                                    <SelectItem key={subject.value} value={subject.value}>
                                        {subject.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filters.location} onValueChange={(value) => onFiltersChange({ location: value })}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="এলাকা নির্বাচন" />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map((location) => (
                                    <SelectItem key={location.value} value={location.value}>
                                        {location.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filters.sort} onValueChange={(value) => onFiltersChange({ sort: value })}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="সর্ট করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">তারিখ</SelectItem>
                                <SelectItem value="budget">বাজেট</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" onClick={() => onFiltersChange({ order: filters.order === 'asc' ? 'desc' : 'asc' })} className="gap-2">
                            {filters.order === 'asc' ? (
                                <>
                                    <ArrowUpAZ className="h-4 w-4" /> ঊর্ধ্বক্রম
                                </>
                            ) : (
                                <>
                                    <ArrowDownAZ className="h-4 w-4" /> অধঃক্রম
                                </>
                            )}
                        </Button>

                        {hasActiveFilters && (
                            <Button variant="ghost" onClick={onClear} className="text-muted-foreground">
                                <X className="mr-2 h-4 w-4" />
                                ফিল্টার মুছুন
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default SearchFilters
