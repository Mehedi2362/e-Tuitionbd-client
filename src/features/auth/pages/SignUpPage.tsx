/**
 * SignUpPage Component
 * Handles user registration with email and Google OAuth
 * Supports both Student and Tutor role selection
 * Uses Zod validation and React Hook Form for form management
 */

import { FieldLabel as Label, FieldSet as Set, FieldError as Error } from '@/components/ui/field'
import { InputGroupAddon as Addon, InputGroupInput as Input, InputGroup } from '@/components/ui/input-group'
import { Select, SelectTrigger as Trigger, SelectValue as Value, SelectContent as Content, SelectItem as Item, SelectGroup } from '@/components/ui/select'
import { Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import React, { useState, type ReactNode } from 'react'
import { SIGNIN } from '../constants'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpSchema, type SignUpCreds } from '@/shared/auth'
import { GoogleIcon } from '@/assets/icons'
import { useAuth } from '../context'
import authService from '../service'
import { toast } from 'sonner'

// ==================== Field Configurations ====================
// Define form field configurations for sign-up form including validation rules and UI properties
const name = {
    type: 'text',
    name: 'name',
    label: 'Full Name *',
    placeholder: 'Enter your full name',
    icon: User,
    autoComplete: 'name',
}

const email = {
    type: 'email',
    name: 'email',
    label: 'Email *',
    placeholder: 'Enter your email',
    icon: Mail,
    autoComplete: 'email',
}

const phone = {
    type: 'tel',
    name: 'phone',
    label: 'Phone *',
    placeholder: 'Enter your phone number',
    icon: Phone,
}

const role = {
    type: 'select',
    name: 'role',
    label: 'Register as *',
    placeholder: 'Select your role',
    options: [
        { value: 'student', label: 'Student' },
        { value: 'tutor', label: 'Tutor' },
    ],
}

const password = {
    name: 'password',
    label: 'Password *',
    type: 'password',
    placeholder: 'Create a password',
    icon: Lock,
    autoComplete: 'new-password',
}

const confirmPassword = {
    name: 'confirmPassword',
    label: 'Confirm *',
    type: 'password',
    placeholder: 'Confirm your password',
    icon: Lock,
    autoComplete: 'new-password',
}

// ==================== Component ====================
const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false })
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpCreds>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            role: undefined,
            password: '',
            confirmPassword: '',
        },
    })
    const { signUp, loading: authLoading } = useAuth({
        signUpFn: async (type, creds) => {
            if (type === 'email') return (await authService.signUpWithEmail(creds as SignUpCreds)) || null
            if (type === 'google') return (await authService.signInWithGoogle()) || null
            return null
        },
        onSuccess() {
            toast.success('Successfully signed up!')
        },
        onError() {
            toast.error('Failed to sign up.')
        },
    })
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create an Account</CardTitle>
                    <CardDescription>Join eTuitionBd as a Student or Tutor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Button variant="outline" className="w-full" onClick={() => signUp?.('google')} disabled={authLoading}>
                        <GoogleIcon /> Sign Up with Google
                    </Button>
                    <div className="relative">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">or register with email</span>
                    </div>

                    <form onSubmit={handleSubmit((data) => signUp?.('email', data))}>
                        <Set className="grid grid-cols-7">
                            {[name, email, phone].map((field) => (
                                <React.Fragment key={field.name}>
                                    <Label className='col-span-2' htmlFor={field.name}>{field.label}</Label>
                                    <InputGroup className="col-span-5">
                                        <Addon align="inline-start">
                                            <field.icon />
                                        </Addon>
                                        <Input {...register(field.name as 'name' | 'email' | 'phone')} id={field.name} placeholder={field.placeholder} aria-invalid={!!errors[field.name as keyof SignUpCreds]} />
                                    </InputGroup>
                                    <ErrorMessage>{errors[field.name as keyof SignUpCreds]?.message}</ErrorMessage>
                                </React.Fragment>
                            ))}
                            <Label className='col-span-2' htmlFor="role">{role.label}</Label>
                            <SelectGroup className="col-span-5">
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <Trigger id="role" className="w-full" aria-invalid={!!errors.role}>
                                                <Value placeholder={role.placeholder} />
                                            </Trigger>
                                            <Content>
                                                {role.options.map((option) => (
                                                    <Item key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Item>
                                                ))}
                                            </Content>
                                        </Select>
                                    )}
                                />
                            </SelectGroup>
                            <ErrorMessage>{errors.role?.message}</ErrorMessage>

                            {[password, confirmPassword].map((field) => {
                                // Explicitly type the field name for type safety
                                const fieldName = field.name as 'password' | 'confirmPassword'
                                return (
                                    <React.Fragment key={field.name}>
                                        <Label className='col-span-2' htmlFor={field.name}>{field.label}</Label>
                                        <InputGroup className="col-span-5">
                                            <Addon align="inline-start">
                                                <field.icon />
                                            </Addon>
                                            <Addon align="inline-end">
                                                <Button type="button" variant="ghost" size="icon-sm" onClick={() => setShowPassword({ ...showPassword, [fieldName]: !showPassword[fieldName] })}>
                                                    {showPassword[fieldName] ? <EyeOff /> : <Eye />}
                                                </Button>
                                            </Addon>
                                            <Input type={showPassword[fieldName] ? 'text' : field.type} {...register(fieldName)} id={field.name} placeholder={field.placeholder} aria-invalid={!!errors[fieldName as keyof SignUpCreds]} />
                                        </InputGroup>
                                        <ErrorMessage>{errors[fieldName as keyof SignUpCreds]?.message}</ErrorMessage>
                                    </React.Fragment>
                                )
                            })}

                            <Button type="submit" className="col-span-full">
                                Register
                            </Button>
                        </Set>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link to={SIGNIN} className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
function ErrorMessage({ children }: { children: ReactNode }) {
    if (children)
        return (
            <>
                <div className="col-span-2 -mt-5"></div>
                <Error className="col-span-5 -mt-5">{children}</Error>
            </>
        )
}

export default RegisterPage
