/**
 * Payment Cancel Page
 * - Displays when user cancels payment
 */

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Home, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function PaymentCancelPage() {
    const navigate = useNavigate()

    return (
        <div className="container mx-auto max-w-lg py-16 px-4">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                        <XCircle className="h-10 w-10 text-yellow-600" />
                    </div>
                    <CardTitle className="mt-4">পেমেন্ট বাতিল</CardTitle>
                    <CardDescription>আপনি পেমেন্ট বাতিল করেছেন। চিন্তার কিছু নেই!</CardDescription>
                </CardHeader>

                <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                        আপনি যেকোনো সময় আবার পেমেন্ট করতে পারবেন। আপনার অ্যাপ্লিকেশন এখনও সক্রিয় আছে।
                    </p>
                </CardContent>

                <CardFooter className="justify-center gap-4">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        আগের পেজে
                    </Button>
                    <Button onClick={() => navigate('/')}>
                        <Home className="mr-2 h-4 w-4" />
                        হোমে যান
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
