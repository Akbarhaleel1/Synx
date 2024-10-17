

import React, { useEffect, useState } from "react";
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
  FaTrash, // Added remove icon
} from "react-icons/fa";
import Nav from "../components/Nav";
import useAuth from './customHooks/useAuth';
import axios from "axios";
import CenteredSweetAlert from "./components/TemplateUpdated";
import EnhancedSubmitButton from "./components/EnhancedSubmitButton";
import { SuccessModal } from "./components/SweatAlert";
import BeautifulErrorModal from "./components/BeautifulErrorModal";
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import MonthlyLimitModal from './components/ui/MonthlyLimitModal';
import WarningModal from "./components/ui/WarningMessage";

const SynXPlusReviewRequest = () => {
  useAuth();

  const [contacts, setContacts] = useState([{ name: "", number: "" }]);
  const [companyName, setCompanyName] = useState("");
  const [messageTemplate, setMessageTemplate] = useState(
    "Thanks for choosing [Company Name]. We'd love to hear your feedback. Please leave us a review here:"
  );
  const [link, setLink] = useState('');
  const [showAlert, setShowAlert] = useState(false)
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [balence, setBalence] = useState('')
  const [limit, setLimit] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      // Retrieve the user and token from localStorage
      const user = localStorage.getItem("user"); // Assuming this is a string
      const getToken = localStorage.getItem('token'); // Fetch the token string
      const token = JSON.parse(getToken); // Parse the token from JSON

      console.log('Fetching data...');

      try {
        // Make a POST request to the backend
        const result = await axios.post("https://synxbackend.synxautomate.com/whatsappage", {
          user, // Sending user data as the request body
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token in headers
          },
        });

        if (result.data.trailover) {
          navigate('/PricingTable');
          return
        }
        // Log the result from the server
        console.log('result', result.data);
        setBalence(result.data.balance);
        setLimit(result.data.limit)
        // Uncomment the following lines to set state with the received data
        setCompanyName(result.data.whatsap.name);
        setMessageTemplate(result.data.whatsap.message);
        setLink(result.data.link);

      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleAddContact = () => {
    setContacts([...contacts, { name: "", number: "" }]);
  };

  const handleContactChange = (index, event) => {
    const newContacts = [...contacts];
    newContacts[index][event.target.name] = event.target.value;
    setContacts(newContacts);
  };

  const handleRemoveContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };


  const handleSubmit = async () => {
    console.log('contacts', contacts);

    let user = localStorage.getItem('user')
    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken)

    for (const input of contacts) {
      console.log('input', input)
      if (!input.name || !input.number) {
        setIsErrorModalOpen(true);
        return;
      }
    }
    setBalence(balence-inputs.length)

    console.log('companyName', companyName)
    console.log('messageTemplate', messageTemplate)
    if (!companyName || !messageTemplate) {
      setIsErrorModalOpen(true);
      return
    }

    const endpoint = localStorage.getItem('endpoint')
    console.log('enpiontssssssssssssss', endpoint)
    if (!endpoint) {
      console.log('Navigating to add link page');
      setShowWarning(true);
      return
    }

    // Send the data to the backend
    const response = await axios.post('https://synxbackend.synxautomate.com/sendWhatsapp', { user: user, contacts }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('responsce is', response);

    if (response.data.message == "it seems more than monthly limit") {
      // alert('it seems more than monthly limit')
      setIsModalOpen(true)
      return
    }


    setSuccessModalOpen(true);

    // alert("Review requests sent!");
  };





  const handlePreviewMessage = async () => {
    // Logic for previewing the message
    let user = localStorage.getItem('user');
    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken)
    console.log('user', user, 'companyName', companyName, 'messageTemplate', messageTemplate)
    // Send the data to the backend
    const response = await axios.post('https://synxbackend.synxautomate.com/sendTemplate', { user: user, companyName, messageTemplate }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('responsce is', response);
    setShowAlert(true)
    // alert(`Preview:\n${messageTemplate.replace("[Company Name]", companyName)}`);
  };


  const GetReviews = () => {
    navigate('/GetReviews')
  };
  const getReviewsEmail = () => {
    navigate('/GetReviews/email')
  };
  const getReviewWattsapp = () => {
    navigate('/GetReviews/whatsapp')
  };
  const handleQr = () => {
    navigate('/QrCode')
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Nav />

      {/* Main Content */}
      <div className="flex-1 bg-[rgb(241,241,241)] p-4 lg:p-6 overflow-y-auto lg:ml-64">
        {/* Tabs */}
        <div className="mb-4 lg:mb-8 flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">

          <button onClick={GetReviews} className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
            PHONE
          </button>


          <button onClick={getReviewsEmail} className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
            EMAIL
          </button>


          <button onClick={getReviewWattsapp} className="bg-gray-700 px-4 py-2 rounded-md text-white font-bold w-full lg:w-auto">
            Whatsapp
          </button>

          <button onClick={handleQr} className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
            QR Code
          </button>
        </div>

        {/* Request Reviews via SMS */}
        <div className="bg-white p-4 lg:p-6 rounded-lg mb-4 lg:mb-8">
          <h2 className="text-xl font-bold mb-4 text-black">Request reviews via SMS</h2>
          <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
            <p className="text-black">Invite Your Customers</p>
            <p className="text-gray-700">Monthly limits: <span>{balence}</span>/<span>{limit}</span></p>
          </div>
          <p className="mb-2">
            Do you have a list of contacts?{" "}
          </p>

          {/* Company Name Input */}


          {contacts.map((contact, index) => (
            <div key={index} className="flex flex-col lg:flex-row mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={contact.name}
                onChange={(event) => handleContactChange(index, event)}
                className="bg-gray-800 p-2 rounded-lg flex-1"
                required
              />
              {/* <input
                type="number"
                name="number"
                placeholder="Contact Number"
                value={contact.number}
                onChange={(event) => handleContactChange(index, event)}
                className="bg-gray-800 p-2 rounded-lg flex-1"
                required
              /> */}
              <div className="relative flex-1">
                <input
                  type="number"
                  name="number"
                  placeholder="Contact Number"
                  value={contact.number}
                  onChange={(event) => handleContactChange(index, event)}
                  className="bg-gray-800 p-2 pl-10 rounded-lg w-full text-white"
                  required
                />
                {/* Icon inside the input */}
                <span
                  className="absolute inset-y-0 left-2 flex items-center cursor-pointer"
                  title="Please enter your phone number including the country code, starting with your country code (e.g., for India, 91), followed by your 10-digit number. Do not include the '+' symbol. Example: 9123XXXXXXXX."
                >
                  {/* Add an info or phone icon here */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 12h-9m6.75-6.75L21 12l-9.75 6.75V5.25z"
                    />
                  </svg>
                </span>
              </div>

              <button onClick={() => handleRemoveContact(index)} className="text-red-500">
                <FaTrash /> {/* Remove icon */}
              </button>
            </div>
          ))}
          {/* <div className="flex flex-col lg:flex-row justify-between">
            <button onClick={handleAddContact} className="border text-black px-1 py-2 rounded-lg mb-4 lg:mb-0 lg:w-1/2">
              + Add Contact
            </button>
            <EnhancedSubmitButton onSubmit={handleSubmit} />
          </div> */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
            <button
              onClick={handleAddContact}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <Plus className="w-5 h-5 mr-2 text-gray-400" />
              Add Contact
            </button>
            <EnhancedSubmitButton
              onSubmit={handleSubmit}
              className="flex-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setSuccessModalOpen(false)} message="Request reviews send to whatsapp successfully!" />


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
                    <p className="font-semibold text-white">{companyName}</p>
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
                      {messageTemplate}
                    </p>
                  </div>
                  <div className="bg-[#025D4B] text-white p-2 rounded-lg max-w-[80%] ml-auto">
                    <p className="text-sm">Please leave us a review here:</p>
                    <a href={`${link}`} className="text-sm text-[#34B7F1] break-all">
                      [Link here]
                    </a>
                    <span className="text-[10px] text-[#ffffff99] float-right mt-1">
                      9:41 AM <FaCheckDouble className="inline-block text-xs" />
                    </span>
                  </div>
                </div>
                {/* Input area */}
                <div className="flex items-center p-2">
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 bg-transparent border border-[#3D4347] p-2 rounded-lg text-white"
                  />
                  <FaPaperclip className="text-[#8696A0] ml-2" />
                  <FaMicrophone className="text-[#8696A0] ml-2" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-4">
            <h2 className="text-xl font-bold mb-4">Message Template</h2>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg mb-4 w-full"
            />
            <textarea
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              rows="4"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
            ></textarea>
            <button
              onClick={handlePreviewMessage}
              className="bg-black text-white px-4 py-2 rounded-lg mt-2"
            >
              Update Template
            </button>
            {showAlert && (
              <CenteredSweetAlert title="Success!" message={'Template Updated Successfully!'} onClose={() => setShowAlert(false)} />
            )}
          </div>
        </div>
      </div>
      <BeautifulErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errors={errorMessages}
      />

      <MonthlyLimitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <WarningModal
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
      />
    </div>
  );
};

export default SynXPlusReviewRequest;
