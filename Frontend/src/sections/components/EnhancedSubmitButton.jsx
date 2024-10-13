import React, { useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

const EnhancedSubmitButton = ({ onSubmit, className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (isLoading) return; // Prevent multiple clicks while loading

    setIsLoading(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error here (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, onSubmit]);

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`bg-black text-white px-4 py-2 rounded-lg flex items-center justify-center ${
        isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-800'
      } ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Processing...
        </>
      ) : (
        'Request a Review'
      )}
    </button>
  );
};

export default EnhancedSubmitButton;