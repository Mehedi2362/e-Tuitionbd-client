/**
 * ProfileFormField Component
 * Renders form fields based on profile field definitions
 */

import type { Control, FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import type { ProfileFieldConfig } from '../fields'

// Flexible error type
interface FieldErrorLike {
    message?: string
}

interface ProfileFormFieldProps<T extends FieldValues> {
    config: ProfileFieldConfig
    register: UseFormRegister<T>
    control: Control<T>
    error?: FieldErrorLike
    disabled?: boolean
}

export const ProfileFormField = <T extends FieldValues>({ config, register, error, disabled }: ProfileFormFieldProps<T>) => {
    const { name, label, type, placeholder, icon: Icon, description, rows } = config
    const isDisabled = disabled || config.disabled

    // Helper to render error message
    const renderError = () => {
        if (!error?.message) return null
        return <p className="text-sm text-destructive mt-1">{error.message}</p>
    }

    // Helper to render description
    const renderDescription = () => {
        if (!description) return null
        return <p className="text-xs text-muted-foreground">{description}</p>
    }

    // Textarea Field
    if (type === 'textarea') {
        return (
            <div className="space-y-2">
                <Label htmlFor={name}>{label}</Label>
                <Textarea
                    id={name}
                    placeholder={placeholder}
                    rows={rows || 4}
                    disabled={isDisabled}
                    aria-invalid={!!error}
                    className={isDisabled ? 'bg-muted' : ''}
                    {...register(name as Path<T>)}
                />
                {renderDescription()}
                {renderError()}
            </div>
        )
    }

    // Input Fields (text, email, tel, url)
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
                <Input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    className={`${Icon ? 'pl-10' : ''} ${isDisabled ? 'bg-muted' : ''}`}
                    disabled={isDisabled}
                    aria-invalid={!!error}
                    {...register(name as Path<T>)}
                />
            </div>
            {renderDescription()}
            {renderError()}
        </div>
    )
}
