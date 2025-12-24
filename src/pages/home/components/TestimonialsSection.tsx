/**
 * Testimonials Section - User reviews and testimonials
 * Uses: Card, Avatar, Carousel
 */

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
        },
    },
}

const testimonials = [
    {
        name: 'রাহাত আহমেদ',
        role: 'শিক্ষার্থী, ক্লাস ১০',
        avatar: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
        content: 'eTuitionBd এর মাধ্যমে আমি খুব ভালো একজন গণিত টিউটর পেয়েছি। এখন আমার গণিতে A+ পাওয়া সম্ভব হয়েছে।',
    },
    {
        name: 'ফাতেমা খানম',
        role: 'অভিভাবক',
        avatar: 'https://i.pravatar.cc/150?img=5',
        rating: 5,
        content: 'আমার মেয়ের জন্য ইংরেজি টিউটর খুঁজছিলাম। এই প্ল্যাটফর্ম থেকে অনেক সহজে ভালো টিউটর পেয়েছি।',
    },
    {
        name: 'মাহমুদ হাসান',
        role: 'টিউটর, ঢাকা বিশ্ববিদ্যালয়',
        avatar: 'https://i.pravatar.cc/150?img=3',
        rating: 5,
        content: 'একজন টিউটর হিসেবে এই প্ল্যাটফর্ম আমাকে অনেক শিক্ষার্থী পেতে সাহায্য করেছে। খুবই ইউজার ফ্রেন্ডলি।',
    },
    {
        name: 'সাবরিনা ইসলাম',
        role: 'শিক্ষার্থী, HSC',
        avatar: 'https://i.pravatar.cc/150?img=10',
        rating: 4,
        content: 'ফিজিক্স আর কেমিস্ট্রির জন্য আলাদা আলাদা টিউটর পেয়েছি। তাদের পড়ানোর স্টাইল অসাধারণ।',
    },
    {
        name: 'করিম উদ্দিন',
        role: 'অভিভাবক',
        avatar: 'https://i.pravatar.cc/150?img=7',
        rating: 5,
        content: 'অনলাইন টিউশনের সুবিধা অনেক ভালো। বাসায় বসেই ছেলে পড়াশোনা করতে পারছে।',
    },
]

export function TestimonialsSection() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container">
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">তারা কি বলছেন?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">আমাদের শিক্ষার্থী, অভিভাবক ও টিউটরদের অভিজ্ঞতা</p>
                    </div>

                    <Carousel
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        className="w-full max-w-5xl mx-auto"
                    >
                        <CarouselContent className="-ml-4">
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Card className="h-full p-0">
                                        <CardContent className="p-6">
                                            <Quote className="h-8 w-8 text-primary/20 mb-4" />
                                            <p className="text-muted-foreground mb-6 min-h-20">{testimonial.content}</p>

                                            <div className="flex gap-1 mb-4">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{testimonial.name}</p>
                                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
                </motion.div>
            </div>
        </section>
    )
}

export default TestimonialsSection
