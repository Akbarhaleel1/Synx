// import React, { useState } from 'react';
import { FileText, Image, Mic, Bot, Send, Lock, Unlock } from 'lucide-react';
import Nav from '../../components/Nav';
import { useState } from 'react';

const AIFeaturePage = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  const features = [
    { name: 'Text Generation', icon: <FileText size={24} /> },
    { name: 'Image Analysis', icon: <Image size={24} /> },
    { name: 'Speech Recognition', icon: <Mic size={24} /> },
    { name: 'Chatbot', icon: <Bot size={24} /> },
  ];

  const handleFeatureClick = (feature) => {
    if (!isLocked) {
      setSelectedFeature(feature);
      setInputText('');
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLocked) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    if (isLocked) {
      setSelectedFeature(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Nav />
      <div className="flex-1 flex flex-col lg:pl-64"> {/* Adjust for the Nav */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    AI Magic Hub
                  </h1>
                  <button
                    onClick={toggleLock}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isLocked ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {isLocked ? <Lock size={20} className="text-white" /> : <Unlock size={20} className="text-white" />}
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {features.map((feature) => (
                    <button
                      key={feature.name}
                      onClick={() => handleFeatureClick(feature)}
                      className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                        selectedFeature === feature && !isLocked
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isLocked}
                    >
                      {feature.icon}
                      <span className="mt-2 text-xs font-medium">{feature.name}</span>
                    </button>
                  ))}
                </div>

                {isLocked ? (
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <Lock size={48} className="text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2 text-gray-700">Features Locked</h2>
                    <p className="text-gray-600">Unlock to access AI features</p>
                  </div>
                ) : selectedFeature ? (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">{selectedFeature.name}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                        <input
                          type="text"
                          value={inputText}
                          onChange={handleInputChange}
                          placeholder={`Enter text for ${selectedFeature.name}...`}
                          className="flex-grow p-3 outline-none"
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 text-white p-3 hover:bg-blue-600 transition-colors"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          ) : (
                            <Send size={20} />
                          )}
                        </button>
                      </div>
                      <div className="h-32 bg-white p-4 rounded-lg border border-gray-300">
                        <p className="text-gray-500">AI output will be displayed here...</p>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <h2 className="text-xl font-bold mb-2 text-gray-700">Select a Feature</h2>
                    <p className="text-gray-600">Choose an AI feature to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIFeaturePage;
