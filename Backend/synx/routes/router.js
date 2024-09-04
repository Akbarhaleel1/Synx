const express=require("express");
const Route=express.Router();
const authentication=require("../controller/review_controller/authentication");
const subscription=require("../controller/review_controller/subscription")




Route.post("/signup",authentication.signup)
Route.post('/login', authentication.login);
// LOGIN

// subscription selection
Route.post('/subscribe',subscription.subscribe)

// verify payment
Route.post("/verify_payment",subscription.verify_payment)


module.exports=Route