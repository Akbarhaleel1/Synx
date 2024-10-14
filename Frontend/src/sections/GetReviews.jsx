import { useState, useEffect } from "react";
import {
  FaSignal,
  FaWifi,
  FaBatteryFull,
  FaChevronLeft,
  FaInfoCircle,
  FaCamera,
  FaMicrophone,
} from "react-icons/fa";
import Nav from "../components/Nav";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

import useAuth from './customHooks/useAuth';
import CustomModal from "./components/customModal";
import BeautifulErrorModal from "./components/BeautifulErrorModal";
import { SuccessModal } from "./components/successModal";
import EnhancedSubmitButton from "./components/EnhancedSubmitButton";
import { Plus } from "lucide-react";


const ToggleSwitch = ({ checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="toggle-slider"></span>
  </label>
);

const GetReviews = () => {
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [inputs, setInputs] = useState([{ name: "", contact: "" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const navigate = useNavigate();


  const handleAddLine = () => {
    setInputs([...inputs, { name: "", contact: "" }]);
  };

  useAuth()

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index][event.target.name] = event.target.value;
    setInputs(newInputs);
  };

  const handleSubmit = async () => {
    try {
      // Ensure all fields are filled
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Review submitted');
      for (const input of inputs) {
        console.log('input', input)
        if (!input.name || !input.contact) {
          // alert('Please fill out all fields');
          setIsErrorModalOpen(true);
          return;
        }
      }

      console.log('input', inputs)

      if (!companyName || !message) {
        setIsModalOpen(true);
        return;
      }

      let user = localStorage.getItem('user')
      const getToken = localStorage.getItem('token');
      const token = JSON.parse(getToken)
      // Send the data to the backend
      const response = await axios.post('https://synxbackend.synxautomate.com/sendReviews', { user: user, contacts: inputs }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('responsce is', response);

      if(response.data.msg=='it seems more than monthly limit'){
        alert('it seems more than monthly limit')
        return
      }

      setSuccessModalOpen(true);

    } catch (error) {
      // Handle error response
      console.error('Error sending review requests:', error);
      alert('Failed to send review requests. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      const getToken = localStorage.getItem('token');
      const token = JSON.parse(getToken)
      try {
        const result = await axios.post("https://synxbackend.synxautomate.com/emailPage", {
          user,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("result",result.data.message);
        if(result.data.message === "Not Found"){
          navigate('/PricingTable')
          return
        }
        setCompanyName(result.data.email.name);
        setMessage(result.data.email.message);
        setLink(result.data.link);
        console.log("result ", result.data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Save template whenever companyName or message changes
  useEffect(() => {
    if (companyName || message) {
      const user = localStorage.getItem("user");
      const getToken = localStorage.getItem('token');
      const token = JSON.parse(getToken)
      const updateTemplate = async () => {
        try {
          await axios.post("https://synxbackend.synxautomate.com/saveEmailTemplate", {
            message,
            companyName,
            user,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Error saving template:", error);
        }
      };
      updateTemplate();
    }
  }, [companyName, message]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteLine = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Nav />

      {/* Main Content */}
      <div className="flex-1 bg-[rgb(241,241,241)]  p-4 lg:p-8 overflow-auto lg:ml-64">
        {" "}
    
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
          <a href="/QrCode">
            <button className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
              QR Code
            </button>
          </a>
        </div>



        <div className="bg-white p-4 lg:p-6 rounded-lg mb-8">
      <h2 className="text-xl font-bold mb-4">Request reviews via SMS</h2>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <p>Invite Your Customers</p>
        <p className="text-gray-400">Monthly limits: 0/10</p>
      </div>
      {inputs.map((input, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row mb-4 space-y-4 lg:space-y-0 lg:space-x-4 items-center"
        >
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Name"
            className="bg-gray-800 p-2 rounded-lg w-full lg:w-5/12 text-white"
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="text"
            name="contact"
            value={input.contact}
            placeholder="Contact Number"
            className="bg-gray-800 p-2 rounded-lg w-full lg:w-5/12 text-white"
            onChange={(e) => handleInputChange(index, e)}
          />
          <button
            onClick={() => handleDeleteLine(index)}
            className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition duration-150 ease-in-out"
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        </div>
      ))}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
        <button
          onClick={handleAddLine}
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
                      <p className="font-semibold">{companyName}</p>
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
                        <p className="text-black font-semibold">{companyName}</p>
                        <p className="text-gray-500 text-xs">iMessage • Now</p>
                      </div>
                    </div>
                    <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] ml-auto mb-2">
                      <p className="text-sm">Hi Name,</p>
                    </div>
                    <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] ml-auto mb-2">
                      <p className="text-sm">
                        {message}
                      </p>
                    </div>
                    <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] ml-auto">
                      <a href={`${link}`} className="text-sm underline">
                        [Link here]
                      </a>
                    </div>
                  </div>
                  {/* Message input */}
                  <div className="bg-gray-200 p-2 flex items-center">
                    <FaCamera className="text-blue-500 mr-2" />
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-500">
                      iMessage
                    </div>
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
              <input
                type="text"
                id="companyName"
                className="bg-gray-800 p-2 rounded-lg w-full text-white"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <h3 className="text-lg font-bold mb-2">Customize the message</h3>
              <textarea
                id="message"
                className="bg-gray-800 p-2 rounded-lg w-full text-white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />{" "}
              <h3 className="text-lg font-bold mb-2">Recipient preview</h3>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">Hi [Name],</p>
                <p className="text-gray-300">
                  {message}
                </p>
                <a href={`${link}`} className="text-blue-500">
                  [Link here]
                </a>
              </div>
            </div>
          </div>
        </div>
        <CustomModal
          companyName={companyName}
          message={message}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        <BeautifulErrorModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          errors={errorMessages}
        />

        <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setSuccessModalOpen(false)} message="Review request sent successfully via SMS!" />
      </div>

    </div>
  );
};

export default GetReviews;
