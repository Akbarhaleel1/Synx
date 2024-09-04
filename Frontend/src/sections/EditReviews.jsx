import Nav from "../components/Nav";

const EditReviews = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-[rgb(241,241,241)] min-h-screen text-white">
      <Nav />
      <main className="flex-1 p-4 lg:p-10 lg:ml-64"> {/* Adjusted for larger Nav width */}
        <h2 className="text-black text-2xl font-bold mb-4">Edit your review link</h2>
        <p className="text-black mb-8">This is the link your customers will visit to leave you a review. Customise the page by changing requests and the image. If only a review page is present, the user will be redirected directly to the review site without going through the "Positive Experience" page.</p>
        
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 bg-gray-950 rounded-lg p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Edit Review Link URL</label>
              <div className="flex items-center bg-gray-900 rounded">
                <input type="text" placeholder="https://www.synx.review" className="bg-transparent flex-1 py-2 px-4 outline-none" />
                <button className="p-2"><i className="fas fa-pencil-alt text-gray-400"></i></button>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Edit the link preview title</label>
              <div className="flex items-center bg-gray-700 rounded">
                <input type="text" placeholder="Do you want leave us a review?" className="bg-transparent flex-1 py-2 px-4 outline-none" />
                <button className="p-2"><i className="fas fa-pencil-alt text-gray-400"></i></button>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Choose the initial page</label>
              <div className="flex items-center bg-gray-700 rounded">
                <input type="text" placeholder="Star filter enabled" className="bg-transparent flex-1 py-2 px-4 outline-none" />
                <button className="p-2"><i className="fas fa-pencil-alt text-gray-400"></i></button>
              </div>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button className="bg-gray-700 px-4 py-2 rounded">Visit the Link</button>
              <button className="bg-gray-700 px-4 py-2 rounded">Desktop Image</button>
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
              <h3 className="text-2xl font-bold mb-2">How was experience with hot dain castle?</h3>
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fas fa-star text-3xl"></i>
                ))}
              </div>
              <button className="p-2"><i className="fas fa-pencil-alt text-gray-400"></i></button>
              <p className="text-sm text-gray-400 mt-4">Powered By Synx+</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditReviews;