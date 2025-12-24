/**
 * Post New Tuition Page
 * - Clean implementation using field config array
 * - Custom hook for form logic
 */

import { BookOpen, Calendar, DollarSign, Loader2, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePostTuition } from '@/features/tuitions'
import { Field, FieldLabel as Label, FieldError as Error, FieldGroup as Group } from '@/components/ui/field'
import { InputGroup, InputGroupAddon as Addon, InputGroupText as Text, InputGroupInput as Input } from '@/components/ui/input-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Controller } from 'react-hook-form'
import { Textarea } from '@/components'
const TitleField = {
    name: 'title' as const,
    label: 'Title *',
    type: 'text',
    placeholder: 'e.g., Need a Math Tutor for Grade 10',
    required: true,
    icon: BookOpen,
}

const SubjectsField = {
    name: 'subjects' as const,
    label: 'Subject *',
    type: 'select',
    placeholder: 'Select subject',
    icon: BookOpen,
    required: true,
    options: [
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
    ] as const,
}

const ClassField = {
    name: 'class' as const,
    label: 'Class *',
    type: 'select',
    placeholder: 'Select class',
    required: true,
    options: [
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
    ] as const,
}

const LocationField = {
    name: 'location' as const,
    label: 'Location *',
    type: 'select',
    placeholder: 'Select location',
    icon: MapPin,
    required: true,
    options: [
        { value: 'dhaka', label: 'Dhaka' },
        { value: 'chittagong', label: 'Chittagong' },
        { value: 'sylhet', label: 'Sylhet' },
        { value: 'rajshahi', label: 'Rajshahi' },
        { value: 'khulna', label: 'Khulna' },
        { value: 'barisal', label: 'Barisal' },
        { value: 'rangpur', label: 'Rangpur' },
        { value: 'mymensingh', label: 'Mymensingh' },
        { value: 'online', label: 'Online' },
    ] as const,
}

const SalaryField = {
    name: 'salary' as const,
    label: 'Salary (৳/month) *',
    type: 'number',
    placeholder: 'e.g., 8000',
    icon: DollarSign,
    required: true,
}

const ScheduleField = {
    name: 'schedule' as const,
    label: 'Schedule',
    type: 'text',
    placeholder: 'e.g., 3 days/week, Evening (6:00 PM - 8:00 PM)',
    icon: Calendar,
    required: false,
}

const DescriptionField = {
    name: 'description' as const,
    label: 'Description',
    type: 'textarea',
    placeholder: 'Provide additional details about your tuition requirements...',
}

const RequirementsField = {
    name: 'requirements' as const,
    label: 'Requirements for Tutor',
    type: 'textarea',
    placeholder: 'Specify any specific requirements for the tutor...',
}

const PostTuitionPage = () => {
    const { form, handleSubmit, handleCancel, isLoading } = usePostTuition()
    const {
        register,
        control,
        formState: { errors },
    } = form

    return (
        <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Post New Tuition</h1>
                <p className="text-muted-foreground">Fill in the details to find the perfect tutor</p>
            </div>

            {/* Post Tuition Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Tuition Details</CardTitle>
                    <CardDescription>Provide accurate information to attract qualified tutors</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <Field className="gap-2">
                                    <Label htmlFor="title">{TitleField.label}</Label>
                                    <InputGroup>
                                        <Addon>
                                            <BookOpen />
                                        </Addon>
                                        <Input id="title" placeholder={TitleField.placeholder} required={TitleField.required} {...register('title')} />
                                    </InputGroup>
                                    <Error>{errors.title?.message}</Error>
                                </Field>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Quick Info Grid */}
                                <Group className="grid grid-cols-2 gap-4">
                                    <Field className="gap-2">
                                        <Label htmlFor="subjects">{SubjectsField.label}</Label>
                                        <SelectGroup>
                                            <Controller
                                                name="subjects"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={(value) => field.onChange([value])} value={field.value?.[0] as string}>
                                                        <SelectTrigger id="subjects" className="w-full">
                                                            <SelectValue placeholder={SubjectsField.placeholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {SubjectsField.options.map((option) => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </SelectGroup>
                                        <Error>{errors.subjects?.message}</Error>
                                    </Field>
                                    <Field className="gap-2">
                                        <Label htmlFor="class">{ClassField.label}</Label>
                                        <SelectGroup>
                                            <Controller
                                                name="class"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value as string}>
                                                        <SelectTrigger id="class" className="w-full">
                                                            <SelectValue placeholder={ClassField.placeholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ClassField.options.map((option) => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </SelectGroup>
                                        <Error>{errors.class?.message}</Error>
                                    </Field>
                                    <Field className="gap-2">
                                        <Label htmlFor="location">{LocationField.label}</Label>
                                        <SelectGroup>
                                            <Controller
                                                name="location"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value as string}>
                                                        <SelectTrigger id="location" className="w-full">
                                                            <SelectValue placeholder={LocationField.placeholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {LocationField.options.map((option) => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </SelectGroup>
                                        <Error>{errors.location?.message}</Error>
                                    </Field>
                                    <Field className="gap-2">
                                        <Label htmlFor="salary">{SalaryField.label}</Label>
                                        <InputGroup>
                                            <Addon>
                                                <Text>৳</Text>
                                            </Addon>
                                            <Input id="salary" type="number" placeholder={SalaryField.placeholder} {...register('salary', { valueAsNumber: true })} />
                                        </InputGroup>
                                        <Error>{errors.salary?.message}</Error>
                                    </Field>
                                </Group>

                                {/* Schedule */}
                                <Field>
                                    <Label htmlFor="schedule">{ScheduleField.label}</Label>
                                    <InputGroup>
                                        <Addon>
                                            <Calendar />
                                        </Addon>
                                        <Input id="schedule" placeholder={ScheduleField.placeholder} {...register('schedule')} />
                                    </InputGroup>
                                    <Error>{errors.schedule?.message}</Error>
                                </Field>

                                {/* Description */}
                                <Field>
                                    <Label htmlFor="description">{DescriptionField.label}</Label>
                                    <Textarea id="description" placeholder={DescriptionField.placeholder} rows={4} {...register('description')} />
                                    <Error>{errors.description?.message}</Error>
                                </Field>

                                {/* Requirements */}
                                <Field>
                                    <Label htmlFor="requirements">{RequirementsField.label}</Label>
                                    <Textarea id="requirements" placeholder={RequirementsField.placeholder} rows={4} {...register('requirements')} />
                                    <Error>{errors.requirements?.message}</Error>
                                </Field>
                            </CardContent>
                        </Card>
                        {/* Submit Buttons */}
                        <div className="flex gap-4">
                            <Button type="submit" className="flex-1" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    'Post Tuition'
                                )}
                            </Button>
                            <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostTuitionPage
