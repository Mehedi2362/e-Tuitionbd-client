import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calendar, Users } from 'lucide-react'
import type { TutorProfile } from './types'

interface AboutTabProps {
    tutor: Partial<TutorProfile>
}

const AboutTab = ({ tutor }: AboutTabProps) => {
    return (
        <div className="space-y-6">
            {/* About Me */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        About Me
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{tutor.bio || 'No bio provided'}</p>
                </CardContent>
            </Card>

            {/* Subjects */}
            {tutor.subjects && tutor.subjects.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Subjects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {tutor.subjects.map((subject, index) => (
                                <Badge key={index}>{subject}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Availability */}
            {tutor.availability && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Availability
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {tutor.availability.weekdays && (
                                <div>
                                    <p className="font-medium">Weekdays</p>
                                    <p className="text-sm text-muted-foreground">{tutor.availability.weekdays}</p>
                                </div>
                            )}
                            {tutor.availability.weekends && (
                                <div>
                                    <p className="font-medium">Weekends</p>
                                    <p className="text-sm text-muted-foreground">{tutor.availability.weekends}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default AboutTab
