import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

const tmdbApi = axios.create({
    baseURL: API_BASE_URL,
    params: {
        // Vite exposes variables prefixed with REACT_APP_ via import.meta.env
        api_key: import.meta.env.REACT_APP_TMDB_API_KEY,
        language: 'en-US',
    },
});

/**
 * Fetches details for a specific collection by ID.
 * @param {string|number} collectionId
 * @returns {Promise<Object>} The collection details including parts (movies).
 */
export const getCollectionDetails = async (collectionId) => {
    try {
        const response = await tmdbApi.get(`/collection/${collectionId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error Response:', error.response.data);
            throw new Error(error.response.data.status_message || 'Failed to fetch collection details');
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API No Response:', error.request);
            throw new Error('No response from TMDB server. Please check your internet connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('API Request Error:', error.message);
            throw new Error('Error setting up the request.');
        }
    }
};
