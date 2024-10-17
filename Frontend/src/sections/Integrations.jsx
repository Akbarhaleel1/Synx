// import LinkPageModal from './components/IntegrationModal';
// import { useState, useEffect } from 'react';
// import Nav from '../components/Nav';
// import axios from 'axios'

// import useAuth from './customHooks/useAuth';
// import { useNavigate } from 'react-router-dom';


// const PlatformIcon = ({ name, color }) => {
//   useAuth()
//   const icons = {
//     'booking.com': (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
//         <path d="M20.3 7.2C18.5 5.4 16 4.5 13.3 4.5c-2.7 0-5.2 1-7 2.7s-2.7 4.3-2.7 7c0 2.7 1 5.2 2.7 7s4.3 2.7 7 2.7c2.7 0 5.2-1 7-2.7s2.7-4.3 2.7-7c0-2.7-1-5.2-2.7-7zm-7 12.3c-3.5 0-6.3-2.8-6.3-6.3s2.8-6.3 6.3-6.3 6.3 2.8 6.3 6.3-2.8 6.3-6.3 6.3z" />
//         <path d="M14.8 11.5l-1.5-1.5-1.5 1.5-1.5-1.5-1.5 1.5v3h6v-3z" />
//       </svg>
//     ),
//     'airbnb': (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
//         <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
//         <path d="M12 4.5c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6 12 6s2.5 1.1 2.5 2.5S13.4 11 12 11z" />
//       </svg>
//     ),
//    'Google': (
//    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
// <path fill="#00b67a" d="M45.023,18.995H28.991L24.039,3.737l-4.968,15.259L3.039,18.98l12.984,9.44l-4.968,15.243 l12.984-9.424l12.968,9.424L32.055,28.42L45.023,18.995z"></path><path fill="#005128" d="M33.169,31.871l-1.114-3.451l-8.016,5.819L33.169,31.871z"></path>
// </svg>
// ),
//     'agoda': (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
//         <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
//         <path d="M12 4.5c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6 12 6s2.5 1.1 2.5 2.5S13.4 11 12 11z" />
//       </svg>
//     ),
//     'trustpilot': (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
//         <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//       </svg>
//     ),
//     'tripadvisor': (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
//         <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
//         <circle cx="7.5" cy="12" r="2.5" />
//         <circle cx="16.5" cy="12" r="2.5" />
//       </svg>
//     ),
//     'makeMyTrip': (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
//         <path d="M19.4 3.9l-2-1.9C16.5 1.1 15 2 15 3.5V7H8.8C7.4 5.6 5.3 5.1 3.5 5.8c-1.2.5-2.1 1.5-2.5 2.7-.7 2.1 0 4.4 1.8 5.7.4.3.8.5 1.2.6.8.3 1.7.3 2.5 0 1.3-.4 2.3-1.4 2.7-2.7.1-.3.1-.6.2-.9H15v3.5c0 1.5 1.5 2.4 2.4 1.5l2-1.9c.5-.5.8-1.2.8-1.8V5.7c0-.7-.3-1.3-.8-1.8zM9 12c0 1.7-1.3 3-3 3S3 13.7 3 12s1.3-3 3-3 3 1.3 3 3z" />
//       </svg>
//     ),
//     'goibibo': (
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
//         <path d="M3 20.5v-17c0-.8.8-1.3 1.5-1l13 8.5c.7.4.7 1.4 0 1.8l-13 8.5c-.7.5-1.5 0-1.5-.8z" />
//       </svg>
//     ),
//   };

//   return icons[name] || null;
// };


// const Modal = ({ isOpen, onClose, platform, }) => {
//   if (!isOpen) return null;
//   const user = localStorage.getItem('user');
//   const getToken = localStorage.getItem('token');
//   const token = JSON.parse(getToken)

//   console.log('token isss', token)
//   if (!token) {
//     setError('Authorization token missing. Please log in.');
//     return;
//   }

