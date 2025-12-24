/**
 * Tuition Validators
 * Zod schemas for tuition-related form validation
 */

import { z } from 'zod'

// Application Form Schema
export const applicationFormSchema = z.object({
    qualifications: z.string().min(1, 'Qualifications are required'),
    experience: z.string().min(1, 'Experience is required'),
    expectedSalary: z.number().min(0, 'Salary must be positive'),
    availability: z.string().optional(),
    coverLetter: z.string().optional(),
    contactNumber: z.string().min(1, 'Contact number is required'),
    tuitionId: z.string().min(1, 'Tuition ID is required'),
})

export type ApplicationFormData = z.infer<typeof applicationFormSchema>

// Create Tuition Form Schema
export const createTuitionSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    subjects: z.array(z.string()).min(1, 'At least one subject is required'),
    class: z.string().min(1, 'Class is required'),
    location: z.string().min(1, 'Location is required'),
    salary: z.number().min(0, 'Salary must be positive'),
    requirements: z.string().optional(),
    schedule: z.string().optional(),
    duration: z.string().optional(),
    preferredGender: z.enum(['male', 'female', 'any']).optional(),
    isUrgent: z.boolean(),
})

export type CreateTuitionFormData = z.infer<typeof createTuitionSchema>