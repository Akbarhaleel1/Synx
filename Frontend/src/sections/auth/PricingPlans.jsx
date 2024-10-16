
import React, { useEffect, useState } from 'react';
import RazorpayButton from '../components/RazorpayButton'; 
import RazorpayModal from '../components/RazorpayModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ title, price, popular, features, onSuccess }) => {
  // const [verifyUser,setVerifyUser] = useState(true)
  // const newUser = `w-full bg-purple-600 text-white py-2 rounded-md mb-4 font-bold hover:opacity-90 transition-opacity duration-300`;
  const existingUser = `w-full bg-black text-white py-2 rounded-md mb-4 font-bold hover:opacity-90 transition-opacity duration-300`;
  const navigate = useNavigate()
  const handleSuccess =async (paymentData) => {
    console.log('titlesssssssssss', title);
    let getUser = localStorage.getItem('user');
    const user = JSON.parse(getUser)
    const result = await axios.post('http://localhost:3000/successpage',{user,paymentData,title});
    console.log('result',result)
    navigate('/PlanSuccessPage')
    onSuccess(paymentData, title);
  };

  // useEffect(()=>{
  //   const fetchUser = async() =>{
  //     let getUser = localStorage.getItem('user');
  //     const user = JSON.parse(getUser)
  //     const checkUser = await axios.post('http://localhost:3000/checkuser',{user})
      
  //     console.log('checkUser',checkUser.data.message)
  //     if(checkUser.data.message=='User found'){
  //       setVerifyUser(false)
  //     }
  //   }
  //   fetchUser()
  // },[])

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${popular ? 'border-2 border-purple-500' : ''}`}>
      {popular && (
        <div className="bg-black text-white text-xs font-bold py-1 px-2 rounded-full mb-2 inline-block">
          MOST POPULAR
        </div>
      )}
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex items-baseline mb-4">
        <span className="text-3xl font-bold">₹{price}</span>
        <span className="text-gray-500 ml-1">per month</span>
      </div>
      <RazorpayButton 
        amount={price} 
        onSuccess={handleSuccess}
        className={existingUser}
        titleId={title}
      >
        Choose Plan
      </RazorpayButton>
      {/* {verifyUser ? (
        <RazorpayButton 
          amount={0}
          onSuccess={handleSuccess}
          className={existingUser}
          titleId={title}
        >
          Free Tier
        </RazorpayButton>
      ) : (
        <RazorpayButton 
          amount={price} 
          onSuccess={handleSuccess}
          className={newUser}
          titleId={title}
        >
          Choose Plan
        </RazorpayButton> */}
      {/* )} */}
      <h3 className="font-semibold mb-2">What's included</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="text-purple-600 mr-2 mt-1">•</div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PricingPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSuccess = async (paymentData, title) => {
    console.log('title', title);
    let getUser = localStorage.getItem('user');
    const user = JSON.parse(getUser);
    const result = await axios.post('http://localhost:3000/successpage', { user, paymentData, title });
    console.log('result', result);
    setModalOpen(true); 
    navigate('/PlanSuccessPage');
  };

  const plans = [
    {
      title: 'SILVER',
      price: '2,999',
      popular: false,
      features: [
        'Manage and respond to all reviews in one dashboard',
        'Collect reviews via SMS, Email, WhatsApp, or QR code',
        'Custom review link for mobile and desktop',
        'Positive reviews (3+ stars) auto-post to review sites',
        'Negative reviews (1-2 stars) trigger a feedback form',
        'Review analytics and standalone platform (up to 5 reviews per month)',
      ],
    },
    {
      title: 'GOLD',
      price: '5,999',
      popular: false,
      features: [
        'Manage and respond to reviews in one dashboard',
        'Collect reviews via SMS, Email, WhatsApp, or custom codes (review cards/tabletop)',
        'Custom review link for mobile and desktop',
        'Custom message templates for easy review collection',
        'Positive reviews (3+ stars) auto-post to review sites',
        'Negative reviews (1-2 stars) trigger a feedback form, with replies (up to 10/month)',
        'Website widgets to build trust (HTML integration)',
        'Analytics and 1-click social sharing',
        'Standalone review platform (up to 50 reviews per month)',
      ],
    },
    {
      title: 'DIAMOND',
      price: '9,999',
      popular: false,
      features: [
        'Manage and respond to reviews in one dashboard',
        'Collect reviews via SMS, Email, WhatsApp, or custom QR codes (review cards/tabletop)',
        'AI assistance and custom message templates for review collection',
        'Custom review link for mobile and desktop',
        'Positive reviews (3+ stars) auto-post to review sites',
        'Negative reviews (1-2 stars) trigger feedback forms, with replies (up to 100/month)',
        'AI-assisted review analytics and automated owner notifications',
        'Collect video reviews with private pages for website sharing',
        'Review widgets (HTML integration)',
        'Analytics, multi-location support, and 1-click social share with AI-generated posts',
        'CRM integration via webhooks/API for centralized review management',
        'Standalone review platform (up to 100 per month)',
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Select the perfect plan for your business needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} onSuccess={handlePaymentSuccess} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <RazorpayModal message="Payment successful!" onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default PricingPage;
