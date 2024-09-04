// import React, { useState } from 'react';

// const LinkPageModal = ({ isOpen, onClose, platform }) => {
//   const [pageLink, setPageLink] = useState('');

//   if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the pageLink to your backend
//     console.log(`Integrating ${platform.name} with link: ${pageLink}`);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
//         <h2 className="text-2xl font-bold mb-4">Link your page</h2>
//         <p className="mb-4">Insert the page link of {platform.name}.</p>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={pageLink}
//             onChange={(e) => setPageLink(e.target.value)}
//             placeholder={`https://www.${platform.name.toLowerCase()}.com/your-page-link`}
//             className="w-full p-2 border rounded mb-4"
//           />
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

// export default LinkPageModal;
import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const LinkPageModal = ({ isOpen, onClose, platform }) => {
  const [pageLink, setPageLink] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3479/integrations', {
        platform: platform.name,
        pageLink
      });
      console.log(`Integrating ${platform.name} with link: ${pageLink}`);
      onClose();
    } catch (err) {
      setError('Failed to integrate. Please try again.');
      console.error(err);
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
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              Integrate {platform.name}
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
