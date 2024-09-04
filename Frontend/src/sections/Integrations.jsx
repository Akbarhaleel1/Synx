


import LinkPageModal from './components/IntegrationModal';
import React, { useState } from 'react';
import Nav from '../components/Nav';

const PlatformIcon = ({ name, color }) => {
  const icons = {
    'Booking.com': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M20.3 7.2C18.5 5.4 16 4.5 13.3 4.5c-2.7 0-5.2 1-7 2.7s-2.7 4.3-2.7 7c0 2.7 1 5.2 2.7 7s4.3 2.7 7 2.7c2.7 0 5.2-1 7-2.7s2.7-4.3 2.7-7c0-2.7-1-5.2-2.7-7zm-7 12.3c-3.5 0-6.3-2.8-6.3-6.3s2.8-6.3 6.3-6.3 6.3 2.8 6.3 6.3-2.8 6.3-6.3 6.3z"/>
        <path d="M14.8 11.5l-1.5-1.5-1.5 1.5-1.5-1.5-1.5 1.5v3h6v-3z"/>
      </svg>
    ),
    'Airbnb': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z"/>
        <path d="M12 4.5c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6 12 6s2.5 1.1 2.5 2.5S13.4 11 12 11z"/>
      </svg>
    ),
    'Facebook': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M24 12.1c0-6.6-5.4-12-12-12s-12 5.4-12 12c0 6 4.4 11 10.1 11.9v-8.4h-3v-3.5h3v-2.6c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.4l-.5 3.5h-2.9v8.4c5.7-.9 10.1-5.9 10.1-11.9z"/>
      </svg>
    ),
    'Google': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z"/>
        <path d="M12 4.5c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6 12 6s2.5 1.1 2.5 2.5S13.4 11 12 11z"/>
      </svg>
    ),
    'Trustpilot': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ),
    'Tripadvisor': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z"/>
        <circle cx="7.5" cy="12" r="2.5"/>
        <circle cx="16.5" cy="12" r="2.5"/>
      </svg>
    ),
    'Custom Integration': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M19.4 3.9l-2-1.9C16.5 1.1 15 2 15 3.5V7H8.8C7.4 5.6 5.3 5.1 3.5 5.8c-1.2.5-2.1 1.5-2.5 2.7-.7 2.1 0 4.4 1.8 5.7.4.3.8.5 1.2.6.8.3 1.7.3 2.5 0 1.3-.4 2.3-1.4 2.7-2.7.1-.3.1-.6.2-.9H15v3.5c0 1.5 1.5 2.4 2.4 1.5l2-1.9c.5-.5.8-1.2.8-1.8V5.7c0-.7-.3-1.3-.8-1.8zM9 12c0 1.7-1.3 3-3 3S3 13.7 3 12s1.3-3 3-3 3 1.3 3 3z"/>
      </svg>
    ),
    'GooglePlay': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-10 h-10">
        <path d="M3 20.5v-17c0-.8.8-1.3 1.5-1l13 8.5c.7.4.7 1.4 0 1.8l-13 8.5c-.7.5-1.5 0-1.5-.8z"/>
      </svg>
    ),
  };

  return icons[name] || null;
};

const Modal = ({ isOpen, onClose, platform }) => {
  if (!isOpen) return null;

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
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const IntegrationCard = ({ platform, onEdit, onIntegrate }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-md text-center">
      <div className="flex justify-end">
        {platform.integrated && (
          <span className="text-green-500 text-lg">✔</span>
        )}
      </div>
      <div className="my-4 flex justify-center items-center">
        <PlatformIcon name={platform.name} color={platform.color} />
      </div>
      <h3 className="text-lg font-semibold">{platform.name}</h3>
      <button
        onClick={() => platform.integrated ? onEdit(platform) : onIntegrate(platform)}
        className={`mt-4 w-full py-2 rounded-lg ${
          platform.integrated
            ? 'bg-black text-white'
            : 'bg-gray-200 text-gray-600'
        }`}
      >
        {platform.integrated ? 'Edit' : 'Integrate'}
      </button>
    </div>
  );
};

const Integrations = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState(null);

  const platforms = [
    { name: 'Booking.com', integrated: true, color: '#003580' },
    { name: 'Airbnb', integrated: true, color: '#FF5A5F' },
    { name: 'Facebook', integrated: false, color: '#1877F2' },
    { name: 'Google', integrated: false, color: '#4285F4' },
    { name: 'Trustpilot', integrated: false, color: '#00B67A' },
    { name: 'Tripadvisor', integrated: false, color: '#00AA6C' },
    { name: 'Custom Integration', integrated: false, color: '#34A853' },
    { name: 'GooglePlay', integrated: false, color: '#3DDC84' },
  ];

  const handleEditClick = (platform) => {
    setCurrentPlatform(platform);
    setEditModalOpen(true);
  };

  const handleIntegrateClick = (platform) => {
    setCurrentPlatform(platform);
    setLinkModalOpen(true);
  };

  const handleCloseModals = () => {
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
            Connect with Google and Facebook directly via login, so you can reply to
            reviews from the Public reviews section. For the other platforms, simply
            enter your page link to import reviews. We don't import all the reviews
            but the most recent ones.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded-lg w-full sm:w-1/3 mb-4 sm:mb-0"
            />
            <span className="text-gray-600">
              Platforms Integrated: {integratedPlatforms} / {platforms.length}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {platforms.map((platform) => (
              <IntegrationCard
                key={platform.name}
                platform={platform}
                onEdit={handleEditClick}
                onIntegrate={handleIntegrateClick}
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
      />
    </div>
  );
};

export default Integrations;