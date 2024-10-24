
import useAuth from './customHooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from "../components/Nav";

const EditReviews = () => {
  const [endpoint, setEndpoint] = useState('');
  const [linkTitle, setLinkTitle] = useState('Do you want to leave us a review?');
  const [initialPage, setInitialPage] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [integratedPage, setIntegratedPage] = useState([]);

  useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  useEffect(() => {
    console.log('useEffe4ct is wokring')
    const fetchEndPoint = async () => {
      console.log('fetchEndPoint is wokring')
      const getUser = localStorage.getItem('user');
      const user = JSON.parse(getUser);
      console.log('user is wokring', user)
      const getToken = localStorage.getItem('token')
      const token = JSON.parse(getToken)

      const responce = await axios.post('https://synxbackend.synxautomate.com/editLinkEndpoint', { user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(responce.data.trailover){
        navigate('/PricingTable');
        return
      }
      console.log('respoince', responce.data)
      const endPoint = responce.data.link.endpoint;
      localStorage.setItem('endpoint',endPoint)
      const title = responce.data.link.title;
      console.log('endPoint', endPoint)
      console.log('title', title)
      setLinkTitle(title)
      setEndpoint(endPoint)
      setIntegratedPage(responce.data.integratedpage);
    }
    fetchEndPoint()
  }, [])

  const confirmChanges = async () => {
    const data = {
      endpoint,
      linkTitle,
      initialPage
    };
    console.log('data is', data)

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const parsedToken = localStorage.getItem('token');
      const token = JSON.parse(parsedToken)

      const response = await axios.post('https://synxbackend.synxautomate.com/editReview', { data, user }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        console.log('Data successfully sent to the backend', response.data.endpoint);
        setEndpoint(response.data.endpoint)
        window.location.reload();
      } else {
        console.error('Error sending data to the backend');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setShowConfirmModal(false);
  };

  // const handleVisitLink = () => {
  //   navigate(`/HotelReview?endpoint=${encodeURIComponent(endpoint)}$tab=text`);
  // };
  const handleVisitLink = () => {
    window.open(`https://review.synxautomate.com/feedback?=l${encodeURIComponent(endpoint)}&tab=text}`, '_blank');
    // navigate(`/HotelReview?endpoint=${encodeURIComponent(endpoint)}&tab=text`);
  };

  const handleStarClick = (rating) => {
    setStarRating(rating);
    if (rating <= 3) {
      navigate('/userReview');
    } else {
      alert('Thank you for your positive feedback!');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[rgb(241,241,241)] min-h-screen text-white">
      <Nav />
      <main className="flex-1 p-4 lg:p-10 lg:ml-64">
        <h2 className="text-black text-2xl font-bold mb-4">Edit your review link</h2>
        <p className="text-black mb-8">This is the link your customers will visit to leave you a review. You can customize the review page by changing the requests or prompts that customers see. If only a review page is present, customers will be redirected directly to the review site without going through the 'Positive Experience' page.</p>

        <form className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0" onSubmit={handleSubmit}>
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
                  type="button"
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
                <button type="button" className="p-2">
                  <i className="fas fa-pencil-alt text-gray-400"></i>
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">....................................................................................................................................................................</label>

              {/* <div>

                <h1 className='font-bold'>Select One Platform for Star Filter</h1>
    
                <div className="flex items-center bg-gray-700 rounded">
                  <select
                    value={initialPage}
                    onChange={(e) => {
                      console.log('eee', e.target.value)
                      const selectedPlatform = integratedPage.find(page => page.link === e.target.value);
                      console.log('selectedPlatform is', selectedPlatform.link)
                      setInitialPage(selectedPlatform.link);

                    }}
                    className="bg-black flex-1 py-2 px-4 outline-none text-white placeholder-gray-400"
                  >
                    {integratedPage.map((page) => (
                      <option key={page._id} value={page.link}>
                        {page.platform}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-600 rounded"
                    aria-label="Edit"
                  >
                    <i className="fas fa-pencil-alt text-gray-400"></i>
                  </button>
                </div>
              </div> */}
            </div>
            {/* <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button onClick={handleVisitLink} type="button" className="bg-gray-700 px-4 py-2 rounded">Visit the Link</button>
              <button
                type="submit"
                className="bg-gray-700 px-4 py-2 rounded"
              >
                Add Changes
              </button>
            </div> */}
             <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
      <button onClick={handleVisitLink} type="button" className="bg-gray-700 px-4 py-2 rounded">
        Visit the Link
      </button>
      <button type="submit" className="bg-gray-700 px-4 py-2 rounded">
        Add Changes
      </button>
    </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 bg-gray-950 rounded-lg p-6">
            {/* <div className="flex justify-between items-center mb-6">
              <button className="bg-gray-700 px-4 py-2 rounded flex items-center">
                <i className="fas fa-bars mr-2"></i> Edit
              </button>
            </div> */}
            <div className="text-center">
              <i className="fas fa-store text-6xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">{linkTitle}</h3>
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={`text-3xl ${star <= starRating ? 'text-yellow-400' : 'text-gray-400'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-4">Click on a star to rate</p>
              <p className="text-sm text-gray-400 mt-4">Powered By Synx+</p>
            </div>
          </div>
        </form>

        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-black">Confirm Changes</h2>
              <p className="mb-4 text-black">Are you sure you want to apply these changes to your review link?</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmChanges}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditReviews;