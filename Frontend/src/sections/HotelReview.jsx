import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { useNavigate, useLocation  } from 'react-router-dom'
import useAuth from './customHooks/useAuth';


const HotelReview = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useAuth();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      endpoint: params.get('endpoint'), 
    };
  };

  const { endpoint } = getQueryParams();

  const submitStart = (star) => {
    setRating(star);
    if (star <= 3) {
      navigate('/userReview');
    };
    localStorage.setItem('star',star)
    localStorage.setItem('endpoint',endpoint)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8">
            <div className="mb-6">
              <svg className="w-16 h-16 text-indigo-600 mx-auto" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 30 H80 V90 H20 Z" />
                <path d="M10 30 Q50 10 90 30" />
                <path d="M40 90 V70 H60 V90" strokeWidth="4" stroke="white" fill="none" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">How was your stay at Hotel Dain Castle?</h2>
            <div className="flex justify-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-10 h-10 cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  onClick={() => submitStart(star)}
                />
              ))}
            </div>

          </div>
          <div className="md:w-1/2">
            <img
              src="https://wallpaperaccess.com/full/2484157.jpg"
              alt="Luxurious hotel room"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelReview;