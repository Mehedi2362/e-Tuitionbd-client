import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Linkedin, Mail } from 'lucide-react'

interface TeamMember {
    name: string
    role: string
    bio: string
    photo?: string
    linkedin?: string
    email?: string
}

const TeamSection = () => {
    const team: TeamMember[] = [
        {
            name: 'Mohammad Rahman',
            role: 'Founder & CEO',
            bio: 'Former educator with 15+ years of experience in the education sector. Passionate about making quality education accessible.',
            linkedin: '#',
            email: 'rahman@etuitionbd.com',
        },
        {
            name: 'Fatima Khatun',
            role: 'Chief Operating Officer',
            bio: 'MBA from IBA, Dhaka University. Expert in operations and scaling EdTech platforms.',
            linkedin: '#',
            email: 'fatima@etuitionbd.com',
        },
        {
            name: 'Ahmed Hassan',
            role: 'Head of Technology',
            bio: 'Full-stack developer with expertise in building scalable web applications. Previously worked at top tech companies.',
            linkedin: '#',
            email: 'ahmed@etuitionbd.com',
        },
        {
            name: 'Anika Hossain',
            role: 'Head of Tutor Relations',
            bio: 'Responsible for tutor recruitment, verification, and ensuring quality teaching standards.',
            linkedin: '#',
            email: 'anika@etuitionbd.com',
        },
    ]

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Our dedicated team works tirelessly to connect students with the best tutors and ensure a seamless learning experience.</p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <Card key={index} className="text-center gap-3">
                            <CardHeader>
                                <Avatar className="h-24 w-24 mx-auto mb-4">
                                    <AvatarImage src={member.photo} alt={member.name} />
                                    <AvatarFallback className="text-xl">{getInitials(member.name)}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-lg">{member.name}</CardTitle>
                                <CardDescription className="font-medium text-primary">{member.role}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                                <div className="flex justify-center gap-3">
                                    {member.linkedin && (
                                        <a href={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors" aria-label={`${member.name}'s LinkedIn`}>
                                            <Linkedin className="h-5 w-5" />
                                        </a>
                                    )}
                                    {member.email && (
                                        <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-primary transition-colors" aria-label={`Email ${member.name}`}>
                                            <Mail className="h-5 w-5" />
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TeamSection
