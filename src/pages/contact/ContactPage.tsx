// #TODO: Contact Page
// #TODO: Contact form
// #TODO: Contact information display
// #TODO: Map integration (Optional)

import { ABOUT } from '@/pages/about/constants'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router'
import ContactFormSection from './components/ContactFormSection'
import ContactInfoSection from './components/ContactInfoSection'
import MapSection from './components/MapSection'

const ContactPage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <div className="bg-linear-to-br from-primary/10 via-background to-secondary/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Have questions or need assistance? We're here to help! Reach out to us through any of the following channels.</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <ContactInfoSection />
                    </div>

                    {/* Contact Form & Map */}
                    <div className="lg:col-span-2 space-y-6">
                        <ContactFormSection />
                        <MapSection />
                    </div>
                </div>

                <Separator className="my-12" />

                {/* FAQ Section */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mb-8">Can't find what you're looking for? Check our FAQ section or learn more about us.</p>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" asChild>
                            <Link to={ABOUT}>About Us</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
