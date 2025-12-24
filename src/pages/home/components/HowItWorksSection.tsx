/**
 * How It Works Section - Step by step guide
 * Uses: Card
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { CheckCircle, ClipboardList, Search, UserCheck } from 'lucide-react'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
        },
    },
}

const steps = [
    {
        step: '০১',
        icon: Search,
        title: 'টিউশন খুঁজুন',
        description: 'বিষয়, ক্লাস, বা এলাকা দিয়ে সার্চ করুন এবং আপনার পছন্দের টিউশন খুঁজে নিন।',
    },
    {
        step: '০২',
        icon: UserCheck,
        title: 'টিউটর বাছাই করুন',
        description: 'টিউটরদের প্রোফাইল, রেটিং ও রিভিউ দেখে সেরা টিউটর বেছে নিন।',
    },
    {
        step: '০৩',
        icon: ClipboardList,
        title: 'অ্যাপ্লাই করুন',
        description: 'টিউশনে অ্যাপ্লাই করুন এবং টিউটরের সাথে যোগাযোগ করুন।',
    },
    {
        step: '০৪',
        icon: CheckCircle,
        title: 'শেখা শুরু করুন',
        description: 'পেমেন্ট সম্পন্ন করুন এবং আপনার শেখার যাত্রা শুরু করুন।',
    },
]

export function HowItWorksSection() {
    return (
        <section className="py-20">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">কিভাবে কাজ করে?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">মাত্র ৪টি সহজ ধাপে আপনার পছন্দের টিউটর খুঁজে নিন</p>
                </div>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {steps.map((item, index) => (
                        <motion.div key={index} variants={itemVariants} className="relative">
                            {/* Connector line */}
                            {index < steps.length - 1 && <div className="hidden lg:block absolute top-16 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-0.5 bg-border" />}

                            <Card className="text-center relative h-full">
                                <CardHeader>
                                    <div className="relative mx-auto">
                                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">{item.step}</div>
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                                            <item.icon className="h-4 w-4 text-primary" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg mt-4">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{item.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default HowItWorksSection