//   const onDelete = async () => {
//     console.log('this is what is send', platform)
//     const result = await axios.post('https://synxbackend.synxautomate.com/deleteLink', { user, platform: platform.name }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     });
//     console.log('result', result)
//     if (result.status === 200) {
//       window.location.reload();
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
//         <h2 className="text-2xl font-bold mb-4">Edit {platform.name}</h2>
//         <a href="#" className="block mb-2">
//           <p className="text-gray-700">Integration details for {platform.name}</p>
//         </a>
//         <div className="mt-6 flex gap-4 justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//           >
//             Close
//           </button>
//           <button
//             onClick={onDelete}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const IntegrationCard = ({ platform, onEdit, onIntegrate, integrated }) => {
//   const isPlatformIntegrated = integrated.some(
//     (item) => item.platform === platform.name
//   );

//   return (
//     <div className="bg-white border rounded-lg p-4 shadow-md text-center">
//       <div className="flex justify-end">
//         {isPlatformIntegrated && (
//           <span className="text-green-500 text-lg">✔</span>
//         )}
//       </div>
//       <div className="my-4 flex justify-center items-center">
//         <PlatformIcon name={platform.name} color={platform.color} />
//       </div>
//       <h3 className="text-lg font-semibold">{platform.name}</h3>
//       <button
//         onClick={() => isPlatformIntegrated ? onEdit(platform) : onIntegrate(platform)}
//         className={`mt-4 w-full py-2 rounded-lg ${isPlatformIntegrated
//             ? 'bg-black text-white'
//             : 'bg-gray-200 text-gray-600'
//           }`}
//       >
//         {isPlatformIntegrated ? 'Edit' : 'Integrate'}
//       </button>
//     </div>
//   );
// }


import LinkPageModal from './components/IntegrationModal';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios'

import useAuth from './customHooks/useAuth';
import { useNavigate } from 'react-router-dom';

const PlatformIcon = ({ name, color }) => {
  useAuth()
  const icons = {
    'booking.com': 'https://cdnl.iconscout.com/lottie/premium/thumb/bookingcom-logo-animation-download-in-lottie-json-gif-static-svg-file-formats--booking-hotel-host-real-state-rent-social-media-logos-pack-animations-7945746.gif',
    'airbnb': 'https://cdnl.iconscout.com/lottie/premium/thumb/airbnb-logo-animation-download-in-lottie-json-gif-static-svg-file-formats--apps-social-media-pack-logos-animations-4366891.gif',
    'google': 'https://cdnl.iconscout.com/lottie/premium/thumb/google-logo-animation-download-in-lottie-json-gif-static-svg-file-formats--social-media-company-pack-logos-animations-7825489.gif',
    'agoda': 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjlobGRvbm1reTd5YmQ4NXc4OXY5MnV4aTg0d2tnMjdmbXY3MW1rdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/2MZJ5wvSB8b5aKJD4a/giphy.gif',
    'trustpilot': 'https://media1.giphy.com/media/jhVbcQnNyIqI69lTtB/giphy.gif?cid=ecf05e47liyfk9ya6ybeg1d6gsi90zco1lg31yr8u2w9647d&ep=v1_stickers_search&rid=giphy.gif&ct=s',
    'tripadvisor': 'https://cdnl.iconscout.com/lottie/premium/thumb/tripadvisor-logo-animation-download-in-lottie-json-gif-static-svg-file-formats--brand-social-media-identity-pack-logos-animations-8794850.gif',
    'makeMyTrip': 'https://cdn.brandfetch.io/idC6eY3m41/w/336/h/336/theme/dark/icon.jpeg?k=id64Mup7ac&t=1667562511574',
    'goibibo': 'https://i.postimg.cc/76tFRR8H/1-USldg-A6yr-XVAa-VHgh-Ls-Uz-A.png',
  };

  return icons[name] ? (
    // <img src={icons[name]} alt={`${name} icon`} className="w-15 h-15" />
    <img src={icons[name]} alt={`${name} icon`} className="w-[5rem] h-[5rem]" />
  ) : null;
};

