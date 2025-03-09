export const API_BASE_URL = 'https://ripple-fmd3.onrender.com/api';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login/`,
    SIGNUP: `${API_BASE_URL}/auth/register/`,
    USER_ACTIONS: `${API_BASE_URL}/actions/user-actions/list/`,
    FEED: `${API_BASE_URL}/actions/feed/`,
    ORGANIZATIONS: `${API_BASE_URL}/organizations/`,
    TRENDING_ACTIONS: `${API_BASE_URL}/actions/trending/`,
}; 