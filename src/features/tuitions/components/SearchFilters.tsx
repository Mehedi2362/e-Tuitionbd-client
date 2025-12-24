/**
 * Search and Filters Component for Tuitions Page
 * Uses: Input, Select, Button, InputGroup
 */

import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowDownAZ, ArrowUpAZ, Filter, Search, X } from 'lucide-react'

export interface TuitionFilters {
    search: string
    classFilter: string
    subjectFilter: string
    locationFilter: string
    sortBy: string
    sortOrder: 'asc' | 'desc'
}

interface SearchFiltersProps {
    filters: TuitionFilters
    onFiltersChange: (filters: Partial<TuitionFilters>) => void
    onSearch: () => void
    onClear: () => void
}

const classes = [
    { value: 'all', label: 'সব ক্লাস' },
    { value: '1', label: 'ক্লাস ১' },
    { value: '2', label: 'ক্লাস ২' },
    { value: '3', label: 'ক্লাস ৩' },
    { value: '4', label: 'ক্লাস ৪' },
    { value: '5', label: 'ক্লাস ৫' },
    { value: '6', label: 'ক্লাস ৬' },
    { value: '7', label: 'ক্লাস ৭' },
    { value: '8', label: 'ক্লাস ৮' },
    { value: '9', label: 'ক্লাস ৯ (SSC)' },
    { value: '10', label: 'ক্লাস ১০ (SSC)' },
    { value: '11', label: 'ক্লাস ১১ (HSC)' },
    { value: '12', label: 'ক্লাস ১২ (HSC)' },
]

const subjects = [
    { value: 'all', label: 'সব বিষয়' },
    { value: 'bangla', label: 'বাংলা' },
    { value: 'english', label: 'ইংরেজি' },
    { value: 'math', label: 'গণিত' },
    { value: 'physics', label: 'পদার্থবিজ্ঞান' },
    { value: 'chemistry', label: 'রসায়ন' },
    { value: 'biology', label: 'জীববিজ্ঞান' },
    { value: 'ict', label: 'তথ্য ও যোগাযোগ প্রযুক্তি' },
    { value: 'general-science', label: 'সাধারণ বিজ্ঞান' },
    { value: 'higher-math', label: 'উচ্চতর গণিত' },
]

const locations = [
    { value: 'all', label: 'সব এলাকা' },
    { value: 'dhaka', label: 'ঢাকা' },
    { value: 'chittagong', label: 'চট্টগ্রাম' },
    { value: 'sylhet', label: 'সিলেট' },
    { value: 'rajshahi', label: 'রাজশাহী' },
    { value: 'khulna', label: 'খুলনা' },
    { value: 'barisal', label: 'বরিশাল' },
    { value: 'rangpur', label: 'রংপুর' },
    { value: 'mymensingh', label: 'ময়মনসিংহ' },
]

export function SearchFilters({ filters, onFiltersChange, onSearch, onClear }: SearchFiltersProps) {
    const hasActiveFilters = filters.search || filters.classFilter !== 'all' || filters.subjectFilter !== 'all' || filters.locationFilter !== 'all'

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
                <Select value={filters.classFilter} onValueChange={(value) => onFiltersChange({ classFilter: value })}>
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

                <Select value={filters.subjectFilter} onValueChange={(value) => onFiltersChange({ subjectFilter: value })}>
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

                <Select value={filters.locationFilter} onValueChange={(value) => onFiltersChange({ locationFilter: value })}>
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

                <Select value={filters.sortBy} onValueChange={(value) => onFiltersChange({ sortBy: value })}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="সর্ট করুন" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">তারিখ</SelectItem>
                        <SelectItem value="salary">বেতন</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => onFiltersChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })} className="gap-2">
                    {filters.sortOrder === 'asc' ? (
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
            </div>
        </div>
    )
}

export default SearchFilters
