import axios from 'axios';
import API_CONFIG from '../config/apiConfig';

const reviewsClient = axios.create({
    baseURL: API_CONFIG.REVIEWS_BASE_URL,
});

export const getReviews = async (animeId) => {
    // MockAPI doesn't strictly support filtering by param in the URL path style without setup,
    // but usually supports ?animeId=123.
    const response = await reviewsClient.get(`/reviews?animeId=${animeId}`);
    return response.data;
};

export const createReview = async (reviewData) => {
    const response = await reviewsClient.post('/reviews', reviewData);
    return response.data;
};

export const updateReview = async (id, reviewData) => {
    const response = await reviewsClient.put(`/reviews/${id}`, reviewData);
    return response.data;
};

export const deleteReview = async (id) => {
    const response = await reviewsClient.delete(`/reviews/${id}`);
    return response.data;
};
