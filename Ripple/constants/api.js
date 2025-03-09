const BASE_URL = 'https://ripple-z6px.onrender.com';

export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: `${BASE_URL}/api/auth/login/`,
    SIGNUP: `${BASE_URL}/api/auth/register/`,
    
    // User profile endpoints
    UPDATE_PROFILE: `${BASE_URL}/api/users/profile/update/`,
    GET_PROFILE: `${BASE_URL}/api/users/profile/`,
    
    // Location endpoints
    UPDATE_LOCATION: `${BASE_URL}/api/users/location/update/`,
    
    // Preferences endpoints
    UPDATE_PREFERENCES: `${BASE_URL}/api/users/preferences/update/`,
    
    // Skills endpoints
    GET_SKILLS: `${BASE_URL}/api/skills/`,
    UPDATE_USER_SKILLS: `${BASE_URL}/api/users/skills/update/`,
    
    // Causes endpoints
    GET_CAUSES: `${BASE_URL}/api/causes/`,
    UPDATE_USER_CAUSES: `${BASE_URL}/api/users/causes/update/`,
};

export const getAuthHeader = (token) => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
});

export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error
        return error.response.data.detail || 'An error occurred';
    } else if (error.request) {
        // Request made but no response
        return 'Unable to connect to server';
    } else {
        // Error in request setup
        return 'Error setting up request';
    }
}; 