
// import axios from 'axios';
// import { useState } from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// const LinkPageModal = ({ isOpen, onClose, platform, integrated }) => {
//   const [pageLink, setPageLink] = useState('');
//   const [error, setError] = useState('');

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     console.log('pageLink:', pageLink);
//     console.log('platform.name:', platform.name);
//     console.log('integrated in child:', integrated);
  
//     try {
//       // Retrieve and parse user data
//       const user = JSON.parse(localStorage.getItem('user'));
//       const getToken = localStorage.getItem('token');
//       const token = JSON.parse(getToken)
//       console.log('token',token)
  
//       // Check if token exists before proceeding
//       if (!token) {
//         setError('Authorization token missing. Please log in.');
//         return;
//       }
  
//       console.log('user is:', user);
//       console.log('platform.name:', platform.name);
//       console.log('pageLink:', pageLink);
  
//       // API request with Authorization header
//       const response = await axios.post(
//         'http://localhost:3000/integrations',
//         {
//           platform: platform.name,
//           pageLink,
//           user,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       console.log('response:', response);
//       console.log(`Integrating ${platform.name} with link: ${pageLink}`);
      
//       onClose(); // Close modal or action
//       window.location.reload(); // Reload page after successful integration
  
//     } catch (err) {
//       const message = err.response?.data?.message || 'Failed to integrate. Please try again.';
//       setError(message); // Display error message
//       console.error('Error:', err);
//     }
//   };
  

//   return (
//     <div 
//       className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center" 
//       aria-labelledby="modal-title" 
//       aria-modal="true"
//     >
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 md:mx-0">
//         <h2 id="modal-title" className="text-xl md:text-2xl font-bold mb-4">Link your page</h2>
//         <p className="mb-4">Insert the page link of {platform.name}.</p>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={pageLink}
//             onChange={(e) => setPageLink(e.target.value)}
//             placeholder={`https://www.${platform.name.toLowerCase()}.com/your-page-link`}
//             className="w-full p-2 border rounded mb-4"
//             aria-required="true"
//           />
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-black text-white rounded-lg"
//             >
//               Integrate {platform.name}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Add prop type validation
// LinkPageModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   platform: PropTypes.shape({
//     name: PropTypes.string.isRequired
//   }).isRequired
// };

// export default LinkPageModal;



import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types'; 

const LinkPageModal = ({ isOpen, onClose, platform }) => {
  const [pageLink, setPageLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('pageLink:', pageLink);
    console.log('platform.name:', platform.name);
  
    try {
      setLoading(true); // Start loading spinner

      // Retrieve and parse user data
      const user = JSON.parse(localStorage.getItem('user'));
      const getToken = localStorage.getItem('token');
      const token = JSON.parse(getToken);
      console.log('token', token);
  
      // Check if token exists before proceeding
      if (!token) {
        setError('Authorization token missing. Please log in.');
        setLoading(false); // Stop loading spinner
        return;
      }
  
      // API request with Authorization header
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
  
      console.log('response:', response);
      console.log(`Integrating ${platform.name} with link: ${pageLink}`);
      
      onClose(); // Close modal or action
      window.location.reload(); // Reload page after successful integration
  
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to integrate. Please try again.';
      setError(message); // Display error message
      console.error('Error:', err);
    } finally {
      setLoading(false); // Stop loading spinner after request completion
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center" 
      aria-labelledby="modal-title" 
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 md:mx-0">
        <h2 id="modal-title" className="text-xl md:text-2xl font-bold mb-4">Link your page</h2>
        <p className="mb-4">Insert the page link of {platform.name}.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pageLink}
            onChange={(e) => setPageLink(e.target.value)}
            placeholder={`https://www.${platform.name.toLowerCase()}.com/your-page-link`}
            className="w-full p-2 border rounded mb-4"
            aria-required="true"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {loading ? (
            <div className="flex justify-center mb-4">
              {/* Spinner for lazy loading */}
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : null}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              disabled={loading} // Disable button while loading
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Integrating...' : `Integrate ${platform.name}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add prop type validation
LinkPageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  platform: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default LinkPageModal;
