/**
 * Features Section - Key features of eTuitionBd
 * Uses: Card, Badge
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { BookOpen, Clock, MapPin, Shield, Star, Users } from 'lucide-react'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
}

const features = [
    {
        icon: Users,
        title: 'যোগ্য টিউটর',
        description: 'সব টিউটর ভেরিফাইড এবং অভিজ্ঞ। তাদের যোগ্যতা ও রেটিং দেখে সিদ্ধান্ত নিন।',
    },
    {
        icon: BookOpen,
        title: 'সব বিষয়',
        description: 'প্রাথমিক থেকে উচ্চ মাধ্যমিক, সব বিষয়ের টিউশন পাওয়া যায়।',
    },
    {
        icon: MapPin,
        title: 'আপনার এলাকায়',
        description: 'আপনার কাছাকাছি টিউটর খুঁজুন। হোম টিউশন বা অনলাইন - দুটোই সম্ভব।',
    },
    {
        icon: Shield,
        title: 'নিরাপদ পেমেন্ট',
        description: 'সিকিউর পেমেন্ট সিস্টেম। টিউশন শেষে সন্তুষ্ট হলে পে করুন।',
    },
    {
        icon: Clock,
        title: 'ফ্লেক্সিবল সময়',
        description: 'আপনার সুবিধামত সময় সিলেক্ট করুন। সকাল, বিকাল বা রাত।',
    },
    {
        icon: Star,
        title: 'রিভিউ সিস্টেম',
        description: 'শিক্ষার্থীদের রিভিউ দেখে সেরা টিউটর বেছে নিন।',
    },
]

export function FeaturesSection() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">কেন eTuitionBd?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">আমাদের প্ল্যাটফর্মের বিশেষ সুবিধাগুলো যা আপনার টিউশন খোঁজাকে সহজ করবে</p>
                </div>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturesSection
