import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Password reset requested for:', email);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-950  flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
        {/* Left side - Image */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://www.hdwallpapers.in/download/laptop_ultra_4k_hd_desktop_background-3840x2160.jpg')"}}>
          <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white text-center px-4">Reset Your Password</h2>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">Forgot Password?</h3>
            <p className="text-gray-600 mt-2">No worries, we'll send you reset instructions.</p>
          </div>

          {isSubmitted ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
              <p className="font-semibold">Check your email</p>
              <p>We've sent password reset instructions to {email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus:ring-indigo-500 focus:border-indigo-500 py-2 block w-full pl-10 sm:text-sm border-gray-300 rounded-md transition duration-150 ease-in-out"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center">
            <a href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;