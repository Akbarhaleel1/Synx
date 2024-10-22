// useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const userData = params.get('userData'); 
    const tokens = params.get('token');
    const refreshToken = params.get('refreshToken');

    console.log('User Data:', userData);
    console.log('Token:', decodeURIComponent(tokens));
    console.log('Refresh Token:', decodeURIComponent(refreshToken));

    useEffect(() => {
        const manageTokens = async () => {
            let accessToken = JSON.parse(localStorage.getItem('token'));
            if(!accessToken){
                accessToken = decodeURIComponent(tokens);
            }
            let userDatas;

            if (typeof userData === 'string') {
                 userDatas = JSON.parse(userData);
                 const getUserData = JSON.stringify(userDatas);
                 console.log('Stored User Data:', getUserData);
                 localStorage.setItem('getUserData', userDatas);     
                 localStorage.setItem('userData', userData);     
                 localStorage.setItem('token', tokens);     
            }

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
