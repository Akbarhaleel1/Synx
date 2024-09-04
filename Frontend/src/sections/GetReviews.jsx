import React, { useState } from 'react';
import { FaStar, FaEnvelope, FaLink, FaRobot, FaCog, FaSignOutAlt, FaSignal, FaWifi, FaBatteryFull, FaChevronLeft, FaInfoCircle, FaSearch, FaCamera, FaMicrophone } from 'react-icons/fa';
import Nav from '../components/Nav';

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="toggle-slider"></span>
  </label>
);

const GetReviews = () => {
  const [autoReminder3Days, setAutoReminder3Days] = useState(false);
  const [autoReminder7Days, setAutoReminder7Days] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row">
      <Nav />

      {/* Main Content */}
      <div className="flex-1 bg-[rgb(241,241,241)]  p-4 lg:p-8 overflow-auto lg:ml-64"> {/* Adjust padding and margin for mobile */}
        {/* Tabs */}
        <div className="mb-4 lg:mb-8 flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">
          <a href="/GetReviews">
            <button className="bg-gray-700 px-4 py-2 rounded-md text-white font-bold w-full lg:w-auto">
              PHONE
            </button>
          </a>
          <a href="/GetReviews/email">
            <button className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
              EMAIL
            </button>
          </a>
          <a href="/GetReviews/whatsapp">
            <button className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
              Whatsapp
            </button>
          </a>
          <a href="/GetReviews/qrcode">
            <button className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
              QR Code
            </button>
          </a>
        </div>

        {/* Request Reviews via SMS */}
        <div className="bg-white p-4 lg:p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Request reviews via SMS</h2>
          <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
            <p>Invite Your Customers</p>
            <p className="text-gray-400">Monthly limits: 0/10</p>
          </div>
          <p className="mb-2">Do you have a list of contacts? <span className="text-blue-500">Upload CSV</span></p>
          <div className="flex flex-col lg:flex-row mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
            <input type="text" placeholder="Name" className="bg-gray-800 p-2 rounded-lg w-full lg:w-1/2" />
            <input type="text" placeholder="Contact Number" className="bg-gray-800 p-2 rounded-lg w-full lg:w-1/2" />
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="consent" className="mr-2" />
            <label htmlFor="consent">I have consent to send messages to this contact</label>
          </div>
          <div className="flex flex-col lg:flex-row justify-between">
            <button className="border border-white px-4 py-2 rounded-lg mb-4 lg:mb-0">+ Add Line</button>
            <button className="bg-black text-white px-4 py-2 rounded-lg">Request a Review</button>
          </div>
        </div>

        {/* Edit Template */}
        <div className="bg-white p-4 lg:p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Edit Template</h2>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 pr-0 lg:pr-4">
              {/* iPhone preview */}
              <div className="relative w-full max-w-xs lg:max-w-sm mx-auto bg-white rounded-[50px] overflow-hidden border-[14px] border-gray-800 shadow-xl">
                {/* iPhone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl"></div>
                {/* Status bar */}
                <div className="absolute top-1 left-6 right-6 flex justify-between items-center">
                  <span className="text-black text-xs">9:41</span>
                  <div className="flex space-x-1">
                    <FaSignal className="text-black text-xs" />
                    <FaWifi className="text-black text-xs" />
                    <FaBatteryFull className="text-black text-xs" />
                  </div>
                </div>
                {/* Message interface */}
                <div className="mt-8 h-full bg-gray-100 flex flex-col">
                  {/* Navigation bar */}
                  <div className="bg-gray-200 p-2 flex items-center">
                    <FaChevronLeft className="text-blue-500 mr-2" />
                    <div className="flex-1 text-center">
                      <p className="font-semibold">Company Name</p>
                      <p className="text-xs text-gray-500">iMessage • Now</p>
                    </div>
                    <FaInfoCircle className="text-blue-500 ml-2" />
                  </div>
                  {/* Messages area */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <i className="fas fa-building text-gray-600"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-black font-semibold">Company Name</p>
                        <p className="text-gray-500 text-xs">iMessage • Now</p>
                      </div>
                    </div>
                    <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] ml-auto mb-2">
                      <p className="text-sm">Hi [Name],</p>
                    </div>
                    <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] ml-auto mb-2">
                      <p className="text-sm">Thanks for choosing us. We'd love to hear your feedback.</p>
                    </div>
                    <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] ml-auto">
                      <a href="#" className="text-sm underline">[Link here]</a>
                    </div>
                  </div>
                  {/* Message input */}
                  <div className="bg-gray-200 p-2 flex items-center">
                    <FaCamera className="text-blue-500 mr-2" />
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-500">iMessage</div>
                    <FaMicrophone className="text-blue-500 ml-2" />
                  </div>
                </div>
                {/* Home indicator */}
                <div className="absolute bottom-1 inset-x-0 flex justify-center">
                  <div className="w-28 h-1 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 pl-0 lg:pl-4 mt-4 lg:mt-0">
              {/* Message customization */}
              <h3 className="text-lg font-bold mb-2">Customize the sender</h3>
              <input type="text" placeholder="Company Name" className="bg-gray-800 p-2 rounded-lg w-full mb-4" />
              <h3 className="text-lg font-bold mb-2">Customize the message</h3>
              <textarea className="bg-gray-800 p-2 rounded-lg w-full h-32 mb-4" placeholder="Hi [Name], thanks for choosing us. We'd love to hear your feedback." />
              <h3 className="text-lg font-bold mb-2">Recipient preview</h3>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">Hi [Name],</p>
                <p className="text-gray-300">Thanks for choosing us. We'd love to hear your feedback.</p>
                <a href="#" className="text-blue-500">[Link here]</a>
              </div>
            </div>
          </div>
        </div>

        {/* Automated Reminders */}
        <div className="bg-white p-4 lg:p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Automated Reminders</h2>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <p className="mb-2 lg:mb-0">Send reminders to customers who haven’t reviewed you yet:</p>
            <div className="flex space-x-4">
              <div className="flex items-center mb-2 lg:mb-0">
                <ToggleSwitch checked={autoReminder3Days} onChange={() => setAutoReminder3Days(!autoReminder3Days)} />
                <label className="ml-2">3 Days</label>
              </div>
              <div className="flex items-center">
                <ToggleSwitch checked={autoReminder7Days} onChange={() => setAutoReminder7Days(!autoReminder7Days)} />
                <label className="ml-2">7 Days</label>
              </div>
            </div>
          </div>
          <p className="text-gray-400 mb-2">Reminders will be sent to all customers who haven’t reviewed you yet.</p>
          <p className="text-gray-400">Reminder emails will be sent to your customers.</p>
        </div>
      </div>
    </div>
  );
};

export default GetReviews;
