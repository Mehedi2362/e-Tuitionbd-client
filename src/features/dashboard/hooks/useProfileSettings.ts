/**
 * useProfileSettings Hook
 * Custom hook for profile settings form logic
 * Handles form state, validation, and submission
 */

import { useAuth } from '@/features/auth'
import { UserService } from '@/services'
import type { UpdateProfileInput, User } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

// Extended user type with all possible fields
type ExtendedUser = {
    name: string
    email: string
    phone?: string
    photoUrl?: string
    avatar?: string
    bio?: string
    qualifications?: string
    experience?: string
    role?: string
}

// ==================== Validation Schema ====================
const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^(\+?880|0)?1[3-9]\d{8}$/, 'Invalid Bangladeshi phone number').optional().or(z.literal('')),
    photoUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
    bio: z.string().max(500, 'Bio must be at most 500 characters').optional().or(z.literal('')),
    qualifications: z.string().max(1000, 'Qualifications must be at most 1000 characters').optional().or(z.literal('')),
    experience: z.string().max(1000, 'Experience must be at most 1000 characters').optional().or(z.literal('')),
})

export type ProfileFormData = z.infer<typeof profileSchema>

export interface UseProfileSettingsOptions {
    onSuccess?: () => void
}

// ==================== Query Key ====================
const profileKeys = {
    current: ['user', 'profile'] as const,
}

// ==================== Hook ====================
export const useProfileSettings = (options: UseProfileSettingsOptions = {}) => {
    const { onSuccess } = options
    const { user: authUser, refetch: refetchAuth } = useAuth()
    const queryClient = useQueryClient()

    // Fetch fresh profile data from server
    const { data: serverProfile } = useQuery<User>({
        queryKey: profileKeys.current,
        queryFn: () => UserService.getProfile(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    // Use server profile if available, otherwise use auth user
    const user = serverProfile || authUser
    const extUser = user as ExtendedUser | null

    // React Hook Form
    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            photoUrl: '',
            bio: '',
            qualifications: '',
            experience: '',
        },
    })

    // Populate form with user data
    useEffect(() => {
        if (extUser) {
            form.reset({
                name: extUser.name || '',
                email: extUser.email || '',
                phone: extUser.phone || '',
                photoUrl: extUser.photoUrl || extUser.avatar || '',
                bio: extUser.bio || '',
                qualifications: extUser.qualifications || '',
                experience: extUser.experience || '',
            })
        }
    }, [extUser, form])

    // Update profile mutation
    const updateMutation = useMutation({
        mutationFn: (data: UpdateProfileInput) => UserService.updateProfile(data),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.current })
            await refetchAuth()
            toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!')
            onSuccess?.()
        },
        onError: (error: Error) => {
            toast.error(error.message || 'প্রোফাইল আপডেট ব্যর্থ!')
        },
    })

    // Handle form submission
    const onSubmit = async (data: ProfileFormData) => {
        // Only send changed fields (excluding email which can't be changed)
        const updateData: UpdateProfileInput = {}
        const currentPhoto = extUser?.photoUrl || extUser?.avatar

        if (data.name !== extUser?.name) updateData.name = data.name
        if (data.phone !== extUser?.phone) updateData.phone = data.phone || undefined
        if (data.photoUrl !== currentPhoto) updateData.photoUrl = data.photoUrl || undefined
        if (data.bio) updateData.bio = data.bio
        if (data.qualifications) updateData.qualifications = data.qualifications
        if (data.experience) updateData.experience = data.experience

        // Only submit if there are changes
        if (Object.keys(updateData).length === 0) {
            toast.info('কোনো পরিবর্তন নেই')
            return
        }

        await updateMutation.mutateAsync(updateData)
    }

    // Handle form submission wrapper
    const handleSubmit = form.handleSubmit(onSubmit)

    // Check if form is dirty (has changes)
    const hasChanges = form.formState.isDirty

    return {
        form,
        handleSubmit,
        isLoading: updateMutation.isPending,
        hasChanges,
        user,
        isTutor: user?.role === 'tutor',
    }
}

export type UseProfileSettingsReturn = ReturnType<typeof useProfileSettings>
