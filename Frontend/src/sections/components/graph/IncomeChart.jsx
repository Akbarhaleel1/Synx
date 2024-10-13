// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { date: '2000-01', uv: 4000, pv: 2400, amt: 2400 },
//   { date: '2000-02', uv: 3000, pv: 1398, amt: 2210 },
//   { date: '2000-03', uv: 2000, pv: 9800, amt: 2290 },
//   { date: '2000-04', uv: 2780, pv: 3908, amt: 2000 },
//   { date: '2000-05', uv: 1890, pv: 4800, amt: 2181 },
//   { date: '2000-06', uv: 2390, pv: 3800, amt: 2500 },
//   { date: '2000-07', uv: 3490, pv: 4300, amt: 2100 },
//   { date: '2000-08', uv: 4000, pv: 2400, amt: 2400 },
//   { date: '2000-09', uv: 3000, pv: 1398, amt: 2210 },
//   { date: '2000-10', uv: 2000, pv: 9800, amt: 2290 },
//   { date: '2000-11', uv: 2780, pv: 3908, amt: 2000 },
//   { date: '2000-12', uv: 1890, pv: 4800, amt: 2181 },
// ];

// const monthTickFormatter = (tick) => {
//   const date = new Date(tick);
//   return date.getMonth() + 1;
// };

// const renderQuarterTick = (tickProps) => {
//   const { x, y, payload } = tickProps;
//   const { value, offset } = payload;
//   const date = new Date(value);
//   const month = date.getMonth();
//   const quarterNo = Math.floor(month / 3) + 1;
//   const isLast = month === 11;

//   if (month % 3 === 1) {
//     return <text x={x} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
//   }

//   if (month % 3 === 0 || isLast) {
//     const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;
//     return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
//   }
//   return null;
// };

// const BarChartExample = () => {
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <BarChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
//         <XAxis
//           dataKey="date"
//           axisLine={false}
//           tickLine={false}
//           interval={0}
//           tick={renderQuarterTick}
//           height={1}
//           scale="band"
//           xAxisId="quarter"
//         />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="pv" fill="#8884d8" />
//         <Bar dataKey="uv" fill="#82ca9d" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default BarChartExample;
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2000-01', uv: 4000, pv: 2400, amt: 2400 },
  { date: '2000-02', uv: 3000, pv: 1398, amt: 2210 },
  { date: '2000-03', uv: 2000, pv: 9800, amt: 2290 },
  { date: '2000-04', uv: 2780, pv: 3908, amt: 2000 },
  { date: '2000-05', uv: 1890, pv: 4800, amt: 2181 },
  { date: '2000-06', uv: 2390, pv: 3800, amt: 2500 },
  { date: '2000-07', uv: 3490, pv: 4300, amt: 2100 },
  { date: '2000-08', uv: 4000, pv: 2400, amt: 2400 },
  { date: '2000-09', uv: 3000, pv: 1398, amt: 2210 },
  { date: '2000-10', uv: 2000, pv: 9800, amt: 2290 },
  { date: '2000-11', uv: 2780, pv: 3908, amt: 2000 },
  { date: '2000-12', uv: 1890, pv: 4800, amt: 2181 },
];

// Filter logic
const filterDataByTime = (data, filter) => {
  switch (filter) {
    case 'yearly':
      return data.filter(d => d.date.includes('2000'));
    case 'monthly':
      return data; // For simplicity, using all data for now, but can extend to specific months.
    case 'daily':
      // Mock daily data (you need to generate daily data to match the format if required)
      return data.slice(0, 7); // For now, using just the first 7 items as daily
    default:
      return data;
  }
};

const BarChartExample = () => {
  const [filter, setFilter] = useState('monthly');

  // Filtered data based on user selection
  const filteredData = filterDataByTime(data, filter);

  return (
    <div>
      {/* Centered h1 */}
      <h1 style={{ textAlign: 'center', color: 'black', marginBottom: '20px' }}>Bar Chart with Filter</h1>
      
      {/* Dropdown for filter selection with a beautiful button style */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', color: 'black', fontSize: '16px' }}>View by: </label>
        <select 
          onChange={(e) => setFilter(e.target.value)} 
          value={filter} 
          style={{
            background: 'linear-gradient(90deg, rgba(0,176,155,1) 0%, rgba(150,201,61,1) 100%)',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <option className='text-black' value="yearly">Yearly</option>
          <option className='text-black' value="monthly">Monthly</option>
          <option className='text-black' value="daily">Daily</option>
        </select>
      </div>

      {/* Responsive container for the chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartExample;
