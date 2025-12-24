import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Mail, Phone } from 'lucide-react'
import type { TuitionDetails } from './types'

interface StudentInfoCardProps {
    student: TuitionDetails['student']
}

// Get initials for avatar fallback
const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const StudentInfoCard = ({ student }: StudentInfoCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Posted By</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={student.photo} alt={student.name} />
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">Student</p>
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{student.email}</span>
                    </div>
                    {student.phone && (
                        <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{student.phone}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default StudentInfoCard
