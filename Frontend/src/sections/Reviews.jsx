// Reviews.jsx
import { useState,useEffect} from "react";
import Nav from "../components/Nav";
import bellIcon from "../assets/images/bellIcon.png";
import axios from 'axios'

const Reviews = () => {
  const [isToggled, setToggled] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedFilter, setSelectedFilter] = useState("Types"); // State for filter selection

  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const user = localStorage.getItem("user");
      const result = await axios.post("http://localhost:3000/reviews", { user });
      console.log("result", result);
      setReviews(result.data.review); // Assuming the response contains the review data
    };
    fetchReviews();
  }, []);

  // Filter reviews based on the search query and selected filter
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

    // Apply filter based on selected criteria
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
        <a
          href={review.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 hover:bg-gray-800"
        >
          View on {review.platform}
        </a>
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
            <p className="text-black text-center">No reviews available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;