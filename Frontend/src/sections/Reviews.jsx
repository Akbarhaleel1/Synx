// Reviews.jsx
import { useState } from "react";
import Nav from "../components/Nav";
import bellIcon from "../assets/images/bellIcon.png";

const Reviews = () => {
  const [isToggled, setToggled] = useState(false);
  const [rating, setRating] = useState(0);
  
  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const ReviewCard = ({ customerNumber }) => (
    <div className="bg-gray-900 rounded-xl p-4 mb-4">
      <h2 className="text-white mb-2 font-light">Customer {customerNumber}</h2>
      <div className="flex mb-2">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span
            key={index}
            className={`text-xl cursor-pointer transition-colors duration-200 ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleClick(index)}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-white text-sm font-light">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s.
      </p>
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
              placeholder="Enter your review"
            />
            <div className="flex items-center space-x-4">
              <a href="/">
                <img
                  src={'https://www.citypng.com/public/uploads/preview/-11594731170hjmplwgley.png'}
                  alt="bellIcon"
                  className="w-8 h-8 object-contain "
                />
              </a>
              <button
                onClick={handleToggle}
                className={`px-4 py-2 rounded-full focus:outline-none ${
                  isToggled ? "bg-green-500 text-white" : "bg-gray-300 text-black"
                }`}
              >
                {isToggled ? "On" : "Off"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-start gap-2 mb-6">
          {['Types', 'Answers', 'Date'].map((option, index) => (
            <select key={index} className="p-2 rounded-full text-black text-sm">
              <option value="option1">{option}</option>
              <option value="option2">{option}</option>
              <option value="option3">{option}</option>
            </select>
          ))}
        </div>

        <div className="bg-black rounded-xl p-4 overflow-y-auto max-h-[calc(100vh-250px)]">
          <ReviewCard customerNumber={1} />
          <ReviewCard customerNumber={2} />
          <ReviewCard customerNumber={3} />
        </div>
      </div>
    </section>
  );
};

export default Reviews;