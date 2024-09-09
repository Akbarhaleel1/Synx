


import { useState } from 'react';
import axios from 'axios';
import Nav from "../components/Nav";

const EditReviews = () => {
  const [endpoint, setEndpoint] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [initialPage, setInitialPage] = useState('enabled');

  const handleSubmit = async () => {
    const data = {
      endpoint,
      linkTitle,
      initialPage
    };

    console.log('data',data)

    try {
      const user = JSON.parse(localStorage.getItem('user')); // Corrected localStorage retrieval
      const response = await axios.post('https://review.synxautomate.com/editReview', { data, user });

      if (response.status === 200) {
        // Handle successful submission
        console.log('Data successfully sent to the backend');
      } else {
        // Handle errors
        console.error('Error sending data to the backend');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[rgb(241,241,241)] min-h-screen text-white">
      <Nav />
      <main className="flex-1 p-4 lg:p-10 lg:ml-64"> {/* Adjusted for larger Nav width */}
        <h2 className="text-black text-2xl font-bold mb-4">Edit your review link</h2>
        <p className="text-black mb-8">This is the link your customers will visit to leave you a review. Customize the page by changing requests and the image. If only a review page is present, the user will be redirected directly to the review site without going through the "Positive Experience" page.</p>
        
        <form className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 bg-gray-950 rounded-lg p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Edit Review Link URL</label>
              <div className="flex items-center bg-gray-900 rounded">
                <input
                  type="text"
                  value="https://www.synx.review"
                  className="bg-transparent flex-1 py-2 px-4 outline-none"
                  disabled
                />
                <input
                  type="text"
                  placeholder="Add endpoint"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="bg-transparent flex-1 py-2 px-4 outline-none border-l border-gray-700"
                />
                <button
                  className="p-2 hover:bg-gray-600 rounded"
                  aria-label="Edit"
                >
                  <i className="fas fa-pencil-alt text-gray-400"></i>
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Edit the link preview title</label>
              <div className="flex items-center bg-gray-700 rounded">
                <input
                  type="text"
                  placeholder="Do you want to leave us a review?"
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  className="bg-transparent flex-1 py-2 px-4 outline-none"
                />
                <button className="p-2"><i className="fas fa-pencil-alt text-gray-400"></i></button>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Choose the initial page</label>
              <div className="flex items-center bg-gray-700 rounded">
                <select
                  value={initialPage}
                  onChange={(e) => setInitialPage(e.target.value)}
                  className="bg-black flex-1 py-2 px-4 outline-none text-white placeholder-gray-400"
                >
                  <option value="enabled">Start filter enabled</option>
                  <option value="disabled">Start filter disabled</option>
                </select>
                <button
                  className="p-2 hover:bg-gray-600 rounded"
                  aria-label="Edit"
                >
                  <i className="fas fa-pencil-alt text-gray-400"></i>
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button type="button" className="bg-gray-700 px-4 py-2 rounded">Visit the Link</button>
              <button
                type="button"
                className="bg-gray-700 px-4 py-2 rounded"
                onClick={handleSubmit} // Attach handleSubmit to button click
              >
                Add Changes
              </button>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="w-full lg:w-1/2 bg-gray-950 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <button className="bg-gray-700 px-4 py-2 rounded flex items-center">
                <i className="fas fa-bars mr-2"></i> Edit
              </button>
            </div>
            <div className="text-center">
              <i className="fas fa-store text-6xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">How was your experience with hot dain castle?</h3>
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fas fa-star text-3xl"></i>
                ))}
              </div>
              <button className="p-2"><i className="fas fa-pencil-alt text-gray-400"></i></button>
              <p className="text-sm text-gray-400 mt-4">Powered By Synx+</p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditReviews;
