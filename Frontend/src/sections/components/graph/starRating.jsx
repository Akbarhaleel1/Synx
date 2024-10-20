import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'One Star', reviews:3 },
  { name: 'Two Star', reviews: 2 },
  { name: 'Three Star', reviews: 2 },
  { name: 'Four Star', reviews: 3 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded shadow">
        <p className="text-gray-200">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const PublicReviewChart = () => {
  return (
    <div className="bg-gray-950 rounded-lg p-6 h-[400px]">
      <div className="flex justify-between items-center mb-12">
        <span className="text-gray-400">since July 28</span>
        <h3 className="text-lg font-semibold text-white">New Public Review</h3>
      </div>
      {/* <p className="text-3xl font-bold mb-2 text-white">+3</p> */}
      <p className="text-sm text-gray-400 mb-5">
        Number of new public reviews
      </p>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="reviews" fill="#8884d8" barSize={20} />
            <Line type="monotone" dataKey="reviews" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PublicReviewChart;