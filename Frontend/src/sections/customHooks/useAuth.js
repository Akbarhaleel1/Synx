// useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const manageTokens = async () => {
            let accessToken = JSON.parse(localStorage.getItem('token'));

            if (isTokenExpired(accessToken)) {
                try {
                    await refreshAccessToken(); 
                    accessToken = JSON.parse(localStorage.getItem('token'));
                } catch (error) {
                    console.error("Failed to refresh token:", error);
                    navigate('/login');
                }
            }
        };

        manageTokens();
    }, [navigate]);

    const isTokenExpired = (token) => {
        if (!token) return true; // Token not available
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        return Date.now() > expirationTime;
    };
};

export default useAuth;
