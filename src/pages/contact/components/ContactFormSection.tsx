import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Send, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

// Contact form validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormSectionProps {
    onSubmit?: (data: ContactFormData) => void
    isSubmitting?: boolean
}

const ContactFormSection = ({ onSubmit, isSubmitting = false }: ContactFormSectionProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    })

    const handleFormSubmit = (data: ContactFormData) => {
        if (onSubmit) {
            onSubmit(data)
        } else {
            // Default behavior - show toast
            toast.success('Message sent successfully! We will get back to you soon.')
            reset()
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Field */}
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Full Name *</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <User className="h-4 w-4" />
                                    </InputGroupAddon>
                                    <InputGroupInput placeholder="Enter your full name" {...register('name')} />
                                </InputGroup>
                                {errors.name && <FieldError>{errors.name.message}</FieldError>}
                            </Field>
                        </FieldGroup>

                        {/* Email Field */}
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Email Address *</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <Mail className="h-4 w-4" />
                                    </InputGroupAddon>
                                    <InputGroupInput type="email" placeholder="Enter your email" {...register('email')} />
                                </InputGroup>
                                {errors.email && <FieldError>{errors.email.message}</FieldError>}
                            </Field>
                        </FieldGroup>
                    </div>

                    {/* Subject Field */}
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Subject *</FieldLabel>
                            <Input placeholder="What is this about?" {...register('subject')} />
                            {errors.subject && <FieldError>{errors.subject.message}</FieldError>}
                        </Field>
                    </FieldGroup>

                    {/* Message Field */}
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Message *</FieldLabel>
                            <Textarea placeholder="Write your message here..." rows={6} {...register('message')} />
                            {errors.message && <FieldError>{errors.message.message}</FieldError>}
                        </Field>
                    </FieldGroup>

                    <Button type="submit" className="w-full md:w-auto" size="lg" disabled={isSubmitting}>
                        <Send className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default ContactFormSection
