/**
 * Profile Settings Page (Shared for all dashboard roles)
 * Uses useProfileSettings hook and profileFormFields config
 */

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Camera, Loader2, Save } from 'lucide-react'

import { ProfileFormField, profileFormFields, tutorProfileFields, useProfileSettings, type ProfileFormData } from '@/features/dashboard'

const ProfileSettingsPage = () => {
    const { form, handleSubmit, isLoading, hasChanges, user, isTutor } = useProfileSettings()

    const {
        register,
        control,
        formState: { errors },
    } = form

    // Handle photo upload
    const handlePhotoChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
        // #TODO: Upload photo to cloud storage and get URL
        // const file = e.target.files?.[0];
        // if (file) {
        //   const photoUrl = await uploadPhoto(file);
        //   form.setValue('photoUrl', photoUrl);
        // }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground">Manage your account information</p>
            </div>

            {/* Profile Photo Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Photo</CardTitle>
                    <CardDescription>Update your profile picture</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={(user as { photoUrl?: string; avatar?: string })?.photoUrl || (user as { avatar?: string })?.avatar || ''} />
                            <AvatarFallback className="text-2xl">
                                {user?.name
                                    ?.split(' ')
                                    .map((n) => n[0])
                                    .join('') || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full cursor-pointer hover:bg-primary/90">
                            <Camera className="h-4 w-4" />
                            <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                        </label>
                    </div>
                    <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                            <Camera className="mr-2 h-4 w-4" />
                            Change Photo
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Profile Information Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Profile Fields */}
                        {profileFormFields.map((field) => (
                            <ProfileFormField<ProfileFormData>
                                key={field.name}
                                config={field}
                                register={register}
                                control={control}
                                error={errors[field.name as keyof typeof errors]}
                                disabled={isLoading}
                            />
                        ))}

                        {/* Tutor-specific Fields */}
                        {isTutor && (
                            <>
                                <Separator />
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Tutor Information</h3>
                                    <div className="space-y-6">
                                        {tutorProfileFields.map((field) => (
                                            <ProfileFormField<ProfileFormData>
                                                key={field.name}
                                                config={field}
                                                register={register}
                                                control={control}
                                                error={errors[field.name as keyof typeof errors]}
                                                disabled={isLoading}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        <Separator />

                        <Button type="submit" className="w-full" disabled={isLoading || !hasChanges}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions related to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileSettingsPage
