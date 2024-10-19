// const chargebee = require("chargebee");

// chargebee.configure({
//   site: 'synxautomate-test',
//   api_key: 'test_rb7ZCRfYmdijdGYZzC7GcdTDQRIQrcucdgA'
// });

// const Chargebee = async (req, res) => {
//     try {
//         console.log('Fetching Chargebee plans...');
//         const result = await chargebee.plan.list().request();
//         console.log('Plans fetched successfully:', result);
//         res.json({ plans: result.list.map((item) => item.plan) });
//     } catch (error) {
//         console.error('Error fetching plans:', error); // Log the error for debugging
//         return res.status(500).send({ msg: "error", error });
//     }
//  };

// const createChangebee = async (req,res) =>{
//       const { planId, customerDetails } = req.body;
//       console.log('create charge bee is working', req.body)
//   try {
//     const result = await Chargebee.subscription.create({
//       plan_id: planId,
//       customer: customerDetails,
//     }).request();
    
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: 'Error processing subscription' });
//   }
// }
// module.exports={
//     Chargebee,
//     createChangebee
// }

const Subscription = require('../../models/subscription');
const User = require("../../models/user");
const Razorpay = require('razorpay');



const razorpay = new Razorpay({
  key_id: 'rzp_test_6aYUU1Lcsfqbw3', 
  key_secret: '0UqZWocm1vbMbUnIMruWmgaQ',
});

const checksubscription= async (req,res)=>{
  try{
    const {user }=req.body;
console.log("useeer",user)
    const subscription = await Subscription.findOne({ userId:user._id });

   

    
    const razorpaySubscriptionId = subscription.razorpaySubscriptionId; 
    const razorpaySubscription = await razorpay.subscriptions.fetch(razorpaySubscriptionId);

    if (!razorpaySubscription) {
      return res.status(200).json({
        message: 'New user'
      });
    }
    if (razorpaySubscription) {
      return res.status(200).json({
        message: 'User found', status:true
      });
    }

  
    const currentDate = new Date();
    if (razorpaySubscription.status === 'cancelled' || currentDate > new Date(razorpaySubscription.end_at * 1000)) {
      return res.status(200).json({
        message: 'Your subscription expired via Razorpay'
      });
    }

    if (subscription.status === 'expired' || currentDate > subscription.endDate) {
      return res.status(200).json({
        message: 'Your local subscription expired'
      });
    }

  } catch (err){
    return res.status(403).json({
      message: 'error'
    });
  }
}




const razorpayPayments = async (req, res) => {
  const { planId,user } = req.body;
  console.log(req.body)

  try {
    
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_id: user.customerId,
      total_count: 12, 
      customer_notify: 1,
      // trial_days: 30,
    });
    console.log(subscription)
    
    res.status(200).json({
      subscription: subscription,

    });
  } catch (error) {
    console.error('Error creating subscription:', error.message || error);
    res.status(500).json({ error: 'Subscription creation failed', details: error });
  }
};


// // // // // // // // // // // // // // // 
// details {
//   user: {
//     _id: '6702dc1993c3fc059a25d39d',
//     name: 'AKbar Haleel',
//     email: 'akbarhaleel508@gmail.com',
//     mobile: 590740343,
//     password: '$2a$10$WzzM8dpVQXXVBRPohxFLx.BMq/ZbdhAjdlr2nH0IPz1mFmuOBtj5O',
//     otp: null,
//     isVerified: true,
//     membership: [],
//     __v: 0
//   },
//   paymentData: {
//     amount: 2999,
//     response: {
//       razorpay_payment_id: 'pay_P88DrXqMWYMM27',
//       razorpay_order_id: 'order_P88DngyScfxRU8',
//       razorpay_signature: 'd2991dd7ea1e3b72549499ceaf8551f21994c5c2271df38edfaf7f3f1bbb9355'
//     }
//   },
//   title: 'SILVER'
// }
const createsubscription=async (req, res) => {
  const { planId, customerId } = req.body;
  

  const subscriptionOptions = {
      plan_id: 'YOUR_PLAN_ID', // Plan ID from Razorpay Dashboard
      customer_notify: 1,
      total_count: 12, // Total number of billing cycles
  };

  try {
      const subscription = await razorpayInstance.subscriptions.create(subscriptionOptions);
      res.json(subscription);
  } catch (error) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ error: 'Subscription creation failed' });
  }
};

const handlePaymentSuccess = async (req, res) => {
  try {
    const {
      user,
      paymentData,
      title,
    } = req.body;

    console.log("details",req.body)

    let msgLimit;
    let whatsappLimit;
    let integrationLimit;
    if(title=="SILVER"){
      msgLimit=100;
      whatsappLimit=100;
      integrationLimit=5
    }else if(title=="GOLD"){
      msgLimit=250;
      whatsappLimit=250;
      integrationLimit=10
    }else if(title=="DIAMOND"||title=="FREE"){
      msgLimit=500;
      whatsappLimit=500;
      integrationLimit=20
    }
    
      const startDate = new Date();

    
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() + 1);

     
      const subscriptionData = {
        userId: user._id,
        subscriptionType: title,
        startDate: startDate,
        endDate: endDate,
        razorpayPaymentId: paymentData.razorpay_payment_id,
        razorpaySubscriptionId: paymentData.razorpay_subscription_id,
        signature: paymentData.razorpay_signature,
        status: 'active',
        msgLimit:msgLimit,
        whatsappLimit:whatsappLimit,
        integrationLimit:integrationLimit;
      };
      
      // Use findOneAndUpdate to either update or create a subscription
      const subscription = await Subscription.findOneAndUpdate(
        { userId: user._id }, // Match by userId
        subscriptionData, // Data to update or create
        { new: true, upsert: true } // Options: new returns the updated document; upsert creates if not found
      );

      return res.status(200).json({
        message: 'Subscription created successfully',
        subscription
      });
    
  } catch (error) {
    console.error('Error creating subscription:');
    return res.status(500).json({ message: 'Server error' });
  }
};




module.exports={
  razorpayPayments,handlePaymentSuccess,createsubscription,checksubscription
}