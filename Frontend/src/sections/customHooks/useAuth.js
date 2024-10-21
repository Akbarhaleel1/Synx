// // useAuth.js
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const useAuth = () => {
//     const navigate = useNavigate();
//     const params = new URLSearchParams(window.location.search);
//     const userData = params.get('userData'); 
//     const tokens = params.get('token');
//     const refreshToken = params.get('refreshToken');

//     console.log('User Data:', userData);
//     console.log('Token:', decodeURIComponent(tokens));
//     console.log('Refresh Token:', decodeURIComponent(refreshToken));

//     useEffect(() => {
//         const manageTokens = async () => {
//             let accessToken = JSON.parse(localStorage.getItem('token'));
//             if(!accessToken){
//                 accessToken = decodeURIComponent(tokens);
//             }
//             let userDatas;

//             if (typeof userData === 'string') {
//                  userDatas = JSON.parse(userData);
//                  const getUserData = JSON.stringify(userDatas);
//                  console.log('Stored User Data:', getUserData);
//                  localStorage.setItem('user', getUserData);     
//                  localStorage.setItem('token', tokens);     
//             }

//             if (isTokenExpired(accessToken)) {
//                 try {
//                     await refreshAccessToken(); 
//                     accessToken = JSON.parse(localStorage.getItem('token'));
//                 } catch (error) {
//                     console.error("Failed to refresh token:", error);
//                     navigate('/login');
//                 }
//             }
//         };

//         manageTokens();
//     }, [navigate]);

//     const isTokenExpired = (token) => {
//         if (!token) return true; // Token not available
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const expirationTime = payload.exp * 1000;
//         return Date.now() > expirationTime;
//     };
// };

// export default useAuth;


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const userData = params.get('userData');
    const tokens = params.get('token');
    const refreshToken = params.get('refreshToken');

    console.log('User Data:', userData);
    console.log('Token:', tokens);
    console.log('Refresh Token:', refreshToken);

    useEffect(() => {
        const manageTokens = async () => {
            let accessToken = localStorage.getItem('token');
            if (!accessToken && tokens) {
                accessToken = decodeURIComponent(tokens);
                localStorage.setItem('token', accessToken); // Store the token in localStorage
            }

            let userDatas;

            // Check if userData is a string and parse it
            if (userData && typeof userData === 'string') {
                try {
                    userDatas = JSON.parse(userData); // Parse the userData string
                    console.log('Parsed User Data:', userDatas);
                    localStorage.setItem('user', userData); // Store in localStorage
                } catch (error) {
                    console.error("Failed to parse userData:", error);
                }
            }

            // Check if token is expired
            if (isTokenExpired(accessToken)) {
                try {
                    await refreshAccessToken(); // Refresh the token if expired
                    accessToken = localStorage.getItem('token');
                } catch (error) {
                    console.error("Failed to refresh token:", error);
                    navigate('/login');
                }
            }
        };

        manageTokens();
    }, [navigate, tokens, userData]);

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
            const expirationTime = payload.exp * 1000; // JWT expiration is in seconds, convert to milliseconds
            return Date.now() > expirationTime;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return true; // Consider expired if there's an error
        }
    };

    const refreshAccessToken = async () => {
        // Implement token refresh logic using refreshToken
        const token = localStorage.getItem('refreshToken');
        console.log('Using refresh token:', token);
        // Call your backend to refresh the access token using the refreshToken
        // After successful token refresh, store the new token in localStorage
    };
};

export default useAuth;

