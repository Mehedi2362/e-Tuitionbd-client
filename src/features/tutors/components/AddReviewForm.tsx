import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Star, MessageSquarePlus } from 'lucide-react'
import { useCreateReview } from '@/features/tutors/queries'
import type { CreateReviewInput } from '@/shared/reviews'

interface AddReviewFormProps {
    tutorId: string
    isAuthenticated: boolean
}

const AddReviewForm = ({ tutorId, isAuthenticated }: AddReviewFormProps) => {
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [comment, setComment] = useState('')

    const { mutate: createReview, isPending } = useCreateReview()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (rating === 0) {
            return
        }

        if (comment.trim().length < 5) {
            return
        }

        if (comment.length > 500) {
            return
        }

        const reviewData: CreateReviewInput = {
            tutorId,
            rating,
            comment: comment.trim(),
        }

        createReview(reviewData, {
            onSuccess: () => {
                setRating(0)
                setComment('')
                setOpen(false)
            },
        })
    }

    if (!isAuthenticated) {
        return (
            <Card className="border-dashed">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquarePlus className="h-5 w-5" />
                        Share Your Experience
                    </CardTitle>
                    <CardDescription>Sign in to add a review for this tutor</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full gap-2">
                    <MessageSquarePlus className="h-4 w-4" />
                    Add Your Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
                    <DialogDescription>Share your experience with this tutor</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Rating */}
                    <div className="space-y-2">
                        <Label>Rating</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="transition-transform hover:scale-110">
                                    <Star className={`h-8 w-8 ${star <= (hoverRating || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                </button>
                            ))}
                        </div>
                        {rating > 0 && <p className="text-sm text-muted-foreground">Rating: {rating} out of 5</p>}
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <Label htmlFor="comment">Your Review</Label>
                        <Textarea id="comment" placeholder="Share your experience with this tutor..." value={comment} onChange={(e) => setComment(e.target.value)} className="min-h-24 resize-none" />
                        <p className="text-xs text-muted-foreground">{comment.length}/500 characters</p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddReviewForm
