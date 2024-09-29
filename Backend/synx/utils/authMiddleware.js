// const jwt = require('jsonwebtoken');

// const secretKey = process.env.JWT_SECRET;


// const authMiddleware = (req,res,next) =>{
//     const authHeader = req.headers.authorization;
//     console.log('authHeader',authHeader)
//     const token = req.header('Authorization')?.split(' ')[1];
    
//     if(!token){
//         console.log( 'No token, authorization denied');
        
//         return res.status(401).json({msg: 'No token, authorization denied'})
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey)
//         console.log('decoded',decoded);
//         req.user = decoded ;
//         next();
//     } catch (error) {
//         console.log( 'Token is not valid')
//         res.status(401).json({ msg: 'Token is not valid' });
//     }
// }

// module.exports = authMiddleware


const jwt = require('jsonwebtoken');

// Ensure secret key is defined
const secretKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // Extract the authorization header
  const authHeader = req.headers.authorization;
  console.log('authHeader:', authHeader);
  console.log('req.body:', req.body);

  // Check if authorization header is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token, authorization denied');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract the token from the Bearer string
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded token:', decoded);

    // Attach user data to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log('Token is not valid:', error.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
