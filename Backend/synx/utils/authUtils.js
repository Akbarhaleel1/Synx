const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Generate Access Token
function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
    };

    const options = { expiresIn: '5s' }; 

    return jwt.sign(payload, secretKey, options);
}

// Generate Refresh Token
function generateRefreshToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
    };

    const options = { expiresIn: '3s' }; 

    return jwt.sign(payload, secretKey, options);
}

// Verify Access Token
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid access token');
    }
}

function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
}

module.exports = { generateToken, generateRefreshToken, verifyToken, verifyRefreshToken };
