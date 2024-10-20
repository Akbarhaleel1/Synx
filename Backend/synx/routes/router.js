const express = require("express");

const Route = express.Router();
const authentication = require("../controller/review_controller/authentication");
// // const subscription = require("../controller/review_controller/subscription");
const scrapper = require("../controller/review_controller/scrapper");
const getReview = require("../controller/review_controller/getreview");
const showReview = require("../controller/review_controller/showReviews");
const reviewLink = require("../controller/review_controller/reviewLink");
const sender = require("../controller/review_controller/sender");
const authMiddleware = require("../utils/authMiddleware");
const customreview = require("../controller/review_controller/synxReview");
const feedback = require("../controller/review_controller/customreview");
const Analytics = require("../controller/review_controller/analytics");
const passport = require("passport");
const chargebee = require('../controller/review_controller/chargebee');
const checkSubscription = require("../utils/checksubscription");
Route.post("/signup", authentication.signup);
Route.post("/login", authentication.login);
Route.post("/refresh_token", authentication.refreshToken);
Route.post("/otp", authentication.validateOtp);
Route.post("/resendOtp",authentication.resendOtp)
Route.post("/integrations", authMiddleware, scrapper.integrate);
Route.post("/integratepage", authMiddleware,checkSubscription, scrapper.integratepage);
Route.post("/deleteLink", authMiddleware, scrapper.deleteLink);
// Route.post("/subscribe", authMiddleware, subscription.subscribe);
Route.post("/editReview", authMiddleware, reviewLink.createOrUpdateReviewLink);


Route.get("/auth/google", (req, res, next) => {
  console.log("Google OAuth initiated");
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});

// Route.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//       failureRedirect: "https://synx-review.synxautomate.com/login",
//   }),
//   (req, res) => {
//       console.log('User authenticated successfully:', req.user);
//       authentication.googleCallback
//   }
// );

Route.get(
  "/google/callback",
  passport.authenticate("google", {
      failureRedirect: "https://synxbackend.synxautomate.com/login",
  }),
  (err, req, res, next) => {
      if (err) {
          console.error("Error in authentication:", err);
          res.redirect("https://synxbackend.synxautomate.com/error");
      } else {
          console.log('User authenticated successfully:', req.user);
          authentication.googleCallback(req, res);
      }
  }
);



Route.post("/generateqr", authMiddleware,checkSubscription, getReview.generateqr);
// verify payment

Route.post("/reviews", authMiddleware, checkSubscription, showReview.showReview);
Route.post(
  "/saveEmailTemplate",
  authMiddleware,
  getReview.saveOrUpdateEmailTemplate
);
Route.post("/ePage", authMiddleware, getReview.saveOrUpdateETemplate);
Route.post("/emailPage", authMiddleware,checkSubscription, getReview.emailpage);
Route.post("/ePageLoad", authMiddleware,checkSubscription, getReview.epage);

Route.post("/sendWhatsapp", sender.sendWhatsAppMessages);
Route.post("/sendReviews", sender.sms);
Route.post("/sendEmailReviews", sender.email);

Route.post("/forgot-password", authentication.forgotPassword);
Route.post("/forgetOtp",authentication.validateOtpforgotten);

// Reset Password route
Route.post("/reset-password", authentication.resetPassword);

// custom reviewpage route
Route.post("/showcustomreviews", authMiddleware,checkSubscription, customreview.getUserReviews);
Route.post("/editLinkEndpoint", authMiddleware,checkSubscription, reviewLink.reviewlink);
Route.post("/userReview", feedback.reviewPage);
Route.post("/analytics", authMiddleware,checkSubscription, Analytics.getAnalytics);
Route.post("/feedBack", feedback.feedback);
// Route.get('/chargebee/plans',chargebee.Chargebee)
// Route.post('/chargebee/subscriptions',chargebee.createChangebee)
Route.post("/payments",chargebee.razorpayPayments);
Route.post("/successpage",chargebee.handlePaymentSuccess)
Route.post("/checkuser",chargebee.checksubscription)
// Route.post("/create-subcription",chargebee.createsubscription)


Route.post("/sendTemplate",authMiddleware,getReview.saveOrUpdateWhatsappTemplate)
Route.post("/whatsappage",authMiddleware,checkSubscription,getReview.wpage)
Route.post("/starFilterReviewLink",feedback.starfilterpage)



// Chargebee.configure({
//   site: 'synxautomate',
//   api_key: 'live_U58qdgrUX6R1cdRcu8Y7ZSLo3nhrocdOuuQ',
// });

// // Fetch pricing plans
// Route.get('/api/chargebee/plans', async (req, res) => {
//   try {
//     console.log('Fetching Chargebee plans...');
//     const result = await Chargebee.plan.list().request();
//     console.log('Plans fetched successfully:', result);
//     res.json({ plans: result.list.map((item) => item.plan) });
//   } catch (error) {
//     console.error('Error fetching plans:', error); // Log the detailed error
//     res.status(500).json({ error: error.message || 'Error fetching plans' });
//   }
// });

// Route.post('/api/chargebee/subscribe', async (req, res) => {

// });

module.exports = Route;
