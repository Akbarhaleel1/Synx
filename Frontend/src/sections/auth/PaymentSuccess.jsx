
import React, { useState, useEffect } from 'react';
import { CheckCircle, CreditCard, Calendar, User } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

const PaymentSuccessPage = ({ paymentData }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Extract relevant data from paymentData
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = paymentData || {};

  const handleDashboard = () =>{
    navigate('/reviews')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className={`inline-block transition-all duration-700 ease-out ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-800">Payment Successful!</h1>
          <p className="mt-2 text-lg text-gray-600">Thank you for your payment.</p>
        </div>
        
        <div className="mt-8 space-y-4">
          
          <button onClick={handleDashboard} className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
            <User className="mr-2" />
            Go to Dashboard
          </button>
          
          {/* <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors duration-300">
            View Payment Details
          </button> */}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>A confirmation email has been sent to your registered email address.</p>
          <p className="mt-1">If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;