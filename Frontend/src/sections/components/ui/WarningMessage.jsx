import React from 'react';
import {useNavigate} from 'react-router-dom'

const WarningModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  const handleNavigate = () =>{
    navigate('/EditReviews')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center text-amber-800 mb-4">
            <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium">Review Link Required</h3>
          </div>
          <p className="text-amber-700 mb-6">
            Please add a review link to proceed. This step is necessary to ensure proper feedback collection.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
            onClick={handleNavigate}
              className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            >
              Go to the add link page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;