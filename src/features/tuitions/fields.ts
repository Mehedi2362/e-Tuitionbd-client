/**
 * Tuition Form Field Definitions
 * Contains both field configurations and related constants
 */

import type { LucideIcon } from 'lucide-react'
import { BookOpen, Calendar, DollarSign, MapPin } from 'lucide-react'

// ==================== Select Options Constants ====================
export const SUBJECTS = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'bangla', label: 'Bangla' },
    { value: 'ict', label: 'ICT' },
    { value: 'higher-math', label: 'Higher Mathematics' },
    { value: 'accounting', label: 'Accounting' },
    { value: 'economics', label: 'Economics' },
] as const

export const CLASSES = [
    { value: '1', label: 'Class 1' },
    { value: '2', label: 'Class 2' },
    { value: '3', label: 'Class 3' },
    { value: '4', label: 'Class 4' },
    { value: '5', label: 'Class 5' },
    { value: '6', label: 'Class 6' },
    { value: '7', label: 'Class 7' },
    { value: '8', label: 'Class 8' },
    { value: '9', label: 'Class 9' },
    { value: '10', label: 'Class 10' },
    { value: '11', label: 'Class 11 (HSC)' },
    { value: '12', label: 'Class 12 (HSC)' },
    { value: 'university', label: 'University' },
] as const

export const LOCATIONS = [
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' },
    { value: 'rajshahi', label: 'Rajshahi' },
    { value: 'khulna', label: 'Khulna' },
    { value: 'barisal', label: 'Barisal' },
    { value: 'rangpur', label: 'Rangpur' },
    { value: 'mymensingh', label: 'Mymensingh' },
    { value: 'online', label: 'Online' },
] as const

// ==================== Types ====================
export type Subject = (typeof SUBJECTS)[number]['value']
export type Class = (typeof CLASSES)[number]['value']
export type Location = (typeof LOCATIONS)[number]['value']

export interface SelectOption {
    readonly value: string
    readonly label: string
}

export type FieldType = 'text' | 'number' | 'select' | 'textarea'
export type OptionsKey = 'SUBJECTS' | 'CLASSES' | 'LOCATIONS'

export interface TuitionFieldConfig {
    name: string
    label: string
    type: FieldType
    placeholder?: string
    icon?: LucideIcon
    optionsKey?: OptionsKey
    required?: boolean
    rows?: number
    gridCols?: 1 | 2
}

// Options map for resolving optionsKey
export const OPTIONS_MAP: Record<OptionsKey, readonly SelectOption[]> = {
    SUBJECTS,
    CLASSES,
    LOCATIONS,
}

// ==================== Post Tuition Form Fields ====================
export const postTuitionFields: TuitionFieldConfig[] = [
    {
        name: 'subject',
        label: 'Subject *',
        type: 'select',
        placeholder: 'Select subject',
        icon: BookOpen,
        optionsKey: 'SUBJECTS',
        required: true,
        gridCols: 2,
    },
    {
        name: 'class',
        label: 'Class *',
        type: 'select',
        placeholder: 'Select class',
        optionsKey: 'CLASSES',
        required: true,
        gridCols: 2,
    },
    {
        name: 'location',
        label: 'Location *',
        type: 'select',
        placeholder: 'Select location',
        icon: MapPin,
        optionsKey: 'LOCATIONS',
        required: true,
        gridCols: 2,
    },
    {
        name: 'budget',
        label: 'Budget (৳/month) *',
        type: 'number',
        placeholder: 'e.g., 8000',
        icon: DollarSign,
        required: true,
        gridCols: 2,
    },
    {
        name: 'schedule',
        label: 'Schedule *',
        type: 'text',
        placeholder: 'e.g., 3 days/week, Evening (6:00 PM - 8:00 PM)',
        icon: Calendar,
        required: true,
        gridCols: 1,
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Provide additional details about your tuition requirements...',
        rows: 4,
        gridCols: 1,
    },
    {
        name: 'requirements',
        label: 'Requirements for Tutor',
        type: 'textarea',
        placeholder: 'Specify any specific requirements for the tutor...',
        rows: 3,
        gridCols: 1,
    },
]

// ==================== Application Form Fields ====================
export const applicationFields: TuitionFieldConfig[] = [
    {
        name: 'qualifications',
        label: 'Qualifications *',
        type: 'textarea',
        placeholder: 'Describe your educational background and qualifications...',
        required: true,
        rows: 3,
        gridCols: 1,
    },
    {
        name: 'experience',
        label: 'Teaching Experience *',
        type: 'textarea',
        placeholder: 'Describe your teaching experience...',
        required: true,
        rows: 3,
        gridCols: 1,
    },
    {
        name: 'expectedSalary',
        label: 'Expected Salary (৳/month) *',
        type: 'number',
        placeholder: 'e.g., 8000',
        icon: DollarSign,
        required: true,
        gridCols: 1,
    },
]
