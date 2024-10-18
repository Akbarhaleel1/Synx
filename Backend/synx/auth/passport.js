const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const dotenv = require('dotenv');
const User = require('../models/user');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Subscription = require('../models/subscription');
const razorpay = new Razorpay({
    key_id: 'rzp_test_6aYUU1Lcsfqbw3',
    key_secret: '0UqZWocm1vbMbUnIMruWmgaQ', 
  });
  

dotenv.config();


const generateRandomPassword = (length = 10) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length); 
};


const passportConfig = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    passport.use(
        new GoogleStrategy(
            {
                callbackURL: 'https://synxbackend.synxautomate.com/auth/google/callback',
                clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
                clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log('Passport configuration is working');
                    let user = await User.findOne({ email: profile._json.email });
                    if (user) {
                        console.log('User already exists!');
                        return done(null, user);
                    } else {
                        
                        const customer = await razorpay.customers.create({
                            name: profile._json.given_name, 
                            email: profile._json.email,
                             
                          });
                        const newUser = new User({
                            name: profile._json.given_name || "",
                            email: profile._json.email,
                            isBlocked: false,
                            isVerified: true,
                            profilePic: profile._json.picture || null,
                            password: generateRandomPassword(12),
                            customerId:customer.id,
                        });
                        console.log('New user:', newUser);
                        await newUser.save();
                        let userData = await User.findOne({ email: profile._json.email });
                        const startDate = new Date();
                        const endDate = new Date();
                        endDate.setMonth(startDate.getMonth() + 1);
                        const subscriptionData = {
                            userId: userData._id,
                            subscriptionType: "FREE",
                            startDate: startDate,
                            endDate: endDate,
                            status: 'active',
                          };
                  
                
                          const subscription = await Subscription.findOneAndUpdate(
                            { userId: userData._id }, 
                            subscriptionData, 
                            { new: true, upsert: true } 
                          );

                        return done(null, newUser);
                    }
                } catch (error) {
                    console.error('Error during authentication:', error);
                    return done(error);
                }
            }
        )
    );
};

module.exports = passportConfig;
