const express=require("express");
const Route=express.Router();
const authentication=require("../controller/review_controller/authentication");
const subscription=require("../controller/review_controller/subscription")
const scrapper=require("../controller/review_controller/scrapper")
const getReview=require("../controller/review_controller/getreview")
const showReview=require("../controller/review_controller/showReviews")
const reviewLink=require("../controller/review_controller/reviewLink")
const sender=require("../controller/review_controller/sender")




Route.post("/signup",authentication.signup)
Route.post('/login', authentication.login);
Route.post('/otp', authentication.validateOtp);
Route.post("/integrations",scrapper.integrate)
Route.post("/integratepage",scrapper.integratepage)
Route.post("/deleteLink",scrapper.deleteLink)
// subscription selection
Route.post('/subscribe',subscription.subscribe)
Route.post("/editReview",reviewLink.createOrUpdateReviewLink)


// qr code
Route.post("/generateqr",getReview.generateqr)
// verify payment
Route.post("/verify_payment",subscription.verify_payment)
Route.post("/reviews",showReview.showReview)
Route.post("/saveEmailTemplate",getReview.saveOrUpdateEmailTemplate)
Route.post("/ePage",getReview.saveOrUpdateETemplate)
Route.post("/emailPage",getReview.emailpage)
Route.post("/ePageLoad",getReview.epage)

Route.post("/sendReviews",sender.sms)
Route.post("/sendEmailReviews",sender.email)

module.exports=Route