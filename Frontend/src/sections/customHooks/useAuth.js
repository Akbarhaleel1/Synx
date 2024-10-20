// // useAuth.js
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const useAuth = () => {
//     const navigate = useNavigate();
//     const params = new URLSearchParams(window.location.search);
//     const userData = params.get('userData');
//     const tokens = params.get('token');
//     const refreshToken = params.get('refreshToken');

//     console.log('User Data111111111111111111111:', userData);
//     console.log('Token111111111111111:', decodeURIComponent(tokens));
//     console.log('Refresh Token:111111', decodeURIComponent(refreshToken));



//     useEffect(() => {
//         const manageTokens = async () => {
//             console.log('Token111111111111111:', );
//             const userDatas = JSON.parse(userData);
//             localStorage.setItem('user',userDatas)
//             let accessToken = decodeURIComponent(tokens)
//             if(!accessToken){
//                 accessToken = JSON.parse(localStorage.getItem('token'));
//                 console.log('accessToken',accessToken)
//             }
//             if (isTokenExpired(accessToken)) {
//                 try {
//                     console.log('refreshAccessToken')
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
    const userData = params.get('userData'); // This may be an object already
    const tokens = params.get('token');
    const refreshToken = params.get('refreshToken');

    console.log('User Data:', userData);
    console.log('Token:', decodeURIComponent(tokens));
    console.log('Refresh Token:', decodeURIComponent(refreshToken));

    useEffect(() => {
        const manageTokens = async () => {
            let userDatas;

            try {
                // If userData is a string, parse it, otherwise use it as it is
                if (typeof userData === 'string') {
                    userDatas = JSON.parse(userData);
                } else {
                    userDatas = userData; // Assume it's already an object
                }
                console.log('Parsed User Data:', userDatas);
            } catch (error) {
                console.error("Error parsing userData:", error);
                return; // Exit if userData is not valid
            }

            // Store user data in localStorage as a string
            const getUserData = JSON.stringify(userDatas);
            console.log('Stored User Data:', getUserData);
            localStorage.setItem('user', getUserData);

            // Handle tokens
            let accessToken = decodeURIComponent(tokens);
            if (!accessToken) {
                accessToken = JSON.parse(localStorage.getItem('token'));
                console.log('Access Token from localStorage:', accessToken);
            }

            if (isTokenExpired(accessToken)) {
                try {
                    console.log('Refreshing Access Token');
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
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = payload.exp * 1000;
            return Date.now() > expirationTime;
        } catch (error) {
            console.error("Error checking token expiration:", error);
            return true; // Assume expired if error occurs
        }
    };
};

export default useAuth;
