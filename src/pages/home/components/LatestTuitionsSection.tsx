import { Button } from '@/components/ui/button'
import { TuitionCard } from '@/features/tuitions/components'
import { useFeaturedTuitions } from '@/features/tuitions/hooks/useTuitionQueries'
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

export function LatestTuitionsSection() {
    const navigate = useNavigate()
    const { data: tuitions = [], isLoading } = useFeaturedTuitions(6)

    return (
        <section className="py-16 md:py-24 bg-muted">
            <div className="container mx-auto px-4">
                <motion.div variants={titleVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Tuition Posts</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover the most recent tuition opportunities posted by students looking for qualified tutors</p>
                </motion.div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin">
                            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
                        </div>
                    </div>
                ) : tuitions.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No tuition posts available at the moment</p>
                    </div>
                ) : (
                    <>
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            {tuitions.map((tuition, index) => (
                                <motion.div key={tuition._id} onClick={() => navigate(`/tuitions/${tuition._id}`)} className="cursor-pointer">
                                    <TuitionCard tuition={tuition} index={index} />
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex justify-center">
                            <Button size="lg" onClick={() => navigate('/tuitions')} className="gap-2">
                                View All Tuitions <ArrowRight className="h-5 w-5" />
                            </Button>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    )
}
