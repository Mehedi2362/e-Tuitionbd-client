import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, GraduationCap } from 'lucide-react'
import type { TutorProfile } from './types'

interface ExperienceTabProps {
    tutor: TutorProfile
}

const ExperienceTab = ({ tutor }: ExperienceTabProps) => {
    return (
        <div className="space-y-6">
            {/* Education */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {tutor.education.length > 0 ? (
                        tutor.education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-primary pl-4">
                                <p className="font-medium">{edu.degree}</p>
                                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                <p className="text-xs text-muted-foreground">{edu.year}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No education information provided.</p>
                    )}
                </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Certifications
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {tutor.certifications.length > 0 ? (
                        tutor.certifications.map((cert, index) => (
                            <div key={index} className="border-l-2 border-primary pl-4">
                                <p className="font-medium">{cert.name}</p>
                                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                                <p className="text-xs text-muted-foreground">{cert.year}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No certifications added.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ExperienceTab
