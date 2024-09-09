import { useState } from 'react';
import axios from 'axios'

const NegativeReview = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    review: '',
    consent: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    const result = await axios.post('https://review.synxautomate.com/review',{formData})
    console.log('result',result)
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="md:w-1/2 p-8 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 mb-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 40 H80 V90 H20 Z" stroke="black" strokeWidth="4" />
            <path d="M10 40 Q50 10 90 40" fill="black" />
          </svg>

          <p className="text-gray-600 mb-6 text-sm">
            We want our customers to be 100% satisfied. Please let us know why you had a
            bad experience, so we can improve our service. Leave your email to be contacted.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex space-x-4">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone with area code"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
            </div>
            <textarea
              name="review"
              placeholder="Review"
              value={formData.review}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded h-32"
            ></textarea>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm text-gray-600">
                I consent to the processing of personal data.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition duration-300"
            >
              Send
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Leave a public review
          </p>
        </div>
      </div>
      <div className="md:w-1/2 bg-gray-100 hidden md:block">
        <img 
          src="https://wallpaperaccess.com/full/2484157.jpg" 
          alt="Person working on laptop" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NegativeReview;
