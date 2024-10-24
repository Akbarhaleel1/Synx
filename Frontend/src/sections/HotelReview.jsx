


import React, { useEffect, useState } from 'react';
import { Star, Loader } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const HospitalityReview = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hoverRating, setHoverRating] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sendPoint = async () => {
      setIsLoading(true);
      const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
          endpoint: params.get('endpoint'),
          qrPoint: params.get('qr')
        };
      };
      const { endpoint, qrPoint } = getQueryParams();
      localStorage.setItem('endpoint', endpoint);
      localStorage.setItem('qrPoint', qrPoint);
      try {
        const result = await axios.post('https://synxbackend.synxautomate.com/feedBack', { endpoint, qrPoint });
        console.log('result isssss', result)
        setCompanyName(result.data.companyName)
        setMessage(result.data.reviewLink.title);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('We value your feedback!');
      } finally {
        setIsLoading(false);
      }
    };
    sendPoint();
  }, [location]);

  const submitStar = (star) => {
    setRating(star);
    localStorage.setItem('star', star);
    setTimeout(() => {
      navigate(star <= 3 ? '/userReview' : '/PositiveFeedBack');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
            <div className="mb-6">
              <img 
                src="https://cdnl.iconscout.com/lottie/premium/thumb/home-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--house-building-property-estate-circle-glass-morphism-pack-design-development-icons-5804353.gif" 
                alt="Rating animation" 
                className="ml-[52px] w-32 h-32 object-cover"
              />
                <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {companyName}
          </h1>
          <p className="text-lg text-gray-600 mt-2">We Value Your Feedback</p>
        </div>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">{message}</h2>
            )}
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-10 h-10 cursor-pointer transition-all duration-200 ease-in-out ${
                    star <= (hoverRating || rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300 hover:text-yellow-200'
                  }`}
                  onClick={() => submitStar(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            <p className="text-center text-gray-600 text-sm">
              {rating ? `You've selected ${rating} star${rating !== 1 ? 's' : ''}` : 'Tap a star to rate your experience'}
            </p>
          </div>
          <div className="md:w-1/2 bg-blue-600 flex items-center justify-center p-8">
            <img
              src="https://cdnl.iconscout.com/lottie/premium/thumb/people-rating-stars-animation-download-in-lottie-json-gif-static-svg-file-formats--like-logo-customer-feedback-product-review-satisfaction-pack-store-animations-7454815.gif"
              alt="Customer feedback animation"
              className="w-full max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalityReview;