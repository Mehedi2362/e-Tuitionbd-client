/**
 * SignInPage Component
 * Handles user login with email and password or Google OAuth
 * Provides error handling and loading states
 * Uses Zod validation and React Hook Form for form management
 */

import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { CardContent as Body, Card, CardDescription, CardFooter as Footer, CardHeader as Header, CardTitle as Title } from '@/components/ui/card'
import { FieldDescription as Description, FieldError as Error, Field, FieldGroup, FieldLabel as Label } from '@/components/ui/field'
import { InputGroupAddon as Addon, InputGroupInput as Input, InputGroup, InputGroupButton } from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'

import { GoogleIcon } from '@/assets/icons'
import { useAuth } from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SIGNUP } from '@/features/auth/constants'
import { SignInSchema, type SignInCreds } from '@/shared/auth'
import authService from '@/features/auth/service'

// ==================== Sign In Page Component ====================
// Authentication form component with email/password and OAuth support

const LoginPage = () => {
    const navigate = useNavigate()

    const {
        signIn,
        loading: authLoading,
        error: authError,
    } = useAuth({
        signInFn: async (type, creds) => {
            if (type === 'email') return (await authService.signInWithEmail(creds as { email: string; password: string })) || null
            if (type === 'google') return (await authService.signInWithGoogle()) || null
            return null
        },
        onSuccess: (user) => {
            toast.success('Successfully signed in!')
            if (user?.role) navigate(`/${user.role}/dashboard`, { replace: true })
        },
        onError: (err) => {
            toast.error((err as Error).message)
            console.error(err)
        },
    })

    // Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInCreds>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    // Form submit handler
    const onSubmit = async (data: SignInCreds) => {
        await signIn?.('email', data)
    }

    const [showPassword, setShowPassword] = useState(false)

    // Combined loading state
    const isLoading = authLoading || isSubmitting
    const [isGoogleLoading] = useState(false)
    const error = authError

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
            <Card className="w-full max-w-md">
                {/* ==================== Header ==================== */}
                <Header className="text-center space-y-2">
                    <Title className="text-2xl font-bold">স্বাগতম</Title>
                    <CardDescription>আপনার eTuitionBd অ্যাকাউন্টে সাইন ইন করুন</CardDescription>
                </Header>

                <Body className="space-y-6">
                    {/* ==================== Error Message ==================== */}
                    {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">{error}</div>}

                    {/* ==================== Google Login Button ==================== */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => signIn?.('google')}
                        disabled={authLoading}
                        // TODO: onClick={handleGoogleLogin}
                    >
                        {isGoogleLoading ? <Loader2 className="size-5 animate-spin" /> : <GoogleIcon />}
                        <span>Google দিয়ে লগইন</span>
                    </Button>

                    {/* ==================== Separator ==================== */}
                    <div className="relative">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">অথবা ইমেইল দিয়ে</span>
                    </div>

                    {/* ==================== Login Form ==================== */}
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            {/* ==================== Email Field ==================== */}
                            <Field>
                                <Label htmlFor="email">ইমেইল</Label>
                                <InputGroup>
                                    <Addon align="inline-start">
                                        <Mail className="size-4 text-muted-foreground" />
                                    </Addon>
                                    <Input
                                        {...register('email')}
                                        id="email"
                                        type="email"
                                        placeholder="আপনার ইমেইল লিখুন"
                                        autoComplete="email"
                                        disabled={isLoading}
                                        // TODO: {...register('email')}
                                    />
                                </InputGroup>
                                <Error>{errors.email?.message}</Error>
                                <Description>আপনার রেজিস্টার্ড ইমেইল ব্যবহার করুন</Description>
                            </Field>

                            {/* ==================== Password Field ==================== */}
                            <Field>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">পাসওয়ার্ড</Label>
                                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                                        পাসওয়ার্ড ভুলে গেছেন?
                                    </Link>
                                </div>
                                <InputGroup>
                                    <Addon align="inline-start">
                                        <Lock className="size-4 text-muted-foreground" />
                                    </Addon>
                                    <Input {...register('password')} id="password" type={showPassword ? 'text' : 'password'} placeholder="আপনার পাসওয়ার্ড লিখুন" autoComplete="current-password" disabled={isLoading} />
                                    <Addon align="inline-end">
                                        <InputGroupButton type="button" variant="ghost" size="icon-xs" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}>
                                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                        </InputGroupButton>
                                    </Addon>
                                </InputGroup>
                                <Error>{errors.password?.message}</Error>
                            </Field>

                            {/* ==================== Submit Button ==================== */}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        লগইন হচ্ছে...
                                    </>
                                ) : (
                                    'সাইন ইন'
                                )}
                            </Button>
                        </FieldGroup>
                    </form>
                </Body>

                {/* ==================== Footer ==================== */}
                <Footer className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        অ্যাকাউন্ট নেই?{' '}
                        <Link to={SIGNUP} className="text-primary hover:underline font-medium">
                            সাইন আপ করুন
                        </Link>
                    </p>
                </Footer>
            </Card>
        </div>
    )
}

export default LoginPage
