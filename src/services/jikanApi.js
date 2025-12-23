import axios from 'axios';
import API_CONFIG from '../config/apiConfig';

const jikanClient = axios.create({
    baseURL: API_CONFIG.JIKAN_BASE_URL,
});

// Add a delay to avoid rate limiting (Jikan has strict rate limits)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

jikanClient.interceptors.request.use(async (config) => {
    await delay(350); // Simple rate limit throttling
    return config;
});

export const getTopAnime = async (page = 1) => {
    const response = await jikanClient.get(`/top/anime?page=${page}`);
    return response.data;
};

export const getSeasonalAnime = async (page = 1) => {
    const response = await jikanClient.get(`/seasons/now?page=${page}`);
    return response.data;
};

export const searchAnime = async (query, page = 1) => {
    const response = await jikanClient.get(`/anime?q=${query}&page=${page}`);
    return response.data;
};

export const getAnimeDetails = async (id) => {
    const response = await jikanClient.get(`/anime/${id}`);
    return response.data;
};
