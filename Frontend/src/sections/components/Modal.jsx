import React from 'react';

const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 relative w-full max-w-md sm:max-w-lg md:max-w-xl">
        <button 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
