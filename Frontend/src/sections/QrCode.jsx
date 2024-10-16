import { useState, useEffect, useRef } from 'react';
import Nav from "../components/Nav";
import axios from 'axios';
import useAuth from './customHooks/useAuth';
import {useNavigate} from 'react-router-dom'


const ReviewLinkAndQRCode = () => {
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState({});
  const downloadLinkRef = useRef(null);
  const navigate = useNavigate()

  useAuth()

  const handleCopyLink = () => {
    if (data.link) {
      navigator.clipboard.writeText(data.link)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  const handleDownloadQRCode = () => {
    if (downloadLinkRef.current && data.qrCodeDataURL) {
      downloadLinkRef.current.click();
    }
  };

  const parsedToken = localStorage.getItem('token');
  const token = JSON.parse(parsedToken)

  useEffect(() => {
    const fetchUser = async () => {
      const user = localStorage.getItem('user');
      // const result = await axios.post('https://synxbackend.synxautomate.com/generateqr', { user },{headers: {
      //   Authorization: `Bearer ${token}`,
      // }});
      const result = await axios.post('http://localhost:3000/generateqr', { user },{headers: {
        Authorization: `Bearer ${token}`,
      }});
      console.log('result is ', result);
      if(result.data.trailover){
        navigate('/PricingTable');
        return
      }
      setData(result.data);
    };
    fetchUser();
  }, []);


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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Nav />
      <div className="flex-1 flex flex-col md:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-wrap gap-2 justify-center md:justify-start">
        
              <button onClick={GetReviews} className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold">
                PHONE
              </button>
        
         
              <button onClick={getReviewsEmail} className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold">
                EMAIL
              </button>
       
      
              <button onClick={getReviewWattsapp} className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold">
                Whatsapp
              </button>
    
 
              <button onClick={handleQr} className="bg-gray-700 px-4 py-2 rounded-md text-white font-bold">
                QR Code
              </button>
  
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-4 py-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center md:text-left">Share Your Experience</h2>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="review-link" className="block text-sm font-medium text-gray-700 mb-2">
                      Review Link
                    </label>
                    <div className="mt-1 flex flex-col sm:flex-row rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-t-md sm:rounded-l-md sm:rounded-t-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        URL
                      </span>
                      <input
                        type="text"
                        name="review-link"
                        id="review-link"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-b-md sm:rounded-r-md sm:rounded-b-none focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300"
                        value={data.link || ''}
                        readOnly
                      />
                      <button
                        onClick={handleCopyLink}
                        className={`mt-2 sm:mt-0 sm:ml-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          copied
                            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="qr-code" className="block text-sm font-medium text-gray-700 mb-2">
                      QR Code
                    </label>
                    <div className="mt-1 flex justify-center px-4 sm:px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="text-center">
                        <img
                          src={data.qrCodeDataURL}
                          alt="QR Code"
                          className="mx-auto h-36 w-36 sm:h-48 sm:w-48"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          Scan this QR code to access the review page
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={handleDownloadQRCode}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Download QR Code
                      </button>
                    </div>
                    {/* Hidden download link */}
                    <a
                      href={data.qrCodeDataURL}
                      download="qrcode.png"
                      ref={downloadLinkRef}
                      style={{ display: 'none' }}
                    >
                      Download QR Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
                <span className="text-sm text-gray-500 mb-2 sm:mb-0">Need help? Contact support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewLinkAndQRCode;