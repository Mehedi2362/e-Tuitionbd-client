import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, GraduationCap, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router'
import { getTutorProfileRoute } from '../constants'

// Tutor interface
export interface Tutor {
    _id: string
    name: string
    email: string
    photo?: string
    photoUrl?: string
    education?: string
    qualifications?: string
    subjects: string[]
    location?: string
    experience?: number // years
    rating?: number
    reviewCount?: number
    isVerified?: boolean
    bio?: string
    hourlyRate?: number
}

interface TutorCardProps {
    tutor: Tutor
}

const TutorCard = ({ tutor }: TutorCardProps) => {
    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    // Format experience text
    const getExperienceText = (years: number) => {
        if (years < 1) return 'Less than 1 year'
        if (years === 1) return '1 year exp'
        return `${years}+ years exp`
    }

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={tutor.photo} alt={tutor.name} />
                    <AvatarFallback className="text-2xl">{getInitials(tutor.name)}</AvatarFallback>
                </Avatar>
                <CardTitle>{tutor.name}</CardTitle>
                <CardDescription>
                    <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{(tutor.rating || 0).toFixed(1)}</span>
                        <span className="text-muted-foreground">({tutor.reviewCount || 0} reviews)</span>
                    </div>
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
                {(tutor.education || tutor.qualifications) && (
                    <div className="flex items-center text-sm text-muted-foreground">
                        <GraduationCap className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{tutor.education || tutor.qualifications}</span>
                    </div>
                )}

                {tutor.subjects && tutor.subjects.length > 0 && (
                    <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{tutor.subjects.join(', ')}</span>
                    </div>
                )}

                {tutor.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 shrink-0" />
                        <span>{tutor.location}</span>
                    </div>
                )}

                <div className="flex flex-wrap gap-1 mt-2">
                    {tutor.experience && (
                        <Badge variant="outline" className="text-xs">
                            {getExperienceText(tutor.experience)}
                        </Badge>
                    )}
                    {tutor.isVerified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Verified
                        </Badge>
                    )}
                </div>

                {tutor.hourlyRate && <div className="text-sm font-medium text-primary">৳{tutor.hourlyRate}/hour</div>}
            </CardContent>

            <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                    <Link to={getTutorProfileRoute(tutor._id)}>View Profile</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default TutorCard
