import axios from 'axios';
import API_CONFIG from '../config/apiConfig';

const client = axios.create({
    baseURL: API_CONFIG.REVIEWS_BASE_URL,
});

export const getWatchlist = async () => {
    const response = await client.get('/watchlist');
    return response.data;
};

export const addToWatchlist = async (anime) => {
    // Check if item already exists to avoid duplicates (optional but good practice)
    // catch error in case getWatchlist fails, we proceed to try add
    try {
        const existing = await client.get(`/watchlist?mal_id=${anime.mal_id}`);
        if (existing.data && existing.data.length > 0) {
            throw new Error('Anime already in watchlist');
        }
    } catch (error) {
        if (error.message === 'Anime already in watchlist') throw error;
        // Ignore other errors (like 404 if endpoint doesn't support filter) and try to add
    }

    const payload = {
        mal_id: anime.mal_id,
        title: anime.title_english || anime.title,
        image_url: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
        status: 'Planned', // Default status
        score: anime.score,
        createdAt: new Date().toISOString()
    };
    const response = await client.post('/watchlist', payload);
    return response.data;
};

export const updateWatchlistStatus = async (id, status) => {
    const response = await client.put(`/watchlist/${id}`, { status });
    return response.data;
};

export const removeFromWatchlist = async (id) => {
    const response = await client.delete(`/watchlist/${id}`);
    return response.data;
};
