import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import useAuth from './customHooks/useAuth';
import CenteredSweetAlert from './components/TemplateUpdated';
import EnhancedSubmitButton from './components/EnhancedSubmitButton';
import { SuccessModal } from './components/successModal';
import BeautifulErrorModal from './components/BeautifulErrorModal';

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="toggle-slider"></span>
  </label>
);

const GetReviewsEmail = () => {
  const [link, setLink] = useState("");
  const [inputs, setInputs] = useState([{ name: "", contact: "" }]);
  const [companyName, setCompanyName] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [showAlert, setShowAlert] = useState(false)
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const navigate = useNavigate()

  useAuth()

  useEffect(() => {
    const fetchData = async () => {
      console.log('email page is working')
      const user = localStorage.getItem('user')
      const getToken = localStorage.getItem('token');
      const token = JSON.parse(getToken);
      console.log('1')
      const result = await axios.post('https://synxbackend.synxautomate.com/ePageLoad', { user },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });

      console.log('result', result.data)

      if(result.data.message === "Not Found"){
        navigate('/PricingTable')
        return
      }
   
      setCompanyName(result.data.email.name)
      setEmailContent(result.data.email.message)
      setLink(result.data.link)
    }
    fetchData()
  }, [])

  const handleSubmitForEmail = async () => {
    if (!companyName || !emailContent) {
      // alert('Please fill out both fields.');
      setIsErrorModalOpen(true)
      return;
    }

    try {
      // Send data to the backend
      let user = localStorage.getItem('user')
      const getToken = localStorage.getItem('token');
      const token = JSON.parse(getToken)

      const response = await axios.post('https://synxbackend.synxautomate.com/ePage', {
        user,
        companyName,
        emailContent,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('responce', response);

      // Handle success response
      setShowAlert(true)
      // alert('Template updated successfully!');
    } catch (error) {
      // Handle error response
      console.error('Error updating template:', error);
      alert('Failed to update the template. Please try again.');
    }
  };



  const handleAddLine = () => {
    setInputs([...inputs, { name: "", contact: "" }]);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index][event.target.name] = event.target.value;
    setInputs(newInputs);
  };

  const handleSubmit = async () => {
    try {

      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Review submitted');
      for (const input of inputs) {
        console.log('input', input)
        if (!input.name || !input.contact) {
          // alert('Please fill out all fields');
          setIsErrorModalOpen(true)
          return;
        }
      }

      console.log('input', inputs)
      let user = localStorage.getItem('user');
      const getToken = localStorage.getItem('token');
      const token = JSON.parse(getToken)
      // Send the data to the backend
      const response = await axios.post('https://synxbackend.synxautomate.com/sendEmailReviews', { user: user, email: inputs }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('responsce is', response);
      setSuccessModalOpen(true);
    } catch (error) {
      // Handle error response
      console.error('Error sending review requests:', error);
      alert('Failed to send review requests. Please try again.');
    }
  };

  console.log('companyName', companyName);
  console.log('emailContent', emailContent);
  console.log('inputs', inputs);


  return (
    <div className="flex min-h-screen bg-[rgb(241,241,241)] ">
      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 ml-0 sm:ml-64">
        {/* Top Buttons */}
        <div className="mb-4 lg:mb-8 flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">
          <a href="/GetReviews">
            <button className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
              PHONE
            </button>
          </a>
          <a href="/GetReviews/email">
            <button className="bg-gray-700 px-4 py-2 rounded-md text-white font-bold w-full lg:w-auto">
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
        {/* Request Reviews via SMS */}
        <div className="bg-white p-4 lg:p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Request reviews via Email</h2>
          <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
            <p>Invite Your Customers</p>
            <p className="text-gray-400">Monthly limits: Unlimited</p>
          </div>


          {/* Render input fields dynamically */}
          {inputs.map((input, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row mb-4 space-y-4 lg:space-y-0 lg:space-x-4"
            >
              <input
                type="text"
                name="name"
                value={input.name}
                placeholder="Name"
                className="bg-gray-800 p-2 rounded-lg w-full lg:w-1/2 text-white"
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="email"
                name="contact"
                value={input.contact}
                placeholder="Email"
                className="bg-gray-800 p-2 rounded-lg w-full lg:w-1/2 text-white"
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}
{/* 
          <div className="flex items-center mb-4">
            <input type="checkbox" id="consent" className="mr-2 text-white" />
            <label htmlFor="consent">
              I have consent to send messages to this contact
            </label>
          </div> */}
          <div className="flex flex-col lg:flex-row justify-between">
            <button
              onClick={handleAddLine}
              className="border border-white px-4 py-2 rounded-lg mb-4 lg:mb-0"
            >
              + Add Line
            </button>
            {/* <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded-lg">
              Request a Review
            </button> */}
           <EnhancedSubmitButton onSubmit={handleSubmit} />

          </div>
        </div>

        {/* Edit Template */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h2 className="text-lg sm:text-2xl font-bold mb-6">Edit Template</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Preview Section */}
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Preview</h3>
              <div className="bg-white p-4 rounded-lg shadow-lg text-gray-800">
                <div className="mb-4">
                  <p className="font-semibold">
                    From: <span className="font-normal">company@example.com</span>
                  </p>
                  <p className="font-semibold">
                    To: <span className="font-normal">customer@example.com</span>
                  </p>
                  <p className="font-semibold">
                    Subject: <span className="font-normal">We'd love your feedback!</span>
                  </p>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <p className="mb-2">Hi [Name],</p>
                  <p className="mb-2">{emailContent}</p>
                  <a href={`${link}`} className="text-blue-500 underline">
                    [Review Link]
                  </a>
                  <p className="mt-4">
                    Best regards,
                    <br />
                    {companyName}
                  </p>
                </div>
              </div>
            </div>

            {/* Customization Section */}
            <div className="w-full sm:w-1/2">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Customize</h3>
              <div className="mb-4">
                <label htmlFor="company-name" className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email-content" className="block text-sm font-medium mb-2">
                  Email Content
                </label>
                <textarea
                  id="email-content"
                  rows="6"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-white"
                  placeholder="Hi [Name], thank you for choosing [Company Name]. We'd love to hear your feedback. [Review Link]"
                ></textarea>
              </div>

              <button
                onClick={handleSubmitForEmail}
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg"
              >
                Update Template
              </button>
              {showAlert&&(
                <CenteredSweetAlert  title="Success!" message={'Template Updated Successfully!'}  onClose={()=>setShowAlert(false)}/>
              )}
            </div>
          </div>
        </div>
      </main>
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setSuccessModalOpen(false)}  message="Review request sent successfully via Email!"/>
      <BeautifulErrorModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          errors={errorMessages}
        />
    </div>
  );
};

export default GetReviewsEmail;
