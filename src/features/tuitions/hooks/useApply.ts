/**
 * useApply Hook
 * Custom hook for tuition application form logic
 * Handles form state, validation, and submission
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { CreateApplicationInput } from '@/types'
import { useApplyForTuition } from './useApplicationQueries'
import { applicationFormSchema, type ApplicationFormData } from '../validators'

export interface UseApplyOptions {
    tuitionId: string
    onSuccess?: () => void
}

export const useApply = (options: UseApplyOptions) => {
    const { tuitionId, onSuccess } = options
    const [isOpen, setIsOpen] = useState(false)

    // React Hook Form with Zod validation
    const form = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            qualifications: '',
            experience: '',
            expectedSalary: 0,
            availability: '',
            coverLetter: '',
            contactNumber: '',
            tuitionId,
        },
    })

    // Apply for tuition mutation
    const applyMutation = useApplyForTuition()

    // Handle form submission
    const onSubmit = async (data: ApplicationFormData) => {
        try {
            await applyMutation.mutateAsync({
                tuitionId,
                data: data as CreateApplicationInput,
            })
            form.reset()
            setIsOpen(false)
            onSuccess?.()
        } catch (error) {
            // Error toast is handled by mutation
            console.error('Application failed:', error)
        }
    }

    // Handle form submission wrapper
    const handleSubmit = form.handleSubmit(onSubmit)

    // Open modal
    const openModal = () => setIsOpen(true)

    // Close modal
    const closeModal = () => {
        setIsOpen(false)
        form.reset()
    }

    // Handle open change (for Dialog)
    const handleOpenChange = (open: boolean) => {
        if (open) {
            openModal()
        } else {
            closeModal()
        }
    }

    return {
        form,
        isOpen,
        handleSubmit,
        handleOpenChange,
        openModal,
        closeModal,
        isSubmitting: applyMutation.isPending,
        isLoading: applyMutation.isPending,
    }
}

export type UseApplyReturn = ReturnType<typeof useApply>
