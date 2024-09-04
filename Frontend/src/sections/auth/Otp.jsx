import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('OTP submitted:', otp.join(''));
      setIsSubmitting(false);
      setIsVerified(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Account</h2>
          <p className="text-gray-600">We've sent a code to your email. Please enter it below.</p>
        </div>

        {isVerified ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
            <p className="font-semibold">Verification Successful!</p>
            <p>Your account has been verified.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={el => inputs.current[index] = el}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg mx-1 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || otp.some(digit => digit === '')}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                (isSubmitting || otp.some(digit => digit === '')) ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
              Resend OTP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;