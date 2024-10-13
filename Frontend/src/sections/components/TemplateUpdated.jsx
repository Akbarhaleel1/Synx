import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const CenteredSweetAlert = ({ title, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowContent(true), 600);
    const timer = setTimeout(() => handleClose(), 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setShowContent(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      <div 
        className={`bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-500 ease-in-out 
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} 
          ${isClosing ? 'scale-95 opacity-0' : ''}
          ${showContent ? 'translate-y-0' : 'translate-y-4'}`}
      >
        <div className="p-8">
          <div className="flex items-center justify-center mb-6 overflow-hidden">
            <div className={`bg-green-100 rounded-full p-3 transition-all duration-500 ease-in-out ${showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
              <CheckCircle className="w-12 h-12 text-green-600 animate-[spin_3s_ease-in-out_infinite]" />
            </div>
          </div>
          <h3 className={`text-2xl font-bold text-gray-800 text-center mb-4 transition-all duration-500 ease-in-out ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {title}
          </h3>
          <p className={`text-md text-gray-600 text-center leading-relaxed transition-all duration-500 delay-100 ease-in-out ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {message}
          </p>
        </div>
        <div className={`bg-gray-50 px-6 py-4 flex justify-center transition-all duration-500 delay-200 ease-in-out ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button
            type="button"
            className="inline-flex justify-center items-center rounded-full border border-transparent px-6 py-3 bg-green-600 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out transform hover:scale-105 hover:rotate-3"
            onClick={handleClose}
          >
            Got it!
          </button>
        </div>
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-200 ${showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        >
          <X className="w-6 h-6 animate-[wiggle_1s_ease-in-out_infinite]" />
        </button>
      </div>
    </div>
  );
};

export default CenteredSweetAlert;