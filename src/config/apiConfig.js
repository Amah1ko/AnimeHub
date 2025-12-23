const API_CONFIG = {
  JIKAN_BASE_URL: import.meta.env.VITE_JIKAN_BASE_URL || 'https://api.jikan.moe/v4',
  // User should replace this with their own MockAPI endpoint or set VITE_REVIEWS_BASE_URL in .env
  REVIEWS_BASE_URL: import.meta.env.VITE_REVIEWS_BASE_URL || 'https://694abf3326e8707720667747.mockapi.io',
};

export default API_CONFIG;
