import { Button } from '@/components/ui/button'
import { TutorCard, type Tutor } from '@/features/tutors/components'
import { useFeaturedTutors } from '@/features/tutors/queries'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function LatestTutorsSection() {
    const navigate = useNavigate()
    const { data: tutors = [], isLoading } = useFeaturedTutors(6)

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div variants={titleVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Qualified Tutors</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Meet our most experienced and highly-rated tutors ready to help you achieve your academic goals</p>
                </motion.div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin">
                            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
                        </div>
                    </div>
                ) : tutors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-600 text-lg">No tutors available at the moment</p>
                    </div>
                ) : (
                    <>
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            {tutors.map((tutor: Tutor) => (
                                <motion.div key={tutor._id} onClick={() => navigate(`/tutors/${tutor._id}`)} className="cursor-pointer">
                                    <TutorCard tutor={tutor} />
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex justify-center">
                            <Button size="lg" onClick={() => navigate('/tutors')} className="gap-2">
                                View All Tutors <ArrowRight className="h-5 w-5" />
                            </Button>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    )
}
