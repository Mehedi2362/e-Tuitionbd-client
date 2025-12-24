/**
 * Profile Form Field Definitions
 * Contains field configurations for profile settings form
 */

import type { LucideIcon } from 'lucide-react'
import { Camera, Mail, Phone, User } from 'lucide-react'

// ==================== Types ====================
export type ProfileFieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea'

export interface ProfileFieldConfig {
    name: string
    label: string
    type: ProfileFieldType
    placeholder?: string
    icon?: LucideIcon
    required?: boolean
    disabled?: boolean
    description?: string
    rows?: number
}

// ==================== Profile Form Fields ====================
export const profileFormFields: ProfileFieldConfig[] = [
    {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
        icon: User,
        required: true,
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'your@email.com',
        icon: Mail,
        required: true,
        disabled: true,
        description: 'Email cannot be changed',
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+880 1700-000000',
        icon: Phone,
    },
    {
        name: 'photoUrl',
        label: 'Photo URL',
        type: 'url',
        placeholder: 'Enter image URL or upload a photo',
        icon: Camera,
    },
]

// ==================== Tutor-specific Profile Fields ====================
export const tutorProfileFields: ProfileFieldConfig[] = [
    {
        name: 'bio',
        label: 'Bio',
        type: 'textarea',
        placeholder: 'Tell us about yourself...',
        rows: 3,
    },
    {
        name: 'qualifications',
        label: 'Qualifications',
        type: 'textarea',
        placeholder: 'Your educational qualifications...',
        rows: 3,
    },
    {
        name: 'experience',
        label: 'Teaching Experience',
        type: 'textarea',
        placeholder: 'Describe your teaching experience...',
        rows: 3,
    },
]
