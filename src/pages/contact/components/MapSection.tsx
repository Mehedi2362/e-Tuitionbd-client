import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

const MapSection = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Find Us on Map</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Map Placeholder - Can be replaced with Google Maps iframe or library */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                        <p className="font-medium">Our Location</p>
                        <p className="text-sm">123 Education Street, Gulshan, Dhaka</p>
                    </div>
                </div>

                {/* Uncomment below to use Google Maps iframe */}
                {/* 
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!..."
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                ></iframe>
                */}
            </CardContent>
        </Card>
    )
}

export default MapSection
