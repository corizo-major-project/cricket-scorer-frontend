import axios from 'axios';
import { useAuth } from '../token/AuthContext';

export const API = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include credentials in cross-origin requests if needed
});

API.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('accessToken');

        // Add idToken to Authorization header if available
        config.headers = {
            "Authorization": `Bearer ${accessToken}`,
        };

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => response, // Simply return the response
    (error) => {
        if (error.response && error.response.status === 401) {
            // Call the logout handler if available
            const { logout } = useAuth();
            logout();
        }
        return Promise.reject(error);
    }
);

export default API;



