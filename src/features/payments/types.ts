// ==================== Query Params ====================
export interface PaymentQueryParams {
    page?: number
    limit?: number
    status?: 'pending' | 'completed' | 'failed' | 'refunded'
}