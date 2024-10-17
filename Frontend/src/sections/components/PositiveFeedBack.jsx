// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PositiveFeedBack = () => {
//     const [data, setData] = useState([]);
//     const [companyName, setCompanyName] = useState('')
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchLink = async () => {
//             const endpoint = localStorage.getItem('endpoint');
//             try {
//                 const result = await axios.post('https://synxbackend.synxautomate.com/starFilterReviewLink', { endpoint });
//                 setData(result.data.filterlink);
//                 console.log('Fetched data:', result.data.companyName);
//                 setCompanyName(result.data.companyName)
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchLink();
//     }, []);

//     return (
//         <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-blue-200 to-purple-300">
//             <div className="md:w-1/2 p-10 flex flex-col justify-center items-center">
//                 <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
//                     <svg className="w-16 h-16 mb-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M20 40 H80 V90 H20 Z" stroke="black" strokeWidth="4" />
//                         <path d="M10 40 Q50 10 90 40" fill="black" />
//                     </svg>

//                     <div className="relative overflow-hidden py-6 px-4">
//       <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
//         {companyName}
//       </h1>
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 opacity-20 transform skew-y-3"></div>
//     </div>
//                     <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
//                         We Value Your Feedback{companyName}
//                     </h2>
//                     <p className="text-gray-600 mb-6 text-sm text-center">
//                         Your reviews help us grow and better serve customers like you.
//                     </p>

//                     <p className="text-center text-sm text-gray-500 mt-4">
//                         Leave a public review
//                     </p>

//                     {/* Render buttons */}
//                     <div className="flex flex-col space-y-4 mt-6">
//                         {data.map((item) => (
//                             <a 
//                                 href={item.platform === 'google' ? `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${item.link}` : item.link} 
//                                 key={item._id} 
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                             >
//                                 <button
//                                     className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//                                 >
//                                     Leave a review on {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
//                                 </button>
//                             </a>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-100 hidden md:flex p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 space-y-6">
//                 <img 
//                     src="https://cdnl.iconscout.com/lottie/premium/thumb/boy-taking-star-rating-feedback-animation-download-in-lottie-json-gif-static-svg-file-formats--online-survey-pack-services-animations-8921929.gif" 
//                     alt="Person taking star rating feedback" 
//                     className="w-full h-80 object-cover rounded-lg border-4 border-blue-400 shadow-md"
//                 />
//                 <img 
//                     src="https://cdnl.iconscout.com/lottie/premium/thumb/rating-stars-animation-download-in-lottie-json-gif-static-svg-file-formats--like-logo-five-customer-feedback-review-marketing-concepts-pack-business-animations-7286244.gif" 
//                     alt="Feedback animation" 
//                     className="w-full h-80 object-cover rounded-lg border-4 border-blue-400 shadow-md"
//                 />
//             </div>
//         </div>
//     );
// };

// export default PositiveFeedBack;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp } from 'lucide-react';

const PositiveFeedback = () => {
  const [data, setData] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLink = async () => {
      const endpoint = localStorage.getItem('endpoint');
      try {
        const result = await axios.post('https://synxbackend.synxautomate.com/starFilterReviewLink', { endpoint });
        setData(result.data.filterlink);
        setCompanyName(result.data.companyName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchLink();
  }, []);

  const platformIcons = {
    google: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        <path fill="none" d="M1 1h22v22H1z" />
      </svg>
    ),
    facebook: <Star className="w-6 h-6 mr-2 text-blue-600" />,
    yelp: <Star className="w-6 h-6 mr-2 text-red-600" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {companyName}
          </CardTitle>
          <p className="text-lg text-gray-600 mt-2">We Value Your Feedback</p>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Your reviews help us grow and better serve customers like you.
            </p>
            <ThumbsUp className="w-16 h-16 mx-auto text-green-500" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <Button
                key={item._id}
                className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                onClick={() => window.open(item.platform === 'google' ? `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${item.link}` : item.link, '_blank')}
              >
                {platformIcons[item.platform] || <Star className="w-6 h-6 mr-2" />}
                Review on {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PositiveFeedback;