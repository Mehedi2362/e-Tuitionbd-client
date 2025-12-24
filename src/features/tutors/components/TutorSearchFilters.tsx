import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X } from 'lucide-react'

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
}

// Available subjects
const SUBJECTS = [
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
]

// Available locations
const LOCATIONS = [
    { value: 'all', label: 'All Locations' },
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' },
    { value: 'rajshahi', label: 'Rajshahi' },
    { value: 'khulna', label: 'Khulna' },
    { value: 'barishal', label: 'Barishal' },
    { value: 'rangpur', label: 'Rangpur' },
    { value: 'mymensingh', label: 'Mymensingh' },
]

// Experience options
const EXPERIENCE_OPTIONS = [
    { value: 'all', label: 'Any Experience' },
    { value: '0-1', label: 'Less than 1 year' },
    { value: '1-2', label: '1-2 Years' },
    { value: '3-5', label: '3-5 Years' },
    { value: '5+', label: '5+ Years' },
]

const TutorSearchFilters = ({ filters, onFiltersChange, onSearch }: TutorSearchFiltersProps) => {
    // Update single filter
    const updateFilter = (key: keyof TutorFilters, value: string) => {
        onFiltersChange({ ...filters, [key]: value })
    }

    // Clear all filters
    const clearFilters = () => {
        onFiltersChange({
            search: '',
            subject: 'all',
            location: 'all',
            experience: 'all',
        })
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
                <Select value={filters.subject || 'all'} onValueChange={(value) => updateFilter('subject', value)}>
                    <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {SUBJECTS.map((subject) => (
                            <SelectItem key={subject.value} value={subject.value}>
                                {subject.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Location Filter */}
                <Select value={filters.location || 'all'} onValueChange={(value) => updateFilter('location', value)}>
                    <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                        {LOCATIONS.map((location) => (
                            <SelectItem key={location.value} value={location.value}>
                                {location.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Experience Filter */}
                <Select value={filters.experience || 'all'} onValueChange={(value) => updateFilter('experience', value)}>
                    <SelectTrigger className="w-45">
                        <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                        {EXPERIENCE_OPTIONS.map((exp) => (
                            <SelectItem key={exp.value} value={exp.value}>
                                {exp.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                    <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                )}
            </div>
        </div>
    )
}

export default TutorSearchFilters