const Modal = ({ isOpen, onClose, platform, }) => {
  if (!isOpen) return null;
  const user = localStorage.getItem('user');
  const getToken = localStorage.getItem('token');
  const token = JSON.parse(getToken)

  console.log('token isss', token)
  if (!token) {
    setError('Authorization token missing. Please log in.');
    return;
  }

  const onDelete = async () => {
    console.log('this is what is send', platform)
    const result = await axios.post('https://synxbackend.synxautomate.com/deleteLink', { user, platform: platform.name }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log('result', result)
    if (result.status === 200) {
      window.location.reload();
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Edit {platform.name}</h2>
        <a href="#" className="block mb-2">
          <p className="text-gray-700">Integration details for {platform.name}</p>
        </a>
        <div className="mt-6 flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Close
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const IntegrationCard = ({ platform, onEdit, onIntegrate, integrated }) => {
  const isPlatformIntegrated = integrated.some(
    (item) => item.platform === platform.name
  );

  return (
    <div className="bg-white border rounded-lg p-4 shadow-md text-center">
      <div className="flex justify-end">
        {isPlatformIntegrated && (
          <span className="text-green-500 text-lg">✔</span>
        )}
      </div>
      <div className="my-4 flex justify-center items-center">
        <PlatformIcon name={platform.name} color={platform.color} />
      </div>
      <h3 className="text-lg font-semibold">{platform.name}</h3>
      <button
        onClick={() => isPlatformIntegrated ? onEdit(platform) : onIntegrate(platform)}
        className={`mt-4 w-full py-2 rounded-lg ${isPlatformIntegrated
            ? 'bg-black text-white'
            : 'bg-gray-200 text-gray-600'
          }`}
      >
        {isPlatformIntegrated ? 'Edit' : 'Integrate'}
      </button>
    </div>
  );
}


const Integrations = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState(null);
  const [integrated, setIntegrated] = useState([]);

  const navigate = useNavigate()

  const platforms = [
    { name: 'trustpilot', integrated: false, color: '#00B67A' },
    { name: 'booking.com', integrated: true, color: '#003580' },
    { name: 'airbnb', integrated: true, color: '#FF5A5F' },
    { name: 'google', integrated: false, color: '#1877F2' },
    { name: 'agoda', integrated: false, color: '#4285F4' },
    { name: 'tripadvisor', integrated: false, color: '#00AA6C' },
    { name: 'makeMyTrip', integrated: false, color: '#34A853' },
    { name: 'goibibo', integrated: false, color: '#3DDC84' },
  ];

  const user = localStorage.getItem('user')

  console.log('user is', user)

  useEffect(() => {
    const fetchIntegrations = async () => {
      const getToken = localStorage.getItem('token');
      const token = JSON.parse(getToken)
      try {
        // const result = await axios.post('https://synxbackend.synxautomate.com/integratepage', { user }, {
        const result = await axios.post('https://synxbackend.synxautomate.com/integratepage', { user }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if(result.data.trailover){
          navigate('/PricingTable');
          return
        }
        console.log('result.data.message',result.data.message)

        setIntegrated(result.data.reviewLink)
        console.log('result', result.data);
      } catch (error) {
        console.error("Error fetching integrations:", error);
      }
    }
    fetchIntegrations();
  }, []);



  const handleEditClick = (platform) => {
    setCurrentPlatform(platform);
    setEditModalOpen(true);
  };

  const handleIntegrateClick = (platform) => {
    console.log('platform', platform);
    console.log('integrated', integrated);
    setCurrentPlatform(platform);
    setLinkModalOpen(true);
  };

  const handleCloseModals = async () => {
    setEditModalOpen(false);
    setLinkModalOpen(false);
    setCurrentPlatform(null);
  };

  const integratedPlatforms = platforms.filter((p) => p.integrated).length;

  return (
    <div className="flex">
      <Nav />
      <div className="flex-grow lg:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Integrations</h1>
          <p className="text-gray-600 mb-6">
            Integrate the platforms where you receive or want to receive reviews.
            Connect with Google and Google directly via login, so you can reply to
            reviews from the Public reviews section. For the other platforms, simply
            enter your page link to import reviews. We do not import all the reviews
            but the most recent ones.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded-lg w-full sm:w-1/3 mb-4 sm:mb-0"
            />
            <span className="text-gray-600">
              Platforms Integrated: {integrated.length} / {platforms.length}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {platforms.map((platform) => (
              <IntegrationCard
                key={platform.name}
                platform={platform}
                onEdit={handleEditClick}
                onIntegrate={handleIntegrateClick}
                integrated={integrated}
              />
            ))}
          </div>

        </div>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        platform={currentPlatform}
      />
      <LinkPageModal
        isOpen={isLinkModalOpen}
        onClose={handleCloseModals}
        platform={currentPlatform}
        integrated={integrated}

      />
    </div>
  );
};

export default Integrations;
