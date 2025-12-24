import { AnimatedCounter } from '@/components/ui/animated-text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Mail, MapPin, MessageSquare, Phone, Star } from 'lucide-react'
import type { TutorProfile } from './types'

interface ProfileSidebarProps {
    tutor: Partial<TutorProfile>
    onSendMessage?: () => void
}

// Get initials for avatar fallback
const getInitials = (name?: string) => {
    if (!name) return 'TU'
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

// Get experience badge text
const getExperienceText = (years?: number) => {
    if (!years || years < 1) return 'New Tutor'
    if (years === 1) return '1 Year Experience'
    return `${years}+ Years Experience`
}

const ProfileSidebar = ({ tutor, onSendMessage }: ProfileSidebarProps) => {
    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="pt-6 text-center">
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                        <AvatarImage src={tutor.photo} alt={tutor.name} />
                        <AvatarFallback className="text-3xl">{getInitials(tutor.name)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold mb-1">{tutor.name || 'Tutor'}</h2>
                    {tutor.title && <p className="text-muted-foreground mb-4">{tutor.title}</p>}

                    {/* Rating */}
                    {tutor.rating !== undefined && tutor.reviewCount !== undefined && (
                        <div className="flex items-center justify-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`h-5 w-5 ${star <= Math.round(tutor.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="ml-2 font-medium">{(tutor.rating || 0).toFixed(1)}</span>
                            <span className="text-muted-foreground">({tutor.reviewCount} reviews)</span>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {tutor.isVerified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                                Verified
                            </Badge>
                        )}
                        {tutor.experience !== undefined && <Badge variant="outline">{getExperienceText(tutor.experience)}</Badge>}
                    </div>

                    <Separator className="my-4" />

                    {/* Contact Info */}
                    <div className="space-y-3 text-left">
                        {tutor.location && (
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{tutor.location}</span>
                            </div>
                        )}
                        {tutor.email && (
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="truncate">{tutor.email}</span>
                            </div>
                        )}
                        {tutor.phone && (
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{tutor.phone}</span>
                            </div>
                        )}
                    </div>

                    <Separator className="my-4" />

                    {/* Quick Stats */}
                    {(tutor.studentsCount !== undefined || tutor.experience !== undefined || tutor.classesCount !== undefined) && (
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {tutor.studentsCount !== undefined && (
                                <div>
                                    <p className="text-2xl font-bold">
                                        <AnimatedCounter value={tutor.studentsCount} suffix="+" duration={1.5} />
                                    </p>
                                    <p className="text-xs text-muted-foreground">Students</p>
                                </div>
                            )}
                            {tutor.experience !== undefined && (
                                <div>
                                    <p className="text-2xl font-bold">
                                        <AnimatedCounter value={tutor.experience} suffix="+" duration={1.5} />
                                    </p>
                                    <p className="text-xs text-muted-foreground">Years</p>
                                </div>
                            )}
                            {tutor.classesCount !== undefined && (
                                <div>
                                    <p className="text-2xl font-bold">
                                        <AnimatedCounter value={tutor.classesCount} suffix="+" duration={1.5} />
                                    </p>
                                    <p className="text-xs text-muted-foreground">Classes</p>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Contact Button */}
            {onSendMessage && (
                <Button className="w-full" size="lg" onClick={onSendMessage}>
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Send Message
                </Button>
            )}
        </div>
    )
}

export default ProfileSidebar
