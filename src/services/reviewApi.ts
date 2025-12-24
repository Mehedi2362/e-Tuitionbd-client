// ==================== Review API Service ====================
import { privateAxios, publicAxios } from '@/config/axios';
import { REVIEW_ROUTES } from '@/shared/reviews';
import type { CreateReviewInput, TutorReviewResponse, UpdateReviewInput } from '@/shared/reviews';

interface ReviewsResponse {
    reviews: TutorReviewResponse[];
    total: number;
    skip: number;
    limit: number;
}

interface RatingStatsResponse {
    avgRating: number;
    reviewCount: number;
}

export const reviewApi = {
    // Create a new review
    async createReview(data: CreateReviewInput) {
        const response = await privateAxios.post(REVIEW_ROUTES.CREATE, data);
        return response.data;
    },

    // Get reviews for a tutor (public)
    async getReviewsByTutor(tutorId: string, skip = 0, limit = 10) {
        const response = await publicAxios.get<ReviewsResponse>(
            REVIEW_ROUTES.GET_BY_TUTOR(tutorId),
            {
                params: { skip, limit },
            }
        );
        return response.data;
    },

    // Get student's review for a specific tutor
    async getStudentReview(tutorId: string, studentId: string) {
        const response = await privateAxios.get<{ review: TutorReviewResponse }>(
            REVIEW_ROUTES.GET_STUDENT_REVIEW(tutorId, studentId)
        );
        return response.data.review;
    },

    // Update a review
    async updateReview(reviewId: string, data: UpdateReviewInput) {
        const response = await privateAxios.put(REVIEW_ROUTES.UPDATE(reviewId), data);
        return response.data;
    },

    // Delete a review
    async deleteReview(reviewId: string) {
        const response = await privateAxios.delete(REVIEW_ROUTES.DELETE(reviewId));
        return response.data;
    },

    // Get rating statistics for a tutor (public)
    async getTutorRatingStats(tutorId: string) {
        const response = await publicAxios.get<RatingStatsResponse>(`/tutors/${tutorId}/rating-stats`);
        return response.data;
    },
};
