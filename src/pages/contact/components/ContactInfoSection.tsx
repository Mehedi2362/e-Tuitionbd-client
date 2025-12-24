import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'

const ContactInfoSection = () => {
    return (
        <div className="space-y-6">
            {/* Office Information Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        Our Office
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium">Address</p>
                                <p className="text-sm text-muted-foreground">
                                    123 Education Street, Gulshan
                                    <br />
                                    Dhaka 1212, Bangladesh
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium">Phone</p>
                                <p className="text-sm text-muted-foreground">
                                    +880 1700-123456
                                    <br />
                                    +880 1800-654321
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">
                                    info@etuitionbd.com
                                    <br />
                                    support@etuitionbd.com
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium">Office Hours</p>
                                <p className="text-sm text-muted-foreground">
                                    Saturday - Thursday: 9AM - 6PM
                                    <br />
                                    Friday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Support Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Quick Support
                    </CardTitle>
                    <CardDescription>Get help faster through our support channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Live Chat
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default ContactInfoSection
