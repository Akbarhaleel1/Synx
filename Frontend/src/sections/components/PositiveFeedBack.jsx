

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PositiveFeedBack = () => {
//     const [data, setData] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchLink = async () => {
//             const endpoint = localStorage.getItem('endpoint');
//             try {
//                 const result = await axios.post('http://localhost:3000/starFilterReviewLink', { endpoint });
//                 setData(result.data.filterlink);
//                 console.log('Fetched data:', result.data.filterlink);
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

//                     <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
//                         We Value Your Feedback
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
//                                 href={item.platform === 'google' ? `https://www.google.com/maps/place/?q=place_id:${item.link}` : item.link} 
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
//             <div className="md:w-1/2 bg-gray-100 hidden md:block p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
//     <img 
//         src="https://cdnl.iconscout.com/lottie/premium/thumb/boy-taking-star-rating-feedback-animation-download-in-lottie-json-gif-static-svg-file-formats--online-survey-pack-services-animations-8921929.gif" 
//         alt="Person taking star rating feedback" 
//         className="w-full h-80 object-cover rounded-lg border-4 border-blue-400 shadow-md"
//     />
// </div>

//         </div>
//     );
// };

// export default PositiveFeedBack;



import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PositiveFeedBack = () => {
    const [data, setData] = useState([]);
    const [companyName, setCompanyName] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLink = async () => {
            const endpoint = localStorage.getItem('endpoint');
            try {
                const result = await axios.post('https://synxbackend.synxautomate.com/starFilterReviewLink', { endpoint });
                setData(result.data.filterlink);
                console.log('Fetched data:', result.data.companyName);
                setCompanyName(result.data.companyName)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchLink();
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-blue-200 to-purple-300">
            <div className="md:w-1/2 p-10 flex flex-col justify-center items-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                    <svg className="w-16 h-16 mb-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 40 H80 V90 H20 Z" stroke="black" strokeWidth="4" />
                        <path d="M10 40 Q50 10 90 40" fill="black" />
                    </svg>

                    <div className="relative overflow-hidden py-6 px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        {companyName}
      </h1>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 opacity-20 transform skew-y-3"></div>
    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                        We Value Your Feedback{companyName}
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm text-center">
                        Your reviews help us grow and better serve customers like you.
                    </p>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Leave a public review
                    </p>

                    {/* Render buttons */}
                    <div className="flex flex-col space-y-4 mt-6">
                        {data.map((item) => (
                            <a 
                                href={item.platform === 'google' ? `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${item.link}` : item.link} 
                                key={item._id} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <button
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    Leave a review on {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
                                </button>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-100 hidden md:flex p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 space-y-6">
                <img 
                    src="https://cdnl.iconscout.com/lottie/premium/thumb/boy-taking-star-rating-feedback-animation-download-in-lottie-json-gif-static-svg-file-formats--online-survey-pack-services-animations-8921929.gif" 
                    alt="Person taking star rating feedback" 
                    className="w-full h-80 object-cover rounded-lg border-4 border-blue-400 shadow-md"
                />
                <img 
                    src="https://cdnl.iconscout.com/lottie/premium/thumb/rating-stars-animation-download-in-lottie-json-gif-static-svg-file-formats--like-logo-five-customer-feedback-review-marketing-concepts-pack-business-animations-7286244.gif" 
                    alt="Feedback animation" 
                    className="w-full h-80 object-cover rounded-lg border-4 border-blue-400 shadow-md"
                />
            </div>
        </div>
    );
};

export default PositiveFeedBack;
