// Reviews.jsx
import { useState,useEffect} from "react";
import Nav from "../components/Nav";
import bellIcon from "../assets/images/bellIcon.png";
import axios from 'axios'
import useAuth from './customHooks/useAuth';
import {useNavigate} from 'react-router-dom'
const Reviews = () => {
  const [isToggled, setToggled] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedFilter, setSelectedFilter] = useState("Types"); // State for filter selection
  const navigate = useNavigate()
  useAuth();

  
  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const user = localStorage.getItem("user");
      const getToken = localStorage.getItem('token');
      const token = JSON.parse(getToken)
      // const result = await axios.post("https://synxbackend.synxautomate.com/reviews", { user },{headers: {
      //   Authorization: `Bearer ${token}`,
      // }});
      const result = await axios.post("https://synxbackend.synxautomate.com/reviews", { user },{headers: {
        Authorization: `Bearer ${token}`,
      }});
      console.log("result",result.data);
      if(result.data.message === "Not Found"){
        navigate('/PricingTable')
        return
      }
      setReviews(result.data.review); 
    };
    fetchReviews();
  }, []);


  // if(!reviews){
  //   // console.log('review',)
  //   navigate('/PricingTable')
  // }
  
  const filteredReviews = reviews.filter((review) => {
    const reviewText = review.review?.toLowerCase() || "";
    const reviewerName = review.name?.toLowerCase() || "";
    const reviewPlatform = review.platform?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    
    const matchesSearchQuery = (
      reviewText.includes(query) ||
      reviewerName.includes(query) ||
      reviewPlatform.includes(query)
    );

   
    switch (selectedFilter) {
      case "Types":
        return matchesSearchQuery; // No additional filtering for "Types"
      case "Answers":
        // Add specific filtering logic for "Answers" if needed
        return matchesSearchQuery; // Placeholder
      case "Date":
        // Add specific filtering logic for "Date" if needed
        return matchesSearchQuery; // Placeholder
      default:
        return matchesSearchQuery;
    }
  });

  // const ReviewCard = ({ review }) => (
  //   <div className="bg-gray-900 rounded-xl p-4 mb-4">
  //     <div className="flex items-center mb-2">
  //       {review.image && (
  //         <img
  //           src={review.image}
  //           alt="User"
  //           className="w-12 h-12 rounded-full mr-4"
  //         />
  //       )}
  //       <div>
  //         <h2 className="text-white font-light">{review.name}</h2>
  //         <p className="text-sm text-gray-400">{review.platform}</p>
  //         <p className="text-xs text-gray-400">{review.date}</p>
  //       </div>
  //     </div>
  //     <div className="flex mb-2">
  //       {[1, 2, 3, 4, 5].map((star, index) => (
  //         <span
  //           key={index}
  //           className={`text-xl transition-colors duration-200 ${
  //             index < review.rating ? "text-yellow-500" : "text-gray-300"
  //           }`}
  //         >
  //           ★
  //         </span>
  //       ))}
  //     </div>
  //     <p className="text-white text-sm font-light mb-4">{review.review}</p>
  //     {review.link && (
  //       <a
  //         href={review.link}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="inline-block bg-black text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-gray-800"
  //       >
  //         View on {review.platform}
  //       </a>
  //     )}
  //   </div>
  // );


  const ReviewCard = ({ review }) => (
    <div className="bg-gray-900 rounded-xl p-4 mb-4">
      <div className="flex items-center mb-2">
        {review.image && (
          <img
            src={review.image}
            alt="User"
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <div>
          <h2 className="text-white font-light">{review.name}</h2>
          <p className="text-sm text-gray-400">{review.platform}</p>
          <p className="text-xs text-gray-400">{review.date}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span
            key={index}
            className={`text-xl transition-colors duration-200 ${
              index < review.rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-white text-sm font-light mb-4">{review.review}</p>
      {review.link && (
        review.platform === "google" ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=[YOUR_PLACE_ID]`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-gray-800"
          >
            View on Google Maps
          </a>
        ) : (
          <a
            href={review.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-gray-800"
          >
            View on {review.platform}
          </a>
        )
      )}
    </div>
  );
  
  
  return (
    <section className="relative bg-[#f2f2f2] min-h-screen">
      <Nav />
      <div className="p-4 lg:p-8 lg:ml-64 ">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h1 className="text-black text-2xl ml-[00px] xl:ml-1 font-semibold mb-4 lg:mb-0">
            Your Reviews
          </h1>
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
            <input
              type="text"
              className="p-2 rounded-2xl border border-gray-300 text-black w-full lg:w-64"
              placeholder="Enter your review or search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
   
          </div>
        </div>


        <div className="bg-[#f2f2f2] rounded-xl p-4 overflow-y-auto max-h-[calc(121vh-250px)]">
  {filteredReviews.length > 0 ? (
    filteredReviews.map((review, index) => (
      <ReviewCard key={index} review={review} />
    ))
  ) : (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center transition-all duration-300">
      {/* Add a refined icon with a gradient background */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-4 mb-6 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      
      {/* Elegant and larger text for better readability */}
      <p className="text-2xl font-bold text-gray-800 mb-2">No Reviews Available</p>
      
      {/* Subtext with a professional tone */}
      <p className="text-md text-gray-500">
        It seems like no one has shared their thoughts yet. Be the first to leave a review!
      </p>
      
      {/* Add a subtle button encouraging engagement */}
     <a href="https://synx-frontend-hosting-9kae.vercel.app/integrations">
      <button
        className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
      >
        Integrate a Review
      </button>
      </a>
    </div>
  )}
</div>

      </div>
    </section>
  );
};

export default Reviews;