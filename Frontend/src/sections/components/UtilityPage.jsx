// import React, { useState } from 'react';
// import { Lock, Unlock, Settings, Info } from 'lucide-react';
// import Nav from '../../components/Nav';

// const UtilityPage = () => {
//   const [isLocked, setIsLocked] = useState(true);

//   const toggleLock = () => {
//     setIsLocked(!isLocked);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Nav />
//       <div className="flex-1 flex items-center justify-center p-8">
//         <div className="w-full max-w-4xl">
//           <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Utility Dashboard</h1>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-700 flex items-center">
//                   <Settings className="mr-2" size={24} /> Feature Control
//                 </h2>
//                 <button
//                   className={`p-2 rounded-full transition-all ${
//                     isLocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
//                   }`}
//                   onClick={toggleLock}
//                 >
//                   {isLocked ? <Lock size={24} /> : <Unlock size={24} />}
//                 </button>
//               </div>
//               <p className="text-gray-600 mb-6">
//                 {isLocked
//                   ? "This feature is currently locked. Unlock to access advanced settings and controls."
//                   : "Feature unlocked. You now have full access to all controls and settings."}
//               </p>
//               <button
//                 className={`w-full py-3 rounded-lg transition-colors text-lg font-medium ${
//                   isLocked
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//                 disabled={isLocked}
//               >
//                 Access Feature
//               </button>
//             </div>

//             <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
//                 <Info className="mr-2" size={24} /> Utility Information
//               </h2>
//               <p className="text-gray-600 mb-4">
//                 Welcome to the utility dashboard. Here you can manage various features and settings for your system.
//               </p>
//               <ul className="list-disc list-inside text-gray-600 space-y-2">
//                 <li>Monitor system performance</li>
//                 <li>Adjust security settings</li>
//                 <li>View usage statistics</li>
//                 <li>Manage user permissions</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UtilityPage;


import React, { useState } from 'react';
import { Lock, Unlock, Settings, Info } from 'lucide-react';
import Nav from '../../components/Nav';

const UtilityPage = () => {
  const [isLocked, setIsLocked] = useState(true);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Nav />
      {/* Main content area with left margin for desktop */}
      <div className="flex-1 lg:ml-64">
        {/* Content wrapper with padding */}
        <div className="p-8 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-gray-800">
            Utility Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature Control Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                  <Settings className="mr-2" size={24} /> Feature Control
                </h2>
                <button
                  className={`p-2 rounded-full transition-all ${
                    isLocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}
                  onClick={toggleLock}
                >
                  {isLocked ? <Lock size={24} /> : <Unlock size={24} />}
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                {isLocked
                  ? "This feature is currently locked. Unlock to access advanced settings and controls."
                  : "Feature unlocked. You now have full access to all controls and settings."}
              </p>
              <button
                className={`w-full py-3 rounded-lg transition-colors text-lg font-medium ${
                  isLocked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={isLocked}
              >
                Access Feature
              </button>
            </div>

            {/* Utility Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
                <Info className="mr-2" size={24} /> Utility Information
              </h2>
              <p className="text-gray-600 mb-4">
                Welcome to the utility dashboard. Here you can manage various features and settings for your system.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Monitor system performance</li>
                <li>Adjust security settings</li>
                <li>View usage statistics</li>
                <li>Manage user permissions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityPage;