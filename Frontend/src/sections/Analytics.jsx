import Nav from "../components/Nav";

const AnalyticsDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Adjust the width of the Nav component based on screen size */}
      <Nav className="w-full md:w-64" />

      {/* Ensure the main content fills the remaining space and adjusts accordingly */}
      <main className="flex-1 p-4 md:p-8 bg-[rgb(241,241,241)] md:ml-64">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2 text-black">Analytics</h2>
          <p className="text-black mb-6">
            Monitor how your online reputation is improving over time. The
            reported data is updated once a day.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Public Review */}
            <div className="bg-gray-950 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">since July 28</span>
                <h3 className="text-lg font-semibold">New Public Review</h3>
              </div>
              <p className="text-3xl font-bold mb-4">+3</p>
              <p className="text-sm text-gray-400 mb-2">
                Number of new public reviews
              </p>
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="w-8">5★</span>
                  <div className="flex-1 h-2 bg-green-500 rounded"></div>
                </div>
                <div className="flex items-center">
                  <span className="w-8">4★</span>
                  <div className="flex-1 h-2 bg-gray-600 rounded"></div>
                </div>
                <div className="flex items-center">
                  <span className="w-8">3★</span>
                  <div className="flex-1 h-2 bg-gray-600 rounded"></div>
                </div>
                <div className="flex items-center">
                  <span className="w-8">2★</span>
                  <div className="flex-1 h-2 bg-gray-600 rounded"></div>
                </div>
                <div className="flex items-center">
                  <span className="w-8">1★</span>
                  <div className="flex-1 h-2 bg-red-500 rounded w-1/4"></div>
                </div>
              </div>
            </div>

            {/* Review Growth */}
            <div className="bg-gray-950 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Review Growth</h3>
              <div className="h-48 bg-gray-950 rounded relative">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around">
                  <div className="w-1/5 bg-red-400 h-1/3"></div>
                  <div className="w-1/5 bg-red-400 h-2/3"></div>
                  <div className="w-1/5 bg-red-400 h-1/2"></div>
                  <div className="w-1/5 bg-red-400 h-5/6"></div>
                </div>
              </div>
            </div>

            {/* Review Funnel */}
            <div className="bg-gray-950 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Review Funnel</h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>🌟 Invites Sent</span>
                  <span className="bg-gray-600 px-3 py-1 rounded-full">4</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>👁️ Total Unique Visits</span>
                  <span className="bg-gray-600 px-3 py-1 rounded-full">1</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>📱 QR Code Unique Visits</span>
                  <span className="bg-gray-600 px-3 py-1 rounded-full">3</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>💬 New Public Reviews</span>
                  <span className="bg-gray-600 px-3 py-1 rounded-full">0</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>⚠️ Negative Feedbacks</span>
                  <span className="bg-gray-600 px-3 py-1 rounded-full">0</span>
                </li>
              </ul>
            </div>

            {/* Average Rating Growth */}
            <div className="bg-gray-950 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Average Rating Growth</h3>
              <div className="h-48 bg-gray-950 rounded relative">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around">
                  <div className="w-1/5 bg-red-400 h-1/4"></div>
                  <div className="w-1/5 bg-red-400 h-1/2"></div>
                  <div className="w-1/5 bg-red-400 h-1/3"></div>
                  <div className="w-1/5 bg-red-400 h-3/4"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
