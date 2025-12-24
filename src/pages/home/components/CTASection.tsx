/**
 * CTA Section - Call to action for registration
 * Uses: Button, Card
 */

import { SIGNUP } from '@/features/auth/constants'
// import { TUITIONS } from '@/features/tuitions/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Users } from 'lucide-react'
import { useNavigate } from 'react-router'

export const TUITIONS = '/tuitions'


const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
        },
    },
}

export function CTASection() {
    const navigate = useNavigate()

    return (
        <section className="py-20 bg-primary">
            <div className="container">
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Card className="bg-transparent border-none shadow-none">
                        <CardContent className="text-center py-12">
                            <GraduationCap className="h-16 w-16 mx-auto mb-6 text-primary-foreground" />
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">আজই শুরু করুন আপনার শেখার যাত্রা</h2>
                            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">হাজার হাজার শিক্ষার্থী ইতিমধ্যে eTuitionBd এর মাধ্যমে তাদের পছন্দের টিউটর খুঁজে পেয়েছে। আপনিও যোগ দিন!</p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" variant="secondary" onClick={() => navigate(TUITIONS)} className="gap-2">
                                    টিউশন খুঁজুন
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button size="lg" variant="outline" onClick={() => navigate(SIGNUP)} className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                                    <Users className="mr-2 h-4 w-4" />
                                    টিউটর হিসেবে যোগ দিন
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default CTASection
