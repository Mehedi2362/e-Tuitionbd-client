import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, X } from 'lucide-react'
import { useTutorFilterOptions } from '../hooks'

// Tutor filters interface
export interface TutorFilters {
    search: string
    subject: string
    location: string
    experience: string
}

interface TutorSearchFiltersProps {
    filters: TutorFilters
    onFiltersChange: (filters: TutorFilters) => void
    onSearch: () => void
    onClear: () => void
}

const TutorSearchFilters = ({ filters, onFiltersChange, onSearch, onClear }: TutorSearchFiltersProps) => {
    // Fetch filter options from API
    const { data: filterOptions, isLoading } = useTutorFilterOptions()
    const subjects = filterOptions?.subjects || []
    const locations = filterOptions?.locations || []
    const experienceOptions = filterOptions?.experience || []

    // Update single filter
    const updateFilter = (key: keyof TutorFilters, value: string) => {
        onFiltersChange({ ...filters, [key]: value })
    }

    // Check if any filter is active
    const hasActiveFilters = filters.search || (filters.subject && filters.subject !== 'all') || (filters.location && filters.location !== 'all') || (filters.experience && filters.experience !== 'all')

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
                <InputGroup className="flex-1">
                    <InputGroupAddon>
                        <Search className="h-4 w-4" />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Search by name or subject..." value={filters.search} onChange={(e) => updateFilter('search', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSearch()} />
                </InputGroup>
                <Button onClick={onSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
            </div>

            {/* Filter Options */}
            <div className="flex flex-wrap gap-4">
                {/* Subject Filter */}
                {isLoading ? (
                    <Skeleton className="h-10 w-45" />
                ) : (
                    <Select value={filters.subject || 'all'} onValueChange={(value) => updateFilter('subject', value)}>
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {subjects.map((subject) => (
                                <SelectItem key={subject.value} value={subject.value}>
                                    {subject.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* Location Filter */}
                {isLoading ? (
                    <Skeleton className="h-10 w-45" />
                ) : (
                    <Select value={filters.location || 'all'} onValueChange={(value) => updateFilter('location', value)}>
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                            {locations.map((location) => (
                                <SelectItem key={location.value} value={location.value}>
                                    {location.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* Experience Filter */}
                {isLoading ? (
                    <Skeleton className="h-10 w-45" />
                ) : (
                    <Select value={filters.experience || 'all'} onValueChange={(value) => updateFilter('experience', value)}>
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="Experience" />
                        </SelectTrigger>
                        <SelectContent>
                            {experienceOptions.map((exp) => (
                                <SelectItem key={exp.value} value={exp.value}>
                                    {exp.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                    <Button variant="ghost" onClick={onClear} className="text-muted-foreground">
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                )}
            </div>
        </div>
    )
}

export default TutorSearchFilters
