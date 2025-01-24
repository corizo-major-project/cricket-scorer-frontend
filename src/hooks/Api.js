import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
        const accessToken = sessionStorage.getItem('accessToken');

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
    function (response) {
        return response;
    }
    ,
    function (error) {
        if (error.response && error.response.status === 401) {
            // Clear the session and redirect
            const navigate = useNavigate();
            const { logout } = useAuth();

            logout(); // Call the context's logout function
            navigate('/'); // Redirect to the home page
        }

        return Promise.reject(error);
    }
);

export default API;



