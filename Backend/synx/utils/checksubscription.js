const Subscription = require("../models/subscription");
const userData = require("../models/user");
const Razorpay = require("razorpay");

// Initialize Razorpay instance with your API credentials
const razorpay = new Razorpay({
  key_id: "rzp_test_6aYUU1Lcsfqbw3",
  key_secret: "0UqZWocm1vbMbUnIMruWmgaQ",
});

const checkSubscription = async (req, res, next) => {
  try {
    let user;
    const userId = req.body.user;

    // Ensure userId is parsed properly
    if (typeof userId === 'string') {
      user = JSON.parse(userId);
    } else {
      user = userId;
    }

    console.log("User:", user);
    let userdetail=await userData.findOne({email:user.email})
console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",userdetail)

    if (userdetail.newuser == true) {
      next();  
      console.log('111111111111111111111111111111111111111111111111111111111111111111');
      return;
    }

    console.log('22222222222222222222222')

    // Check if user has an active subscription
    const subscription = await Subscription.findOne({ userId: user._id });
    if (!subscription) {
      return res.status(200).json({
        message: "Subscription not found",
        status: false,
        trailover:true
      });
    }
console.log("333333333333333")
      if(subscription.subscriptionType==="FREE"){
        return res.status(200).json({
          message: "trail period over",
          status: false,
          trailover:true
        });
      }
    // Fetch subscription from Razorpay using the stored subscription ID
    const razorpaySubscriptionId = subscription.razorpaySubscriptionId;
    const razorpaySubscription = await razorpay.subscriptions.fetch(razorpaySubscriptionId);

    if (!razorpaySubscription) {
      return res.status(200).json({
        message: "Razorpay subscription not found",
        status: false,
        trailover:true
      });
    }
console.log("444444444444")
    const currentDate = new Date();

    // Check if the subscription has been canceled or expired
    if (
      razorpaySubscription.status === "cancelled" ||
      currentDate > new Date(razorpaySubscription.end_at * 1000) ||  // Razorpay's end_at is in seconds
      subscription.status === "expired" ||
      currentDate > subscription.endDate
    ) {
      return res.status(200).json({
        message: "Subscription expired or canceled",
        status: false,
        trailover:true
      });
    }

    next();  // Allow the user to proceed if subscription is valid
  } catch (error) {
    console.error("Error checking subscription:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = checkSubscription;
