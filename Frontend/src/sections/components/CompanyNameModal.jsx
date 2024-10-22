import React, { useState, useEffect } from 'react';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CompanyNameModal = ({ isOpen, onClose, onSubmit }) => {
  const [companyName, setCompanyName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName.trim()) {
      setErrorMessage('Company name is required.');
      return;
    }

    if (companyName.length < 3) {
      setErrorMessage('Company name must be at least 3 characters.');
      return;
    }

    try {
      const getUser = localStorage.getItem('user');
      console.log('user is', getUser)
      console.log('0')
      let userdata
      // if(getUser){
        userdata = JSON.parse(getUser)
      // }
      console.log('userdata',userdata)
      console.log('1')
      console.log('comapny name is',companyName)
      const response = await fetch('https://synxbackend.synxautomate.com/companyName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName, userdata }),
      });
      console.log('2')

      // let userDatas = response.data
      // console.log('userdatasssssssssssssssssssss', userDatas)
      // localStorage.setItem('user',userDatas)
      // console.log('3')

      if (!response.ok) {
        throw new Error('Failed to submit company name');
      }
      onClose()
      console.log('Company name submitted successfully');
      setCompanyName('');
      setErrorMessage('');
      onSubmit(companyName);
      onClose();
    } catch (error) {
      console.error('Error submitting company name:', error);
      setErrorMessage('Failed to submit company name. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add Company Name</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errorMessage ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter company name"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Okay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyNameModal;