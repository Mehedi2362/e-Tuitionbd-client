/**
 * ApplyModal Component
 * Modal for tutors to apply for tuition positions
 * Uses applicationFields config and TuitionFormField for rendering
 */

import { User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { applicationFields } from '../fields'
import { useApply } from '../hooks'
import type { ApplicationFormData } from '../validators'
import { TuitionFormField } from './TuitionFormField'

interface ApplyModalProps {
    tuitionId: string
    tutorName: string
    tutorEmail: string
    onSuccess?: () => void
}

const ApplyModal = ({ tuitionId, tutorName, tutorEmail, onSuccess }: ApplyModalProps) => {
    const { form, isOpen, handleSubmit, handleOpenChange, isLoading } = useApply({
        tuitionId,
        onSuccess,
    })

    const {
        register,
        control,
        formState: { errors },
    } = form

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="w-full" size="lg">
                    <User className="mr-2 h-5 w-5" />
                    Apply for this Tuition
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Apply for Tuition</DialogTitle>
                    <DialogDescription>Fill in your details to apply for this tuition position.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        {/* Read-only fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Name</FieldLabel>
                                    <Input value={tutorName} disabled />
                                </Field>
                            </FieldGroup>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input value={tutorEmail} disabled />
                                </Field>
                            </FieldGroup>
                        </div>

                        {/* Dynamic fields from applicationFields config */}
                        {applicationFields.map((field) => (
                            <TuitionFormField<ApplicationFormData>
                                key={field.name}
                                config={field}
                                register={register}
                                control={control}
                                error={errors[field.name as keyof typeof errors]}
                                disabled={isLoading}
                            />
                        ))}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit Application'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ApplyModal
