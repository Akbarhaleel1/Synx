import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import Nav from '../../components/Nav';

const UtilityPage = () => {
  const [isLocked, setIsLocked] = useState(true);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add your NavComponent at the top */}
      <Nav />

      <div className="flex-1 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Utility Dashboard</h1>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <span className="font-medium">Feature 1</span>
              <button 
                className={`px-4 py-2 rounded-full transition-colors ${
                  isLocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
                onClick={toggleLock}
              >
                {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
              </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Utility Information</h2>
              <p className="text-sm text-gray-600">
                {isLocked 
                  ? "This feature is currently locked. Unlock to view more information."
                  : "Welcome to the utility page. Here you can manage various features and settings."}
              </p>
            </div>
            
            <button 
              className={`w-full py-2 rounded-lg transition-colors ${
                isLocked 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              disabled={isLocked}
            >
              Access Feature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityPage;
