import axios from 'axios';

const refreshAccessToken = async () => {
   
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken')); 

    if (!refreshToken) {
        throw new Error('No refresh token available');
    }
    console.log('3')

    try {
        const response = await axios.post('http://localhost:3000/refresh_token', { refreshToken });
        console.log('4')

        console.log('respocne is ', response)
        const { accessToken } = response.data;

        localStorage.setItem('token', JSON.stringify(accessToken));
        return accessToken; 
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        throw error; 
    }
};

export { refreshAccessToken };
