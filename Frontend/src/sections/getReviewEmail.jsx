import React, { useState } from 'react';
import Nav from '../components/Nav';

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="toggle-slider"></span>
  </label>
);

const GetReviewsEmail = () => {
  const [autoReminder3Days, setAutoReminder3Days] = useState(false);
  const [autoReminder7Days, setAutoReminder7Days] = useState(false);

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
          <a href="/GetReviews/qrcode">
            <button className="bg-gray-900 px-4 py-2 rounded-md text-gray-400 font-bold w-full lg:w-auto">
              QR Code
            </button>
          </a>
        </div>
        {/* Request Reviews via SMS */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Request reviews via SMS</h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <p>Invite Your Customers</p>
            <p className="text-gray-400">Monthly limits: 0/10</p>
          </div>
          <p className="mb-2">
            Do you have a list of contacts? <span className="text-blue-500">Upload CSV</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input type="text" placeholder="Name" className="bg-gray-800 p-2 rounded-lg w-full sm:w-1/2" />
            <input type="text" placeholder="Email" className="bg-gray-800 p-2 rounded-lg w-full sm:w-1/2" />
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="consent" className="mr-2" />
            <label htmlFor="consent">I have consent to send messages to this contact</label>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <button className="border border-white px-4 py-2 rounded-lg w-full sm:w-auto">+ Add Line</button>
            <button className="bg-black text-white px-4 py-2 rounded-lg w-full sm:w-auto">Request a Review</button>
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
                  <p className="mb-2">Thank you for choosing [Company Name]. We'd love to hear your feedback.</p>
                  <a href="#" className="text-blue-500 underline">
                    [Review Link]
                  </a>
                  <p className="mt-4">
                    Best regards,
                    <br />
                    [Company Name]
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
                  placeholder="Enter your company name"
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email-content" className="block text-sm font-medium mb-2">
                  Email Content
                </label>
                <textarea
                  id="email-content"
                  rows="6"
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                  placeholder="Hi [Name], thank you for choosing [Company Name]. We'd love to hear your feedback. [Review Link]"
                ></textarea>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-500 text-white rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-purple-600">
                  [Name]
                </span>
                <span className="bg-purple-500 text-white rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-purple-600">
                  [Company Name]
                </span>
                <span className="bg-purple-500 text-white rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-purple-600">
                  [Review Link]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Automatic Email Reminders */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Send an automatic SMS reminder every 3 and/or 7 days if the customer did not leave a review.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white shadow-inner p-4 rounded-lg w-full sm:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Trigger reminders after 3 days</h3>
                <ToggleSwitch checked={autoReminder3Days} onChange={() => setAutoReminder3Days(!autoReminder3Days)} />
              </div>
              <h4 className="text-md font-semibold mb-2">Customize the message</h4>
              <textarea
                className="bg-gray-900 p-2 rounded-lg w-full h-24 mb-4"
                placeholder="Hi [Name], thanks for choosing [Company Name]. We ask you to leave us a review. [Link here]"
              ></textarea>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs">Company Name</span>
                <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs">Name</span>
                <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs">Link Here</span>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-lg w-full">Save</button>
            </div>
            <div className="bg-white shadow-inner p-4 rounded-lg w-full sm:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Trigger reminders after 7 days</h3>
                <ToggleSwitch checked={autoReminder7Days} onChange={() => setAutoReminder7Days(!autoReminder7Days)} />
              </div>
              <h4 className="text-md font-semibold mb-2">Customize the message</h4>
              <textarea
                className="bg-gray-900 p-2 rounded-lg w-full h-24 mb-4"
                placeholder="Hi [Name], thanks for choosing [Company Name]. We would appreciate your feedback. [Link here]"
              ></textarea>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs">Company Name</span>
                <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs">Name</span>
                <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs">Link Here</span>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-lg w-full">Save</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetReviewsEmail;
