/**
 * #TODO: Footer Component
 * - Website branding and description
 * - Quick links to important pages
 * - Contact information
 * - Social media links
 * - Newsletter subscription form
 * - Copyright notice
 */

import { ABOUT } from '@/pages/about/constants'
import { SIGNIN, SIGNUP } from '@/features/auth/constants'
import { CONTACT } from '@/pages/contact/constants'
import { HOME } from '@/pages/home/constants'
import { TUITIONS } from '@/features/tuitions/constants'
import { TUTORS } from '@/features/tutors/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Facebook, GraduationCap, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { label: 'Home', href: HOME },
        { label: 'Browse Tuitions', href: TUITIONS },
        { label: 'Find Tutors', href: TUTORS },
        { label: 'About Us', href: ABOUT },
        { label: 'Contact', href: CONTACT },
    ]

    const accountLinks = [
        { label: 'Login', href: SIGNIN },
        { label: 'Register', href: SIGNUP },
        { label: 'Student Dashboard', href: '/dashboard/student' },
        { label: 'Tutor Dashboard', href: '/dashboard/tutor' },
    ]

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com/etuitionbd', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com/etuitionbd', label: 'Twitter' },
        { icon: Instagram, href: 'https://instagram.com/etuitionbd', label: 'Instagram' },
        { icon: Linkedin, href: 'https://linkedin.com/company/etuitionbd', label: 'LinkedIn' },
        { icon: Youtube, href: 'https://youtube.com/@etuitionbd', label: 'YouTube' },
    ]

    return (
        <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                    {/* #TODO: Brand Section */}
                    <div className="space-y-4">
                        <Link to={HOME} className="flex items-center gap-2">
                            <GraduationCap className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">eTuitionBd</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">Bangladesh's leading online tutoring platform connecting students with qualified tutors. Find the perfect tutor or discover tutoring opportunities today.</p>
                        {/* Social Links */}
                        <div className="flex gap-2">
                            {socialLinks.map((social) => (
                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors" aria-label={social.label}>
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* #TODO: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* #TODO: Account Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Account</h3>
                        <ul className="space-y-2">
                            {accountLinks.map((link) => (
                                <li key={link.href}>
                                    <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* #TODO: Contact & Newsletter */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>+880 1XXX-XXXXXX</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>support@etuitionbd.com</span>
                            </li>
                        </ul>

                        {/* Newsletter */}
                        <div className="space-y-2 pt-2">
                            <h4 className="font-medium text-sm">Subscribe to Newsletter</h4>
                            <div className="flex gap-2">
                                <Input placeholder="Enter your email" type="email" className="h-9 text-sm" />
                                <Button size="sm" className="h-9 px-3">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* #TODO: Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} eTuitionBd. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link to="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/faq" className="hover:text-primary transition-colors">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
