/**
 * Error Page (404)
 * - Friendly UI design
 * - Button to go back to home
 * - Consistent styling with the platform
 */

import { HOME } from '@/pages/home/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, easeInOut } from 'framer-motion'
import { AlertTriangle, Home, ArrowLeft, Search } from 'lucide-react'
import { Link, useNavigate, useRouteError, isRouteErrorResponse } from 'react-router'

const ErrorPage = () => {
    const error = useRouteError()
    const navigate = useNavigate()

    // Determine error type
    const is404 = isRouteErrorResponse(error) && error.status === 404
    const errorStatus = isRouteErrorResponse(error) ? error.status : 500
    const errorMessage = isRouteErrorResponse(error) ? error.statusText : error instanceof Error ? error.message : 'An unexpected error occurred'

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }

    const floatVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: easeInOut,
            },
        },
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-muted/30 to-background px-4 py-12">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <motion.div className="relative z-10 w-full max-w-lg" variants={containerVariants} initial="hidden" animate="visible">
                <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-2">
                        {/* Animated Icon */}
                        <motion.div className="mx-auto mb-4" variants={floatVariants} animate="animate">
                            <div className="w-24 h-24 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                                <AlertTriangle className="h-12 w-12 text-destructive" />
                            </div>
                        </motion.div>

                        {/* Error Status */}
                        <motion.div variants={itemVariants}>
                            <span className="text-7xl md:text-8xl font-bold bg-linear-to-r from-destructive to-destructive/50 bg-clip-text text-transparent">{errorStatus}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.div variants={itemVariants}>
                            <CardTitle className="text-2xl md:text-3xl mt-4">{is404 ? 'পেজটি পাওয়া যায়নি' : 'কিছু ভুল হয়েছে'}</CardTitle>
                        </motion.div>

                        {/* Description */}
                        <motion.div variants={itemVariants}>
                            <CardDescription className="text-base mt-2">{is404 ? 'আপনি যে পেজটি খুঁজছেন সেটি অস্তিত্বহীন বা সরানো হয়েছে।' : errorMessage}</CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="space-y-4 pt-4">
                        {/* Action Buttons */}
                        <motion.div className="flex flex-col sm:flex-row gap-3 justify-center" variants={itemVariants}>
                            <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                আগের পেজে ফিরুন
                            </Button>
                            <Button asChild className="gap-2">
                                <Link to={HOME}>
                                    <Home className="h-4 w-4" />
                                    হোম পেজে যান
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Search suggestion for 404 */}
                        {is404 && (
                            <motion.div className="pt-4 border-t" variants={itemVariants}>
                                <p className="text-sm text-muted-foreground text-center mb-3">অথবা আপনি খুঁজতে পারেন:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/tuitions">
                                            <Search className="h-3 w-3 mr-1" />
                                            টিউশন খুঁজুন
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/tutors">
                                            <Search className="h-3 w-3 mr-1" />
                                            টিউটর খুঁজুন
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Footer text */}
                        <motion.p className="text-xs text-muted-foreground text-center pt-4" variants={itemVariants}>
                            সমস্যা থাকলে আমাদের সাথে{' '}
                            <Link to="/contact" className="text-primary hover:underline">
                                যোগাযোগ করুন
                            </Link>
                        </motion.p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default ErrorPage
