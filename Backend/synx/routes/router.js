const express=require("express");
const Route=express.Router();
const authentication=require("../controller/review_controller/authentication");
const subscription=require("../controller/review_controller/subscription")
const scrapper=require("../controller/review_controller/scrapper")
const getReview=require("../controller/review_controller/getreview")
const showReview=require("../controller/review_controller/showReviews")
const reviewLink=require("../controller/review_controller/reviewLink")
const sender=require("../controller/review_controller/sender");
const authMiddleware = require("../utils/authMiddleware");
const customreview=require("../controller/review_controller/synxReview")
const feedback=require('../controller/review_controller/customreview')
const Analytics=require('../controller/review_controller/analytics')


Route.post("/signup",authentication.signup)
Route.post('/login', authentication.login);
Route.post('/refresh_token',authentication.refreshToken)
Route.post('/otp', authentication.validateOtp);
Route.post("/integrations",authMiddleware,scrapper.integrate)
Route.post("/integratepage",authMiddleware,scrapper.integratepage)
Route.post("/deleteLink",authMiddleware,scrapper.deleteLink)
Route.post('/subscribe',authMiddleware,subscription.subscribe)
Route.post("/editReview",authMiddleware,reviewLink.createOrUpdateReviewLink)


Route.post("/generateqr",authMiddleware,getReview.generateqr)
// verify payment
Route.post("/verify_payment",authMiddleware,subscription.verify_payment)
Route.post("/reviews",authMiddleware,showReview.showReview)
Route.post("/saveEmailTemplate",authMiddleware,getReview.saveOrUpdateEmailTemplate)
Route.post("/ePage",authMiddleware,getReview.saveOrUpdateETemplate)
Route.post("/emailPage",authMiddleware,getReview.emailpage)
Route.post("/ePageLoad",authMiddleware,getReview.epage)

Route.post("/sendWhatsapp",sender.sendWhatsAppMessages)
Route.post("/sendReviews",sender.sms)
Route.post("/sendEmailReviews",sender.email)

Route.post("/forgot-password",authentication.forgotPassword);

// Reset Password route
Route.post("/reset-password", authentication.resetPassword);

// custom reviewpage route
Route.post("/showcustomreviews", authMiddleware,customreview.getUserReviews)
Route.post("/editLinkEndpoint", reviewLink.reviewlink)
Route.post("/userReview",feedback.reviewPage)
Route.post("/analytics",authMiddleware,Analytics.getAnalytics)

module.exports=Route