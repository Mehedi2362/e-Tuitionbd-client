import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Target, Users, Zap } from 'lucide-react'

const MissionSection = () => {
    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To revolutionize education in Bangladesh by connecting students with qualified tutors, making quality education accessible to everyone.',
        },
        {
            icon: Users,
            title: 'Our Vision',
            description: 'To become the leading tutoring platform in Bangladesh, empowering students to achieve academic excellence through personalized learning.',
        },
        {
            icon: Zap,
            title: 'Our Values',
            description: 'We believe in quality education, transparency, trust, and creating meaningful connections between students and tutors.',
        },
    ]

    const features = ['Verified and experienced tutors', 'Easy-to-use platform', 'Secure payment system', 'Transparent pricing', '24/7 customer support', 'Satisfaction guaranteed']

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">About eTuitionBd</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">We are dedicated to bridging the gap between students seeking quality education and qualified tutors who can help them achieve their academic goals.</p>
                </div>

                {/* Mission, Vision, Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {values.map((item, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm leading-relaxed">{item.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Why Choose Us */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Why Choose eTuitionBd?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default MissionSection
