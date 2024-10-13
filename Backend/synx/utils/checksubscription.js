const Subscription = require("../models/subscription");
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
    let check = typeof(userId);
    if(check == 'string'){
       user = JSON.parse(userId);
    }else{
      user = userId
    }
    console.log("userqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", user);
    const subscription = await Subscription.findOne({ userId: user._id });

    if (!subscription) {
      return res.status(200).json({
        message: "Not Found",
        status: false,
      });
    }

    // Fetch subscription details from Razorpay using the Razorpay subscription ID
    const razorpaySubscriptionId = subscription.razorpaySubscriptionId; // Assuming you have stored this in the DB
    const razorpaySubscription = await razorpay.subscriptions.fetch(
      razorpaySubscriptionId
    );

    if (!razorpaySubscription) {
      return res.status(200).json({
        message: "Not Found",
        status: false,
      });
    }

    // Compare the status of Razorpay subscription with the local subscription
    const currentDate = new Date();
    if (
      razorpaySubscription.status === "cancelled" ||
      currentDate > new Date(razorpaySubscription.end_at * 1000)
    ) {
      return res.status(200).json({
        message: "Not Found",
        status: false,
      });
    }

    if (
      subscription.status === "expired" ||
      currentDate > subscription.endDate
    ) {
      return res.status(200).json({
        message: "Not Found",
        status: false,
      });
    }

    next();
  } catch (error) {
    console.error("Error checking subscription:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = checkSubscription;
