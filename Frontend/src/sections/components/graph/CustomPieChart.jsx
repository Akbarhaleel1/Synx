// import React from 'react';
// import ReactECharts from 'echarts-for-react';

// const CustomPieChart = () => {
//   const option = {
//     backgroundColor: '#2c343c',
//     title: {
//       text: 'Review Growth',
//       left: 'center',
//       top: 20,
//       textStyle: {
//         color: '#ccc',
//       },
//     },
//     tooltip: {
//       trigger: 'item',
//     },
//     visualMap: {
//       show: false,
//       min: 80,
//       max: 600,
//       inRange: {
//         colorLightness: [0, 1],
//       },
//     },
//     series: [
//       {
//         name: 'Review Source',
//         type: 'pie',
//         radius: '55%',
//         center: ['50%', '50%'],
//         data: [
//           { value: 400, name: 'New Reviews' },
//           { value: 335, name: 'Repeat Reviews' },
//           { value: 310, name: 'Prompted Reviews' },
//           { value: 274, name: 'Social Media Reviews' },
//           { value: 235, name: 'Other Sources' },
//         ].sort((a, b) => a.value - b.value),
//         roseType: 'radius',
//         label: {
//           color: 'rgba(255, 255, 255, 0.3)',
//         },
//         labelLine: {
//           lineStyle: {
//             color: 'rgba(255, 255, 255, 0.3)',
//           },
//           smooth: 0.2,
//           length: 10,
//           length2: 20,
//         },
//         itemStyle: {
//           color: '#c23531',
//           shadowBlur: 200,
//           shadowColor: 'rgba(0, 0, 0, 0.5)',
//         },
//         animationType: 'scale',
//         animationEasing: 'elasticOut',
//         animationDelay: (idx) => Math.random() * 200,
//       },
//     ],
//   };

//   return (
//     <div>
//       <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
//     </div>
//   );
// };

// export default CustomPieChart;


import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

const CustomPieChart = () => {
  const [timeFrame, setTimeFrame] = useState('yearly');

  const getDataForTimeFrame = (frame) => {
    switch (frame) {
      case 'yearly':
        return [
          { value: 400, name: '2023' },
          { value: 335, name: '2022' },
          { value: 310, name: '2021' },
          { value: 274, name: '2020' },
          { value: 235, name: '2019' },
        ];
      case 'monthly':
        return [
          { value: 400, name: 'Dec' },
          { value: 335, name: 'Nov' },
          { value: 310, name: 'Oct' },
          { value: 274, name: 'Sep' },
          { value: 235, name: 'Aug' },
        ];
      case 'weekly':
        return [
          { value: 400, name: 'Week 5' },
          { value: 335, name: 'Week 4' },
          { value: 310, name: 'Week 3' },
          { value: 274, name: 'Week 2' },
          { value: 235, name: 'Week 1' },
        ];
      default:
        return [];
    }
  };

  const option = {
    backgroundColor: '#2c343c',
    title: {
      text: 'Review Growth',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: 'Review Growth',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: getDataForTimeFrame(timeFrame).sort((a, b) => a.value - b.value),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: (idx) => Math.random() * 200,
      },
    ],
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <select
        value={timeFrame}
        onChange={(e) => setTimeFrame(e.target.value)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1,
          padding: '5px',
          backgroundColor: '#4a4a4a',
          color: '#ccc',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
      </select>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default CustomPieChart;