import React from "react";
import {
  FaStar,
  FaEnvelope,
  FaLink,
  FaRobot,
  FaCog,
  FaSignOutAlt,
  FaWifi,
  FaSignal,
  FaBatteryFull,
  FaArrowLeft,
  FaUser,
  FaVideo,
  FaPhone,
  FaEllipsisV,
  FaSmile,
  FaPaperclip,
  FaMicrophone,
  FaSearch,
  FaChevronDown,
  FaCheckDouble,
} from "react-icons/fa";
import Nav from "../components/Nav";

const SynXPlusReviewRequest = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Nav />

      {/* Main Content */}
      <div className="flex-1 bg-[rgb(241,241,241)] p-4 lg:p-6 overflow-y-auto lg:ml-64">
        {/* Tabs */}
        <div className="mb-4 lg:mb-8 flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">
          <a href="/GetReviews">
            <button className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
              PHONE
            </button>
          </a>
          <a href="/GetReviews/email">
            <button className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
              EMAIL
            </button>
          </a>
          <a href="/GetReviews/whatsapp">
            <button className="bg-gray-700 px-4 py-2 rounded-md text-white font-bold w-full lg:w-auto">
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
        <div className="bg-white p-4 lg:p-6 rounded-lg mb-4 lg:mb-8">
          <h2 className="text-xl font-bold mb-4 text-black">Request reviews via SMS</h2>
          <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
            <p>Invite Your Customers</p>
            <p className="text-gray-700">Monthly limits: 0/10</p>
          </div>
          <p className="mb-2">
            Do you have a list of contacts?{" "}
            <span className="text-blue-800 cursor-pointer">Upload CSV</span>
          </p>
          <div className="flex flex-col lg:flex-row mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
            <input
              type="text"
              placeholder="Name"
              className="bg-gray-800 p-2 rounded-lg flex-1"
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="bg-gray-800 p-2 rounded-lg flex-1"
            />
          </div>
          <div className="flex items-center mb-4 text-black">
            <input type="checkbox" id="consent" className="mr-2" />
            <label htmlFor="consent">
              I have consent to send messages to this contact
            </label>
          </div>
          <div className="flex flex-col lg:flex-row justify-between">
            <button className="border border-black text-black px-4 py-2 rounded-lg mb-4 lg:mb-0 lg:w-1/2">
              + Add Line
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg lg:w-1/2">
              Request a Review
            </button>
          </div>
        </div>

        {/* Edit Template */}
        <div className="bg-gray-900 p-4 lg:p-6 rounded-lg flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-4 mb-4 lg:mb-0">
            {/* Android WhatsApp-like preview */}
            <div className="relative w-full bg-[#121B22] rounded-lg overflow-hidden shadow-xl">
              {/* Status bar */}
              <div className="bg-[#1F2C34] p-2 flex justify-between items-center">
                <span className="text-white text-xs">9:41</span>
                <div className="flex space-x-1">
                  <FaWifi className="text-white text-xs" />
                  <FaSignal className="text-white text-xs" />
                  <FaBatteryFull className="text-white text-xs" />
                </div>
              </div>
              {/* WhatsApp interface */}
              <div className="h-full bg-[#121B22] flex flex-col">
                {/* Navigation bar */}
                <div className="bg-[#1F2C34] p-2 flex items-center">
                  <FaArrowLeft className="text-white mr-2" />
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    <FaUser className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Company Name</p>
                    <p className="text-xs text-gray-400">online</p>
                  </div>
                  <FaVideo className="text-white ml-2" />
                  <FaPhone className="text-white ml-4" />
                  <FaEllipsisV className="text-white ml-4" />
                </div>
                {/* Messages area */}
                <div className="flex-1 p-4 overflow-y-auto bg-[url('https://i.pinimg.com/originals/85/ec/df/85ecdf1c3611ecc9b7fa85282d9526e0.jpg')] bg-cover">
                  <div className="bg-[#025D4B] text-white p-2 rounded-lg max-w-[80%] ml-auto mb-1">
                    <p className="text-sm">Hi [Name],</p>
                  </div>
                  <div className="bg-[#025D4B] text-white p-2 rounded-lg max-w-[80%] ml-auto mb-1">
                    <p className="text-sm">
                      Thanks for choosing [Company Name]. We'd love to hear your
                      feedback.
                    </p>
                  </div>
                  <div className="bg-[#025D4B] text-white p-2 rounded-lg max-w-[80%] ml-auto">
                    <p className="text-sm">Please leave us a review here:</p>
                    <a href="#" className="text-sm text-[#34B7F1] break-all">
                      [Link here]
                    </a>
                    <span className="text-[10px] text-[#ffffff99] float-right mt-1">
                      9:41 AM <FaCheckDouble className="text-[#34B7F1]" />
                    </span>
                  </div>
                </div>
                {/* Message input */}
                <div className="bg-[#1F2C34] p-2 flex items-center">
                  <FaSmile className="text-[#8696A0] mr-2" />
                  <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 text-sm text-gray-400">
                    Type a message
                  </div>
                  <FaPaperclip className="text-[#8696A0] ml-2" />
                  <FaMicrophone className="text-[#8696A0] ml-2" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-4">
            {/* Message customization */}
            <h3 className="text-lg font-bold mb-2">Customize the sender</h3>
            <input
              type="text"
              placeholder="Company Name"
              className="bg-gray-800 p-2 rounded-lg w-full mb-4"
            />
            <h3 className="text-lg font-bold mb-2">Customize the message</h3>
            <textarea
              className="bg-gray-800 p-2 rounded-lg w-full h-32 mb-4"
              placeholder="Hi [Name], thanks for choosing [Company Name]. We'd love to hear your feedback. Please leave us a review here: [Link here]"
            ></textarea>
            <div className="flex flex-wrap mb-4">
              <span className="bg-[#00A884] text-white rounded-full px-2 py-1 text-xs mr-2 mb-2">
                [Name]
              </span>
              <span className="bg-[#00A884] text-white rounded-full px-2 py-1 text-xs mr-2 mb-2">
                [Company Name]
              </span>
              <span className="bg-[#00A884] text-white rounded-full px-2 py-1 text-xs mr-2 mb-2">
                [Link here]
              </span>
            </div>
            <button className="bg-blue-500 px-4 py-2 rounded-lg w-full">
              Preview Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynXPlusReviewRequest;
