/**
 * Animated Text Components
 * Text animation effects with Framer Motion
 */

'use client'

import { cn } from '@/lib/utils'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { forwardRef, useEffect, useRef } from 'react'

// =============================================
// Animated Counter Component
// =============================================
interface AnimatedCounterProps {
    value: number
    duration?: number
    className?: string
    formatValue?: (value: number) => string
    prefix?: string
    suffix?: string
}

export const AnimatedCounter = ({ value, duration = 2, className, formatValue = (val) => Math.round(val).toLocaleString(), prefix = '', suffix = '' }: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        duration: duration * 1000,
        bounce: 0,
    })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${formatValue(latest)}${suffix}`
            }
        })
        return unsubscribe
    }, [springValue, formatValue, prefix, suffix])

    return <span ref={ref} className={cn(className)} />
}

// =============================================
// TypeWriter Effect Component
// =============================================
interface TypeWriterProps {
    text: string
    className?: string
    speed?: number
    delay?: number
    cursor?: boolean
    cursorChar?: string
    onComplete?: () => void
}

export const TypeWriter = forwardRef<HTMLSpanElement, TypeWriterProps>(({ text, className, speed = 50, delay = 0, cursor = true, cursorChar = '|', onComplete }, _ref) => {
    const containerRef = useRef<HTMLSpanElement>(null)
    const isInView = useInView(containerRef, { once: true })

    useEffect(() => {
        if (!isInView || !containerRef.current) return

        const textNode = containerRef.current
        let currentIndex = 0
        textNode.textContent = ''

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    textNode.textContent = text.slice(0, currentIndex + 1)
                    currentIndex++
                } else {
                    clearInterval(interval)
                    onComplete?.()
                }
            }, speed)

            return () => clearInterval(interval)
        }, delay)

        return () => clearTimeout(timeout)
    }, [isInView, text, speed, delay, onComplete])

    return (
        <span className={cn('inline-block', className)}>
            <span ref={containerRef} />
            {cursor && (
                <motion.span className="inline-block" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                    {cursorChar}
                </motion.span>
            )}
        </span>
    )
})
TypeWriter.displayName = 'TypeWriter'

// =============================================
// Letter Animation Component
// =============================================
interface LetterAnimationProps {
    text: string
    className?: string
    charClassName?: string
    delay?: number
    staggerDelay?: number
}

export const LetterAnimation = ({ text, className, charClassName, delay = 0, staggerDelay = 0.03 }: LetterAnimationProps) => {
    const chars = text.split('')

    return (
        <motion.span className={cn('inline-flex', className)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    className={cn('inline-block', charClassName)}
                    variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: delay + i * staggerDelay,
                                duration: 0.3,
                                ease: 'easeOut' as const,
                            },
                        },
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    )
}

// =============================================
// Gradient Text Animation
// =============================================
interface GradientTextProps {
    text: string
    className?: string
    gradient?: string
    animated?: boolean
}

export const GradientText = ({ text, className, gradient = 'from-primary via-secondary to-accent', animated = true }: GradientTextProps) => {
    return (
        <motion.span
            className={cn('bg-clip-text text-transparent bg-linear-to-r bg-size-[200%_auto]', gradient, className)}
            animate={
                animated
                    ? {
                          backgroundPosition: ['0%', '100%', '0%'],
                      }
                    : undefined
            }
            transition={
                animated
                    ? {
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear' as const,
                      }
                    : undefined
            }
        >
            {text}
        </motion.span>
    )
}

// =============================================
// Highlight Text Animation
// =============================================
interface HighlightTextProps {
    children: React.ReactNode
    className?: string
    highlightColor?: string
    delay?: number
}

export const HighlightText = ({ children, className, highlightColor = 'bg-primary/20', delay = 0.5 }: HighlightTextProps) => {
    return (
        <span className={cn('relative inline-block', className)}>
            <motion.span
                className={cn('absolute inset-0 -skew-x-3 rounded', highlightColor)}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                    delay,
                    duration: 0.5,
                    ease: 'easeOut' as const,
                }}
                style={{ transformOrigin: 'left' }}
            />
            <span className="relative">{children}</span>
        </span>
    )
}

// =============================================
// Word Animation Component
// =============================================
interface WordAnimationProps {
    text: string
    className?: string
    wordClassName?: string
    delay?: number
    staggerDelay?: number
}

export const WordAnimation = ({ text, className, wordClassName, delay = 0, staggerDelay = 0.1 }: WordAnimationProps) => {
    const words = text.split(' ')

    return (
        <motion.span className={cn('inline-flex flex-wrap', className)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className={cn('inline-block mr-[0.25em]', wordClassName)}
                    variants={{
                        hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                        visible: {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            transition: {
                                delay: delay + i * staggerDelay,
                                duration: 0.4,
                                ease: 'easeOut' as const,
                            },
                        },
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    )
}
