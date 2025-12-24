/**
 * TuitionFormField Component
 * Renders form fields based on field definitions
 */

import type { Control, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { OPTIONS_MAP, type TuitionFieldConfig } from '../fields'

// Flexible error type
interface FieldErrorLike {
    message?: string
}

interface TuitionFormFieldProps<T extends FieldValues> {
    config: TuitionFieldConfig
    register: UseFormRegister<T>
    control: Control<T>
    error?: FieldErrorLike
    disabled?: boolean
}

export const TuitionFormField = <T extends FieldValues>({ config, register, control, error, disabled }: TuitionFormFieldProps<T>) => {
    const { name, label, type, placeholder, icon: Icon, optionsKey, rows } = config

    // Resolve options from optionsKey
    const options = optionsKey ? OPTIONS_MAP[optionsKey] : undefined

    // Helper to render error message
    const renderError = () => {
        if (!error?.message) return null
        return <p className="text-sm text-destructive mt-1">{error.message}</p>
    }

    // Text Input Field
    if (type === 'text') {
        return (
            <div className="space-y-2">
                <Label htmlFor={name}>{label}</Label>
                <div className="relative">
                    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
                    <Input id={name} type="text" placeholder={placeholder} className={Icon ? 'pl-10' : ''} disabled={disabled} aria-invalid={!!error} {...register(name as Path<T>)} />
                </div>
                {renderError()}
            </div>
        )
    }

    // Number Input Field
    if (type === 'number') {
        return (
            <div className="space-y-2">
                <Label htmlFor={name}>{label}</Label>
                <div className="relative">
                    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
                    <Input id={name} type="number" placeholder={placeholder} className={Icon ? 'pl-10' : ''} disabled={disabled} aria-invalid={!!error} {...register(name as Path<T>, { valueAsNumber: true })} />
                </div>
                {renderError()}
            </div>
        )
    }

    // Select Field
    if (type === 'select' && options) {
        return (
            <div className="space-y-2">
                <Label htmlFor={name}>{label}</Label>
                <Controller
                    name={name as Path<T>}
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value as string} disabled={disabled}>
                            <SelectTrigger aria-invalid={!!error}>
                                {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {renderError()}
            </div>
        )
    }

    // Textarea Field
    if (type === 'textarea') {
        return (
            <div className="space-y-2">
                <Label htmlFor={name}>{label}</Label>
                <Textarea id={name} placeholder={placeholder} rows={rows || 4} disabled={disabled} aria-invalid={!!error} {...register(name as Path<T>)} />
                {renderError()}
            </div>
        )
    }

    return null
}
