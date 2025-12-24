// ==================== Filter Options Hook ====================
// Fetch available filter options from API
import { useQuery } from '@tanstack/react-query'
import { TuitionService } from '../services/tuition.service'

export interface FilterOption {
    value: string
    label: string
}

export interface FilterOptions {
    classes: FilterOption[]
    subjects: FilterOption[]
    locations: FilterOption[]
}

// Label mappings for subjects
const subjectLabels: Record<string, string> = {
    all: 'সব বিষয়',
    bangla: 'বাংলা',
    english: 'ইংরেজি',
    math: 'গণিত',
    physics: 'পদার্থবিজ্ঞান',
    chemistry: 'রসায়ন',
    biology: 'জীববিজ্ঞান',
    ict: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    'general-science': 'সাধারণ বিজ্ঞান',
    'higher-math': 'উচ্চতর গণিত',
}

// Label mappings for locations
const locationLabels: Record<string, string> = {
    all: 'সব এলাকা',
    dhaka: 'ঢাকা',
    chittagong: 'চট্টগ্রাম',
    sylhet: 'সিলেট',
    rajshahi: 'রাজশাহী',
    khulna: 'খুলনা',
    barisal: 'বরিশাল',
    rangpur: 'রংপুর',
    mymensingh: 'ময়মনসিংহ',
}

// Hardcoded fallback options in case API fails
const defaultFilterOptions: FilterOptions = {
    classes: [
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
        { value: '11', label: 'ক্লাস ११ (HSC)' },
        { value: '12', label: 'ক্লাস १२ (HSC)' },
    ],
    subjects: [
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
    ],
    locations: [
        { value: 'all', label: 'সব এলাকা' },
        { value: 'dhaka', label: 'ঢাকা' },
        { value: 'chittagong', label: 'চট্টগ্রাম' },
        { value: 'sylhet', label: 'সিলেট' },
        { value: 'rajshahi', label: 'রাজশাহী' },
        { value: 'khulna', label: 'খুলনা' },
        { value: 'barisal', label: 'বরিশাল' },
        { value: 'rangpur', label: 'রংপুর' },
        { value: 'mymensingh', label: 'ময়মনসিংহ' },
    ],
}

// Transform class value to label
const getClassLabel = (classValue: string): string => {
    if (classValue === 'all') return 'সব ক্লাস'
    const num = parseInt(classValue, 10)
    if (num >= 9 && num <= 10) return `ক্লাস ${classValue} (SSC)`
    if (num >= 11 && num <= 12) return `ক্লাস ${classValue} (HSC)`
    return `ক্লাস ${classValue}`
}

export const useFilterOptions = () => {
    return useQuery({
        queryKey: ['tuition-filter-options'],
        queryFn: async () => {
            try {
                const data = await TuitionService.getFilterOptions()

                // Transform API response to FilterOptions format
                const transformedOptions: FilterOptions = {
                    classes: data.classes.map(value => ({
                        value,
                        label: getClassLabel(value)
                    })),
                    subjects: data.subjects.map(value => ({
                        value,
                        label: subjectLabels[value] || value
                    })),
                    locations: data.locations.map(value => ({
                        value,
                        label: locationLabels[value] || value
                    }))
                }
                console.log(transformedOptions);
                
                return transformedOptions
            } catch (error) {
                console.warn('Failed to fetch filter options, using defaults', error)
                return defaultFilterOptions
            }
        },
        staleTime: 1000 * 60 * 60, // 1 hour
    })
}
