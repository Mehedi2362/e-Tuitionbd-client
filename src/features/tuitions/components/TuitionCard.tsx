/**
 * Tuition Card Component - Display individual tuition
 * Uses: Card, Badge, Button
 */

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { BookOpen, Calendar, DollarSign, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router'
import { getTuitionDetailsRoute } from '../constants'

export interface Tuition {
    _id: string
    studentName?: string
    subject: string
    class: string
    location: string
    budget: number
    schedule: string
    description?: string
    requirements?: string
    status: 'pending' | 'approved' | 'rejected' | 'completed'
    applicationsCount?: number
    createdAt: string
}

interface TuitionCardProps {
    tuition: Tuition
    index?: number
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
}

const statusColors = {
    pending: 'secondary',
    approved: 'default',
    rejected: 'destructive',
    completed: 'default',
} as const

const statusLabels = {
    pending: 'অপেক্ষমান',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    completed: 'সম্পন্ন',
}

export function TuitionCard({ tuition, index = 0 }: TuitionCardProps) {
    const navigate = useNavigate()

    return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg line-clamp-2">{tuition.subject}</CardTitle>
                        <Badge variant={statusColors[tuition.status]}>{statusLabels[tuition.status]}</Badge>
                    </div>
                    <CardDescription>ক্লাস {tuition.class}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 flex-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{tuition.subject}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{tuition.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="mr-2 h-4 w-4 shrink-0" />
                        <span>৳{tuition.budget?.toLocaleString() ?? 0} /মাস</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{tuition.schedule}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => navigate(getTuitionDetailsRoute(tuition._id))}>
                        বিস্তারিত দেখুন
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default TuitionCard
