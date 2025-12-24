// ==================== User Service ====================
import { privateAxios, publicAxios } from "@/config/axios";

export interface UserQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
}

export interface TutorQueryParams extends UserQueryParams {
    subject?: string;
    minRating?: number;
}

export interface UpdateProfileInput {
    name?: string;
    phone?: string;
    photoUrl?: string;
    bio?: string;
    qualifications?: string;
    experience?: string;
    subjects?: string[];
}

export class UserService {
    static async getProfile() {
        const response = await privateAxios.get('/profile/me');
        return response.data.data;
    }

    static async updateProfile(data: UpdateProfileInput) {
        const response = await privateAxios.patch('/profile/update', data);
        return response.data.data;
    }

    static async getUsers(params: UserQueryParams = {}) {
        const response = await publicAxios.get('/users', { params });
        return response.data.data;
    }

    static async getAll(params: UserQueryParams = {}) {
        return this.getUsers(params);
    }

    static async getById(id: string) {
        const response = await publicAxios.get(`/users/${id}`);
        return response.data.data;
    }

    static async updateRole(id: string, role: string) {
        const response = await privateAxios.patch(`/users/${id}/role`, { role });
        return response.data.data;
    }
}

export class TutorService {
    static async getTutors(params: TutorQueryParams = {}) {
        const response = await publicAxios.get('/tutors', { params });
        return response.data;
    }

    static async getAll(params: TutorQueryParams = {}) {
        return this.getTutors(params);
    }

    static async getTutorById(id: string) {
        const response = await publicAxios.get(`/tutors/${id}`);
        return response.data.data;
    }

    static async getById(id: string) {
        return this.getTutorById(id);
    }

    static async getFeatured(limit?: number) {
        const response = await publicAxios.get('/tutors/featured', { params: { limit } });
        return response.data.data;
    }

    static async searchTutors(params: TutorQueryParams) {
        const response = await publicAxios.get('/tutors/search', { params });
        return response.data.data;
    }
}