/**
 * Hero Section - Landing page hero with search and CTA
 * Uses: Button, InputGroup, Badge
 */

import { SIGNUP } from '@/features/auth/constants'
import { AnimatedCounter } from '@/components/ui/animated-text'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Search, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export const TUITIONS = '/tuitions'

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
}

export function HeroSection() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`${TUITIONS}?search=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

            <div className="container relative z-10 py-16 lg:py-24">
                <motion.div className="max-w-4xl mx-auto text-center" variants={containerVariants} initial="hidden" animate="visible">
                    {/* Badge */}
                    <motion.div variants={itemVariants}>
                        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            বাংলাদেশের সেরা টিউশন প্ল্যাটফর্ম
                        </Badge>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        আপনার সন্তানের জন্য
                        <span className="text-primary block mt-2">সেরা টিউটর খুঁজুন</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        eTuitionBd এ যোগ্য এবং অভিজ্ঞ টিউটরদের সাথে যুক্ত হন। আপনার পছন্দের বিষয়, লোকেশন এবং বাজেট অনুযায়ী টিউশন খুঁজুন।
                    </motion.p>

                    {/* Search Form */}
                    <motion.form variants={itemVariants} onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                        <InputGroup className="h-14 bg-background shadow-lg">
                            <InputGroupAddon>
                                <InputGroupText>
                                    <Search className="h-5 w-5" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput placeholder="বিষয়, ক্লাস, বা এলাকা দিয়ে খুঁজুন..." className="text-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <InputGroupAddon align="inline-end">
                                <Button type="submit" size="lg" className="h-10 px-6">
                                    খুঁজুন
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </motion.form>

                    {/* CTA Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button size="lg" onClick={() => navigate(TUITIONS)} className="gap-2">
                            টিউশন ব্রাউজ করুন
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => navigate(SIGNUP)}>
                            <Users className="mr-2 h-4 w-4" />
                            টিউটর হিসেবে যোগ দিন
                        </Button>
                    </motion.div>

                    {/* Stats Preview */}
                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 text-center">
                        <div>
                            <p className="text-3xl font-bold text-primary">
                                <AnimatedCounter value={5000} suffix="+" />
                            </p>
                            <p className="text-sm text-muted-foreground">সক্রিয় টিউশন</p>
                        </div>
                        <div className="w-px bg-border" />
                        <div>
                            <p className="text-3xl font-bold text-primary">
                                <AnimatedCounter value={2000} suffix="+" />
                            </p>
                            <p className="text-sm text-muted-foreground">যোগ্য টিউটর</p>
                        </div>
                        <div className="w-px bg-border" />
                        <div>
                            <p className="text-3xl font-bold text-primary">
                                <AnimatedCounter value={10000} suffix="+" />
                            </p>
                            <p className="text-sm text-muted-foreground">সন্তুষ্ট শিক্ষার্থী</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
