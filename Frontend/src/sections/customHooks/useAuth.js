// useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const userData = params.get('userData');
    const tokens = params.get('token');
    const refreshToken = params.get('refreshToken');

    console.log('User Data111111111111111111111:', userData);
    console.log('Token111111111111111:', decodeURIComponent(tokens));
    console.log('Refresh Token:111111', decodeURIComponent(refreshToken));

    useEffect(() => {
        const manageTokens = async () => {
            const accessToken = JSON.parse(localStorage.getItem('token'));
            console.log('accessToken',accessToken)
            if (isTokenExpired(accessToken)) {
                try {
                    console.log('refreshAccessToken')
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
