import LinkPageModal from './components/IntegrationModal';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios'

import useAuth from './customHooks/useAuth';
import { useNavigate } from 'react-router-dom';


const PlatformIcon = ({ name, color }) => {
  useAuth()
  const icons = {
    'booking.com': (
      <svg clip-rule="evenodd" fill-rule="evenodd" height="2445" stroke-linejoin="round" stroke-miterlimit="1.414" viewBox="-.092 .015 2732.125 2671.996" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m2732.032 513.03c0-283.141-229.978-513.015-513.118-513.015h-1705.89c-283.138 0-513.116 229.874-513.116 513.015v1645.965c0 283.066 229.978 513.016 513.118 513.016h1705.889c283.14 0 513.118-229.95 513.118-513.016z" fill="#0c3b7c"/><path d="m.001 1659.991h1364.531v1012.019h-1364.53z" fill="#0c3b7c"/><g fill-rule="nonzero"><path d="m1241.6 1768.638-220.052-.22v-263.12c0-56.22 21.808-85.48 69.917-92.165h150.136c107.068 0 176.328 67.507 176.328 176.766 0 112.219-67.507 178.63-176.328 178.739zm-220.052-709.694v-69.26c0-60.602 25.643-89.424 81.862-93.15h112.657c96.547 0 154.41 57.753 154.41 154.52 0 73.643-39.671 159.67-150.903 159.67h-198.026zm501.037 262.574-39.78-22.356 34.74-29.699c40.437-34.74 108.163-112.876 108.163-247.67 0-206.464-160.109-339.614-407.888-339.614h-282.738v-.11h-32.219c-73.424 2.74-132.273 62.466-133.04 136.329v1171.499h453.586c275.396 0 453.148-149.917 453.148-382.135 0-125.04-57.424-231.889-153.972-286.244" fill="#fff"/><path d="m1794.688 1828.066c0-89.492 72.178-161.894 161.107-161.894 89.154 0 161.669 72.402 161.669 161.894 0 89.379-72.515 161.894-161.67 161.894-88.928 0-161.106-72.515-161.106-161.894" fill="#00bafc"/></g></svg>
    ),
    'airbnb': (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
      <g fill="#f04229" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M42.459,32.519c-1.037,-3.336 -9.539,-19.596 -12.12,-24.5l-0.026,-0.048c-1.16,-2.412 -3.637,-3.971 -6.313,-3.971c-2.676,0 -5.153,1.559 -6.291,3.929l-0.048,0.091c-2.581,4.903 -11.083,21.163 -12.119,24.498c-0.281,0.903 -0.542,1.889 -0.542,2.982c0,4.687 3.813,8.5 8.5,8.5c4.654,0 7.612,-1.949 10.5,-5.184c2.888,3.235 5.846,5.184 10.5,5.184c4.687,0 8.5,-3.813 8.5,-8.5c0,-1.093 -0.261,-2.079 -0.541,-2.981zM23.999,34.662c-1.669,-2.147 -3.999,-5.781 -3.999,-8.662c0,-2.206 1.794,-4 4,-4c2.206,0 4,1.794 4,4c0,2.872 -2.332,6.511 -4.001,8.662zM34.5,41c-3.287,0 -5.521,-1.107 -8.325,-4.258c1.703,-2.146 4.825,-6.638 4.825,-10.742c0,-3.86 -3.141,-7 -7,-7c-3.859,0 -7,3.14 -7,7c0,4.104 3.122,8.596 4.825,10.742c-2.804,3.151 -5.038,4.258 -8.325,4.258c-3.032,0 -5.5,-2.467 -5.5,-5.5c0,-0.653 0.162,-1.308 0.406,-2.09c0.764,-2.46 6.894,-14.462 11.91,-23.993l0.076,-0.146c0.663,-1.38 2.079,-2.271 3.608,-2.271c1.529,0 2.945,0.891 3.615,2.285l0.068,0.132c5.017,9.531 11.147,21.533 11.912,23.994c0.243,0.781 0.405,1.436 0.405,2.089c0,3.033 -2.468,5.5 -5.5,5.5z"></path></g></g>
      </svg>
    ),
   'Google': (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
    <path fill="#00b67a" d="M45.023,18.995H28.991L24.039,3.737l-4.968,15.259L3.039,18.98l12.984,9.44l-4.968,15.243 l12.984-9.424l12.968,9.424L32.055,28.42L45.023,18.995z"></path><path fill="#005128" d="M33.169,31.871l-1.114-3.451l-8.016,5.819L33.169,31.871z"></path>
    </svg>
),
    'agoda': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
        <path d="M12 4.5c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6 12 6s2.5 1.1 2.5 2.5S13.4 11 12 11z" />
      </svg>
    ),
    'trustpilot': (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
      <path fill="#00b67a" d="M45.023,18.995H28.991L24.039,3.737l-4.968,15.259L3.039,18.98l12.984,9.44l-4.968,15.243 l12.984-9.424l12.968,9.424L32.055,28.42L45.023,18.995z"></path><path fill="#005128" d="M33.169,31.871l-1.114-3.451l-8.016,5.819L33.169,31.871z"></path>
      </svg>
    ),
    'tripadvisor': (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M 25 11 C 19.167969 11 13.84375 12.511719 9.789063 15 L 2 15 C 2 15 3.753906 17.152344 4.578125 19.578125 C 2.96875 21.621094 2 24.195313 2 27 C 2 33.628906 7.371094 39 14 39 C 17.496094 39 20.636719 37.492188 22.828125 35.105469 L 25 38 L 27.171875 35.105469 C 29.363281 37.492188 32.503906 39 36 39 C 42.628906 39 48 33.628906 48 27 C 48 24.195313 47.03125 21.621094 45.421875 19.578125 C 46.246094 17.152344 48 15 48 15 L 40.203125 15 C 36.148438 12.511719 30.828125 11 25 11 Z M 25 13 C 28.882813 13 32.585938 13.707031 35.800781 15.011719 C 30.964844 15.089844 26.824219 18.027344 25 22.214844 C 23.171875 18.019531 19.023438 15.078125 14.171875 15.011719 L 14.242188 14.988281 C 17.453125 13.699219 21.144531 13 25 13 Z M 14 17 C 19.523438 17 24 21.476563 24 27 C 24 32.523438 19.523438 37 14 37 C 8.476563 37 4 32.523438 4 27 C 4 21.476563 8.476563 17 14 17 Z M 36 17 C 41.523438 17 46 21.476563 46 27 C 46 32.523438 41.523438 37 36 37 C 30.476563 37 26 32.523438 26 27 C 26 21.476563 30.476563 17 36 17 Z M 14 21 C 10.6875 21 8 23.6875 8 27 C 8 30.3125 10.6875 33 14 33 C 17.3125 33 20 30.3125 20 27 C 20 23.6875 17.3125 21 14 21 Z M 36 21 C 32.6875 21 30 23.6875 30 27 C 30 30.3125 32.6875 33 36 33 C 39.3125 33 42 30.3125 42 27 C 42 23.6875 39.3125 21 36 21 Z M 14 23 C 16.210938 23 18 24.789063 18 27 C 18 29.210938 16.210938 31 14 31 C 11.789063 31 10 29.210938 10 27 C 10 24.789063 11.789063 23 14 23 Z M 36 23 C 38.210938 23 40 24.789063 40 27 C 40 29.210938 38.210938 31 36 31 C 33.789063 31 32 29.210938 32 27 C 32 24.789063 33.789063 23 36 23 Z M 14 25 C 12.894531 25 12 25.894531 12 27 C 12 28.105469 12.894531 29 14 29 C 15.105469 29 16 28.105469 16 27 C 16 25.894531 15.105469 25 14 25 Z M 36 25 C 34.894531 25 34 25.894531 34 27 C 34 28.105469 34.894531 29 36 29 C 37.105469 29 38 28.105469 38 27 C 38 25.894531 37.105469 25 36 25 Z"></path>
</svg>
    ),
    'makeMyTrip': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M19.4 3.9l-2-1.9C16.5 1.1 15 2 15 3.5V7H8.8C7.4 5.6 5.3 5.1 3.5 5.8c-1.2.5-2.1 1.5-2.5 2.7-.7 2.1 0 4.4 1.8 5.7.4.3.8.5 1.2.6.8.3 1.7.3 2.5 0 1.3-.4 2.3-1.4 2.7-2.7.1-.3.1-.6.2-.9H15v3.5c0 1.5 1.5 2.4 2.4 1.5l2-1.9c.5-.5.8-1.2.8-1.8V5.7c0-.7-.3-1.3-.8-1.8zM9 12c0 1.7-1.3 3-3 3S3 13.7 3 12s1.3-3 3-3 3 1.3 3 3z" />
      </svg>
    ),
    'goibibo': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M3 20.5v-17c0-.8.8-1.3 1.5-1l13 8.5c.7.4.7 1.4 0 1.8l-13 8.5c-.7.5-1.5 0-1.5-.8z" />
      </svg>
    ),
  };

  return icons[name] || null;
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

        if(result.data.message === "Not Found"){
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
