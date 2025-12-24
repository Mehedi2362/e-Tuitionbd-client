// ==================== Tutor Filter Options Hook ====================
// Fetch available tutor filter options from API
import { useQuery } from '@tanstack/react-query'
import { TutorService } from '../service'

export interface FilterOption {
    value: string
    label: string
}

export interface TutorFilterOptions {
    subjects: FilterOption[]
    locations: FilterOption[]
    experience: FilterOption[]
}

// Label mappings for subjects
const subjectLabels: Record<string, string> = {
    all: 'All Subjects',
    math: 'Mathematics',
    physics: 'Physics',
    chemistry: 'Chemistry',
    biology: 'Biology',
    english: 'English',
    bangla: 'Bangla',
    ict: 'ICT',
    accounting: 'Accounting',
    economics: 'Economics',
    'general-science': 'General Science',
    'higher-math': 'Higher Mathematics',
}

// Label mappings for locations
const locationLabels: Record<string, string> = {
    all: 'All Locations',
    dhaka: 'Dhaka',
    chittagong: 'Chittagong',
    sylhet: 'Sylhet',
    rajshahi: 'Rajshahi',
    khulna: 'Khulna',
    barishal: 'Barishal',
    barisal: 'Barishal',
    rangpur: 'Rangpur',
    mymensingh: 'Mymensingh',
}

// Label mappings for experience
const experienceLabels: Record<string, string> = {
    all: 'Any Experience',
    '0-1': 'Less than 1 year',
    '1-2': '1-2 Years',
    '3-5': '3-5 Years',
    '5+': '5+ Years',
}

// Hardcoded fallback options in case API fails
const defaultFilterOptions: TutorFilterOptions = {
    subjects: [
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
    ],
    locations: [
        { value: 'all', label: 'All Locations' },
        { value: 'dhaka', label: 'Dhaka' },
        { value: 'chittagong', label: 'Chittagong' },
        { value: 'sylhet', label: 'Sylhet' },
        { value: 'rajshahi', label: 'Rajshahi' },
        { value: 'khulna', label: 'Khulna' },
        { value: 'barishal', label: 'Barishal' },
        { value: 'rangpur', label: 'Rangpur' },
        { value: 'mymensingh', label: 'Mymensingh' },
    ],
    experience: [
        { value: 'all', label: 'Any Experience' },
        { value: '0-1', label: 'Less than 1 year' },
        { value: '1-2', label: '1-2 Years' },
        { value: '3-5', label: '3-5 Years' },
        { value: '5+', label: '5+ Years' },
    ],
}

export const useTutorFilterOptions = () => {
    return useQuery({
        queryKey: ['tutor-filter-options'],
        queryFn: async () => {
            try {
                const data = await TutorService.getFilterOptions()

                // Transform API response to FilterOptions format
                const transformedOptions: TutorFilterOptions = {
                    subjects: data.subjects.map(value => ({
                        value,
                        label: subjectLabels[value] || value
                    })),
                    locations: data.locations.map(value => ({
                        value,
                        label: locationLabels[value] || value
                    })),
                    experience: data.experience.map(value => ({
                        value,
                        label: experienceLabels[value] || value
                    }))
                }

                return transformedOptions
            } catch (error) {
                console.warn('Failed to fetch tutor filter options, using defaults', error)
                return defaultFilterOptions
            }
        },
        staleTime: 1000 * 60 * 60, // 1 hour
    })
}
