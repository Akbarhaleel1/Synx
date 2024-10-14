
import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import useAuth from './customHooks/useAuth';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import CustomPieChart from "./components/graph/CustomPieChart";
import IncomeChart from "./components/graph/IncomeChart";
import PublicReviewChart from "./components/graph/starRating";
import {useNavigate} from 'react-router-dom';



const getStartOfWeek = () => {
  const now = new Date();
  const firstDayOfWeek = now.getDate() - now.getDay();
  return new Date(now.setDate(firstDayOfWeek));
};


const getStartOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

const getStartOfYear = () => {
  const now = new Date();
  return new Date(now.getFullYear(), 0, 1);
};

const filterDataByDateRange = (data, rangeStart) => {
  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= rangeStart;
  });
};

const ReviewFunnel = ({ funnelData, selectedRange, setSelectedRange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    setIsOpen(false);
  };

  return (
    <div className="bg-gray-950 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Review Funnel</h3>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-32 px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            {selectedRange}
            <ChevronDown className="w-5 h-5 ml-2" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-md shadow-lg z-10">
              {['Weekly', 'Monthly', 'Yearly'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleRangeSelect(range)}
                  className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-600 focus:outline-none"
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        <li className="flex justify-between items-center">
          <span>🌟 Invites Sent</span>
          <span className="bg-gray-600 px-3 py-1 rounded-full">{funnelData.invitesSent}</span>
        </li>
        <li className="flex justify-between items-center">
          <span>👁️ Total Unique Visits</span>
          <span className="bg-gray-600 px-3 py-1 rounded-full">{funnelData.uniqueVisits}</span>
        </li>
        <li className="flex justify-between items-center">
          <span>📱 QR Code Unique Visits</span>
          <span className="bg-gray-600 px-3 py-1 rounded-full">{funnelData.qrVisits}</span>
        </li>
        {/* <li className="flex justify-between items-center">
          <span>💬 New Public Reviews</span>
          <span className="bg-gray-600 px-3 py-1 rounded-full">{funnelData.publicReviews}</span>
        </li> */}
        <li className="flex justify-between items-center">
          <span>⚠️ Negative Feedbacks</span>
          <span className="bg-gray-600 px-3 py-1 rounded-full">{funnelData.negativeFeedbacks}</span>
        </li>
      </ul>
    </div>
  );
};

const AnalyticsDashboard = () => {
  useAuth();

  const navigate = useNavigate()


  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [selectedRange, setSelectedRange] = useState('Weekly');
  const [funnelData, setFunnelData] = useState({
    invitesSent: 0,
    uniqueVisits: 0,
    qrVisits: 0,
    publicReviews: 0,
    negativeFeedbacks: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedUser = localStorage.getItem('user');
        const user = parsedUser ? JSON.parse(parsedUser) : null;
        const getToken = localStorage.getItem('token');
        const token = getToken ? JSON.parse(getToken) : null;

        if (!user || !token) {
          console.error('User or token is not available in local storage');
          return;
        }

        const response = await axios.post('https://synxbackend.synxautomate.com/analytics', { user }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if(response.data.message === "Not Found"){
          navigate('/PricingTable')
          return
        }

        const data = response.data;

        console.log('response'.response)
        console.log('data is'.data)

        const weekStart = getStartOfWeek();
        const monthStart = getStartOfMonth();
        const yearStart = getStartOfYear();

        setWeeklyData({
          negative: filterDataByDateRange(data.negative, weekStart),
          qr: filterDataByDateRange(data.qr, weekStart),
          visitCount: filterDataByDateRange(data.visitCount, weekStart),
          inviteSend: filterDataByDateRange(data.linksentcount, weekStart)
        });

        setMonthlyData({
          negative: filterDataByDateRange(data.negative, monthStart),
          qr: filterDataByDateRange(data.qr, monthStart),
          visitCount: filterDataByDateRange(data.visitCount, monthStart),
          inviteSend: filterDataByDateRange(data.linksentcount, monthStart)
        });

        setYearlyData({
          negative: filterDataByDateRange(data.negative, yearStart),
          qr: filterDataByDateRange(data.qr, yearStart),
          visitCount: filterDataByDateRange(data.visitCount, yearStart),
          inviteSend: filterDataByDateRange(data.linksentcount, yearStart)
        });

        updateFunnelData(data, selectedRange);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedRange]);

  const updateFunnelData = (data, range) => {
    const rangeStart = range === 'Weekly' ? getStartOfWeek() :
      range === 'Monthly' ? getStartOfMonth() :
        getStartOfYear();

    setFunnelData({
      invitesSent: filterDataByDateRange(data.invitesSent || [], rangeStart).length,
      uniqueVisits: filterDataByDateRange(data.visitCount || [], rangeStart).length,
      qrVisits: filterDataByDateRange(data.qr || [], rangeStart).length,
      // publicReviews: filterDataByDateRange(data.publicReviews || [], rangeStart).length,
      negativeFeedbacks: filterDataByDateRange(data.negative || [], rangeStart).length,
    });
  };

  const getCurrentData = () => {
    if (selectedRange === 'Weekly') return weeklyData;
    if (selectedRange === 'Monthly') return monthlyData;
    if (selectedRange === 'Yearly') return yearlyData;
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      <Nav className="w-full md:w-64" />
      <main className="flex-1 p-4 md:p-8 bg-[rgb(241,241,241)] md:ml-64">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2 text-black">Analytics</h2>
          <p className="text-black mb-6">
            Monitor how your online reputation is improving over time. The
            reported data is updated once a day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Public Review */}
            <PublicReviewChart />


            <CustomPieChart />

            {/* Review Funnel */}
            <ReviewFunnel
              funnelData={funnelData}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
            />

            <IncomeChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;