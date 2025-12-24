/**
 * Tuition Card Component - Display individual tuition
 * Uses: Card, Badge, Button
 */

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { BookOpen, Calendar, Clock, DollarSign, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router'
import { getTuitionDetailsRoute } from '../constants'

export interface Tuition {
    _id: string
    title: string
    class: string
    subjects: string[]
    location: string
    salary: {
        min: number
        max: number
    }
    daysPerWeek: number
    preferredTime: string
    status: 'pending' | 'approved' | 'rejected'
    createdAt: string
    student?: {
        name: string
    }
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
} as const

const statusLabels = {
    pending: 'অপেক্ষমান',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
}

export function TuitionCard({ tuition, index = 0 }: TuitionCardProps) {
    const navigate = useNavigate()

    return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg line-clamp-2">{tuition.title}</CardTitle>
                        <Badge variant={statusColors[tuition.status]}>{statusLabels[tuition.status]}</Badge>
                    </div>
                    <CardDescription>ক্লাস {tuition.class}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 flex-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{tuition.subjects.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{tuition.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="mr-2 h-4 w-4 shrink-0" />
                        <span>
                            ৳{tuition.salary.min.toLocaleString()} - ৳{tuition.salary.max.toLocaleString()} /মাস
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{tuition.daysPerWeek} দিন/সপ্তাহ</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{tuition.preferredTime}</span>
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
