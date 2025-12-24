import { AnimatedCounter } from '@/components/ui/animated-text'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Star, Users } from 'lucide-react'

const StatsSection = () => {
    const stats = [
        {
            icon: Users,
            value: 10000,
            suffix: '+',
            label: 'Active Students',
            description: 'Students learning with our tutors',
        },
        {
            icon: GraduationCap,
            value: 5000,
            suffix: '+',
            label: 'Verified Tutors',
            description: 'Qualified and experienced tutors',
        },
        {
            icon: BookOpen,
            value: 50000,
            suffix: '+',
            label: 'Classes Completed',
            description: 'Successful tutoring sessions',
        },
        {
            icon: Star,
            value: 4.8,
            suffix: '/5',
            decimals: 1,
            label: 'Average Rating',
            description: 'Student satisfaction rate',
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
            },
        },
    }

    return (
        <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">We're proud of the difference we've made in students' lives across Bangladesh.</p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
                    {stats.map((stat, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300 gap-2">
                                <CardHeader className="pb-2">
                                    <motion.div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                                        <stat.icon className="h-6 w-6 text-primary" />
                                    </motion.div>
                                    <CardTitle className="text-3xl font-bold text-primary">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} formatValue={stat.decimals ? (val) => val.toFixed(stat.decimals) : undefined} />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold">{stat.label}</p>
                                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default StatsSection
