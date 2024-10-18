


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PositiveFeedback = () => {
//   const [data, setData] = useState([]);
//   const [companyName, setCompanyName] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLink = async () => {
//       const endpoint = localStorage.getItem('endpoint');
//       try {
//         const result = await axios.post('https://synxbackend.synxautomate.com/starFilterReviewLink', { endpoint });
//         setData(result.data.filterlink);
//         setCompanyName(result.data.companyName);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchLink();
//   }, []);

//   const platformIcons = {
//     google: (
//       <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 inline-block">
//         <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//         <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//         <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//         <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//         <path fill="none" d="M1 1h22v22H1z" />
//       </svg>
//     ),
//     facebook: '⭐',
//     yelp: '⭐',
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl rounded-lg p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             {companyName}
//           </h1>
//           <p className="text-lg text-gray-600 mt-2">We Value Your Feedback</p>
//         </div>
//         <div className="text-center mb-8">
//           <p className="text-gray-600 mb-4">
//             Your reviews help us grow and better serve customers like you.
//           </p>
//           <span className="text-4xl">👍</span>
//         </div>
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {data.map((item) => (
//             <button
//               key={item._id}
//               className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//               onClick={() => window.open(item.platform === 'google' ? `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${item.link}` : item.link, '_blank')}
//             >
//               <span className="mr-2">{platformIcons[item.platform] || '⭐'}</span>
//               Review on {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PositiveFeedback;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    google: "https://cdnl.iconscout.com/lottie/premium/thumb/google-logo-animation-download-in-lottie-json-gif-static-svg-file-formats--social-media-company-pack-logos-animations-7825489.gif",
    tripadvisor: "https://cdnl.iconscout.com/lottie/premium/thumb/tripadvisor-logo-animation-download-in-lottie-json-gif-static-svg-file-formats--brand-social-media-identity-pack-logos-animations-8794850.gif",
    airbnb: "https://cdnl.iconscout.com/lottie/premium/thumb/airbnb-logo-animation-download-in-lottie-json-gif-static-svg-file-formats--apps-social-media-pack-logos-animations-4366891.gif",
    "booking.com": "https://cdnl.iconscout.com/lottie/premium/thumb/bookingcom-logo-animation-download-in-lottie-json-gif-static-svg-file-formats--booking-hotel-host-real-state-rent-social-media-logos-pack-animations-7945746.gif",
    agoda: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjlobGRvbm1reTd5YmQ4NXc4OXY5MnV4aTg0d2tnMjdmbXY3MW1rdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/2MZJ5wvSB8b5aKJD4a/giphy.gif",
    makemytrip: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzM5cmRuYWRpMW14aGg2NHBzNzdqajZqZjE3eWthcXZ0cjM3MWczaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LNjsnKKe83ZiriWcAs/giphy.gif",
    trustpilot: "https://media1.giphy.com/media/jhVbcQnNyIqI69lTtB/giphy.gif?cid=ecf05e47liyfk9ya6ybeg1d6gsi90zco1lg31yr8u2w9647d&ep=v1_stickers_search&rid=giphy.gif&ct=s",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {companyName}
          </h1>
          <p className="text-lg text-gray-600 mt-2">We Value Your Feedback</p>
        </div>
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">
            Your reviews help us grow and better serve customers like you.
          </p>
          <span className="text-4xl">👍</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <button
              key={item._id}
              className="w-full py-4 px-6 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center"
              onClick={() => window.open(item.platform === 'google' ? `https://search.google.com/local/writereview?placeid=${item.link}` : item.link, '_blank')}
            >
              <img 
                src={platformIcons[item.platform.toLowerCase()] || "/api/placeholder/100/100"} 
                alt={`${item.platform} logo`}
                className="w-16 h-16 mb-2 object-contain"
              />
              <span>Review on {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PositiveFeedback;