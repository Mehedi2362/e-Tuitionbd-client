import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Mail, Phone } from 'lucide-react'

interface StudentInfoCardProps {
    studentName?: string
    studentEmail?: string
    studentPhone?: string
    studentPhoto?: string
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

const StudentInfoCard = ({ studentName, studentEmail, studentPhone, studentPhoto }: StudentInfoCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Posted By</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={studentPhoto} alt={studentName || 'Student'} />
                        <AvatarFallback>{getInitials(studentName || 'Student')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{studentName || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">Student</p>
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    {studentEmail && (
                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{studentEmail}</span>
                        </div>
                    )}
                    {studentPhone && (
                        <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{studentPhone}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default StudentInfoCard
