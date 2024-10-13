const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: 'YOUR_GOOGLE_CLIENT_ID',
      clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'https://www.googleapis.com/auth/business.manage'],
    },
    function (accessToken, refreshToken, profile, cb) {
      // Save the accessToken and profile info for the hotel owner
      // You can store these in your database for later use
      return cb(null, { profile, accessToken });
    }
  )
);

// Google Authentication Route
app.get('/auth/google', passport.authenticate('google'));

// Callback Route
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect to the dashboard.
    res.redirect('/dashboard');
  }
);

const axios = require('axios');

const getBusinessReviews = async (accessToken, accountId, locationId) => {
  try {
    const response = await axios.get(
      `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const reviews = response.data.reviews;
    console.log(reviews);
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
  }
};

const replyToReview = async (accessToken, accountId, locationId, reviewId, replyText) => {
    try {
      const response = await axios.post(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}:reply`,
        {
          comment: replyText,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log('Reply successful:', response.data);
    } catch (error) {
      console.error('Error replying to review:', error.message);
    }
  };
  