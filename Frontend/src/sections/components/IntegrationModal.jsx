import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

const LinkPageModal = ({ isOpen, onClose, platform }) => {
  const [pageLink, setPageLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const token = JSON.parse(localStorage.getItem('token'));

      if (!token) {
        setError('Authorization token missing. Please log in.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'https://synxbackend.synxautomate.com/integrations',
        {
          platform: platform.name,
          pageLink,
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();
      window.location.reload();

    } catch (err) {
      const message = err.response?.data?.message || 'Failed to integrate. Please try again.';
      setError(message);
      setTimeout(() => setError(''), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          &#10005;
        </button>

        {/* Modal Title */}
        <h2 id="modal-title" className="text-2xl font-bold mb-4 text-center">
          Link Your {platform.name} Page
        </h2>

        {/* Instructions */}
        <p className="mb-4">Please follow the steps below to link your page:</p>
        <ul className="list-disc list-inside mb-4">
          {/* Placeholder for specific instructions based on the platform */}
          {platform.name === 'booking.com' && (
            <>
              <li>Visit Booking.com in your browser.</li>
              <li>Navigate to Your Property Page.</li>
              <li>Tap 'Read All Reviews' and copy the URL.</li>
              <li>Paste the URL into the input box below.</li>
              <li>Click the "Integrate" button.</li>
            </>
          )}
          {platform.name === 'google' && (
            <>
              <li>Search for the <strong>Google Place ID Tool</strong> on Google or visit the official tool.</li>
              <li className='text-blue'><a href="https://developers.google.com/maps/documentation/places/web-service/place-id">Google Place ID Tool</a></li>
              <li>Search for your business, select it, and copy the Place ID.</li>
              <li>Paste the Place ID into the input box below.</li>
              <li>Click the "Integrate" button.</li>
            </>
          )}
          {platform.name === 'trustpilot' && (
            <>
              <li>Visit <strong>Trustpilot.com</strong>: Open Trustpilot in your web browser.</li>
              <li>Search for Your Business: Use the search bar at the top to find your business by name.</li>
              <li>Open Your Review Page: Click on your business listing to navigate to your Trustpilot review page.</li>
              <li>Copy the URL: Highlight the URL from the address bar, right-click, and select "Copy."</li>
              <li>Paste the URL: Go to the input box below where you need to paste the URL, and right-click to select "Paste," or press Ctrl + V (Windows) or Cmd + V (Mac).</li>
              <li>Submit the Link: Use the copied link to integrate it into your platform or application as needed.</li>
            </>
          )}
          {platform.name === 'airbnb' && (
            <>
              <li>Visit <strong>Airbnb.com</strong>: Open Airbnb in your browser.</li>
              <li>Log In and Navigate to Your Listing: Log in to your Airbnb account and go to your listed property page.</li>
              <li>Click on 'Read All Reviews': Scroll down to the review section and click on the "Read All Reviews" link to view all reviews.</li>
              <li>Copy the URL: Once the reviews are loaded, go to the address bar, highlight the URL, right-click, and select "Copy."</li>
              <li>Paste the URL: Go to the input box where you're asked to paste the URL, and right-click to select "Paste," or press Ctrl + V (Windows) or Cmd + V (Mac).</li>
              <li>Click the 'Integrate' Button: After pasting the URL, click the "Integrate" button to complete the process.</li>
            </>
          )}

          {platform.name === 'agoda' && (
            <>
              <li>Visit <strong>Agoda.com</strong>: Open Agoda in your browser.</li>
              <li>Log In and Navigate to Your Listing: Log in to your Agoda account and go to your property listing page.</li>
              <li>Copy the URL: Once on your listing page, highlight the full URL from the address bar, right-click, and select "Copy."</li>
              <li>Paste the URL: Go to the input box where you need to paste the URL, and right-click to select "Paste," or press Ctrl + V (Windows) or Cmd + V (Mac).</li>
              <li>Click the 'Integrate' Button: After pasting the URL, click the "Integrate" button to finalize the process.</li>
            </>
          )}

          {platform.name === 'tripAdvisor' && (
            <>
              <li>Visit <strong>TripAdvisor.com</strong>: Open TripAdvisor in your browser.</li>
              <li>Search for Your Hotel: Use the search bar to find your hotel by name and go to its listing page.</li>
              <li>Copy the URL: Once you're on your hotel's listing page, highlight the URL from the address bar, right-click, and select "Copy."</li>
              <li>Paste the URL: Go to the input box where you're asked to paste the URL, right-click, and select "Paste," or press Ctrl + V (Windows) or Cmd + V (Mac).</li>
              <li>Click the 'Integrate' Button: After pasting the URL, click the "Integrate" button to finish the process.</li>
            </>
          )}

          {platform.name === 'goibibo' && (
            <>
              <li>Visit <strong>Goibibo.com</strong>: Open Goibibo in your browser.</li>
              <li>Search for Your Hotel: Use the search bar to find your hotel by name and navigate to its listing page.</li>
              <li>Copy the URL: Once you're on your hotel’s listing page, highlight the URL in the address bar, right-click, and select "Copy."</li>
              <li>Paste the URL: Go to the input box where you need to paste the URL, and right-click to select "Paste," or press Ctrl + V (Windows) or Cmd + V (Mac).</li>
              <li>Click the 'Integrate' Button: After pasting the URL, click the "Integrate" button to complete the process.</li>
            </>
          )}

          {platform.name === 'makeMyTrip' && (
            <>
              <li>Visit <strong>MakeMyTrip.com</strong>: Open MakeMyTrip in your browser.</li>
              <li>Search for Your Hotel: Use the search bar to find your hotel by name and navigate to its listing page.</li>
              <li>Copy the URL: Once you're on your hotel’s listing page, highlight the URL in the address bar, right-click, and select "Copy."</li>
              <li>Paste the URL: Go to the input box where you need to paste the URL, and right-click to select "Paste," or press Ctrl + V (Windows) or Cmd + V (Mac).</li>
              <li>Click the 'Integrate' Button: After pasting the URL, click the "Integrate" button to complete the process.</li>
            </>
          )}


        </ul>

        {/* Read More Section */}
        {!showMore && (
          <button
            className="text-blue-600 underline mb-4"
            onClick={() => setShowMore(true)}
          >
            Read More
          </button>
        )}
        {showMore && (
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p className="mb-2">
              To find the required details:
            </p>
            <ol className="list-decimal list-inside mb-4">
              <li>Follow platform-specific instructions provided.</li>
              <li>Paste the required ID/URL in the input box below.</li>
            </ol>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pageLink}
            onChange={(e) => setPageLink(e.target.value)}
            placeholder={`https://www.${platform.name.toLowerCase()}.com/your-page-link`}
            className="w-full p-2 border rounded mb-4"
            aria-required="true"
          />

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? 'Integrating...' : `Integrate ${platform.name}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation
LinkPageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  platform: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LinkPageModal;
