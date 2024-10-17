// import React, { useEffect, useState } from 'react';
// import { Star, Send } from 'lucide-react';
// import { useNavigate, useLocation  } from 'react-router-dom'
// // import useAuth from './customHooks/useAuth';
// import axios from 'axios'


// const HotelReview = () => {
//   const [rating, setRating] = useState(0);
//   const [message,setMessage] = useState('')
//   const navigate = useNavigate();
//   const location = useLocation();
  

//   // useAuth();

//   useEffect(()=>{
//     console.log('useEffect is workign')
//     const sendPoint = async() =>{
//       const getQueryParams = () => {
//         const params = new URLSearchParams(location.search);
//         return {
//           endpoint: params.get('endpoint'), 
//           qrPoint: params.get('qr')
//         };
//       };
//       const { endpoint,qrPoint } = getQueryParams();
//       localStorage.setItem('endpoint',endpoint)
//       localStorage.setItem('qrPoint',qrPoint)
//       // const result = await axios.post('https://synxbackend.synxautomate.com/feedBack', {endpoint, qrPoint });
//       const result = await axios.post('https://synxbackend.synxautomate.com/feedBack', {endpoint, qrPoint });
//       console.log('result',result)
//       setMessage(result.data.reviewLink.title)
//     }
//     sendPoint()
//   },[])

//   const submitStart = (star) => {
//     setRating(star);
//     if (star <= 3) {
//       navigate('/userReview');
//     }else{
//       navigate('/PositiveFeedBack')
//     }
//     localStorage.setItem('star',star)
  
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 p-8">
//             <div className="mb-6">
//               <svg className="w-16 h-16 text-indigo-600 mx-auto" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M20 30 H80 V90 H20 Z" />
//                 <path d="M10 30 Q50 10 90 30" />
//                 <path d="M40 90 V70 H60 V90" strokeWidth="4" stroke="white" fill="none" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{message}</h2>
//             <div className="flex justify-center space-x-2 mb-8">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={`w-10 h-10 cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
//                     }`}
//                   onClick={() => submitStart(star)}
//                 />
//               ))}
//             </div>

//           </div>
//           <div className="md:w-1/2">
//             <img
//               src="https://wallpaperaccess.com/full/2484157.jpg"
//               alt="Luxurious hotel room"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelReview;


// import React, { useEffect, useState } from 'react';
// import { Star, Send } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const HotelReview = () => {
//   const [rating, setRating] = useState(0);
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [hoverRating, setHoverRating] = useState(0);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const sendPoint = async () => {
//       setIsLoading(true);
//       const getQueryParams = () => {
//         const params = new URLSearchParams(location.search);
//         return {
//           endpoint: params.get('endpoint'),
//           qrPoint: params.get('qr')
//         };
//       };
//       const { endpoint, qrPoint } = getQueryParams();
//       localStorage.setItem('endpoint', endpoint);
//       localStorage.setItem('qrPoint', qrPoint);
//       try {
//         const result = await axios.post('https://synxbackend.synxautomate.com/feedBack', { endpoint, qrPoint });
//         setMessage(result.data.reviewLink.title);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setMessage('We value your feedback!');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     sendPoint();
//   }, [location]);

//   const submitStar = (star) => {
//     setRating(star);
//     localStorage.setItem('star', star);
//     setTimeout(() => {
//       navigate(star <= 3 ? '/userReview' : '/PositiveFeedBack');
//     }, 500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full transform transition-all duration-500 ease-in-out hover:scale-105">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
//             <div className="mb-6 transform transition-all duration-500 ease-in-out hover:scale-110">
//               <svg className="w-20 h-20 text-indigo-600" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M20 30 H80 V90 H20 Z" />
//                 <path d="M10 30 Q50 10 90 30" />
//                 <path d="M40 90 V70 H60 V90" strokeWidth="4" stroke="white" fill="none" />
//               </svg>
//             </div>
//             {isLoading ? (
//               <div className="animate-pulse flex space-x-4">
//                 <div className="h-6 bg-slate-200 rounded w-3/4"></div>
//               </div>
//             ) : (
//               <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 transition-all duration-300 ease-in-out">{message}</h2>
//             )}
//             <div className="flex justify-center space-x-2 mb-8">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={`w-12 h-12 cursor-pointer transition-all duration-300 ease-in-out transform ${
//                     star <= (hoverRating || rating) 
//                       ? 'text-yellow-400 fill-current scale-110' 
//                       : 'text-gray-300 hover:scale-105'
//                   }`}
//                   onClick={() => submitStar(star)}
//                   onMouseEnter={() => setHoverRating(star)}
//                   onMouseLeave={() => setHoverRating(0)}
//                 />
//               ))}
//             </div>
//             <p className="text-center text-gray-600 italic">
//               {rating ? `You've selected ${rating} star${rating !== 1 ? 's' : ''}` : 'Click on a star to rate your experience'}
//             </p>
//           </div>
//           <div className="md:w-1/2 relative overflow-hidden">
//             <img
//               src="https://wallpaperaccess.com/full/2484157.jpg"
//               alt="Luxurious hotel room"
//               className="w-full h-full object-cover transition-all duration-700 ease-in-out transform hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-20 transition-all duration-300 ease-in-out hover:bg-opacity-0"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelReview;



import React, { useEffect, useState } from 'react';
import { Star, Loader } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const HospitalityReview = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hoverRating, setHoverRating] = useState(0);
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
                src="https://cdnl.iconscout.com/lottie/premium/thumb/user-rating-4537395-3763776.gif" 
                alt="Rating animation" 
                className="w-32 h-32 object-cover"
              />
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