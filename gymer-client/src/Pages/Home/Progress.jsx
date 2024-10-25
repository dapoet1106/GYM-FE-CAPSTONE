import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function App() {
  // States and data for the line chart
  const [data] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis labels
    datasets: [
      {
        label: 'Monthly Distance',
        data: [30, 40, 35, 50, 60, 55, 70], // Y-axis data
        fill: false,
        borderColor: '#4A90E2',
        backgroundColor: '#4A90E2',
        tension: 0.1,
        pointBackgroundColor: '#4A90E2',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Target Distance',
        data: [25, 45, 40, 55, 65, 60, 75], // Y-axis data for target
        fill: false,
        borderColor: '#E94E77',
        backgroundColor: '#E94E77',
        tension: 0.1,
        pointBackgroundColor: '#E94E77',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure responsiveness
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw} km`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#333',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
        },
        ticks: {
          color: '#333',
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">This Week</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 mb-1">Top Distance</p>
            <p className="text-lg font-bold">95.55KM</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Elev Gain</p>
            <p className="text-lg font-bold">34M</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Best Time</p>
            <p className="text-lg font-bold">37M 4s</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Level Point</p>
            <p className="text-lg font-bold">1600+</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-8">
          <div className="w-full max-w-xs mx-auto h-48">
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="mt-4 sm:mt-6">
          <p className="text-gray-500">Distance: 70.8KM</p>
          <p className="text-gray-500">Time: 2:25:03</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Health Tracker</h2>
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3 1.343 3 3 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3 1.343 3 3 3z" /></svg>
            <p className="text-3xl font-bold text-red-500">83Kg</p>
            <span className="bg-green-100 text-green-500 text-sm font-medium px-2 py-1 rounded-full ml-2">
              +10%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-gray-500 mb-1">Age</p>
              <p className="text-lg font-bold">21</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-gray-500 mb-1">Gain Muscle</p>
              <p className="text-lg font-bold">55%</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-gray-500 mb-1">Calories Burnt</p>
              <p className="text-lg font-bold">300Kcal</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Daily Goals</h2>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-9-9 9 9 0 019 9z" /></svg>
              <p className="text-lg font-bold text-gray-500">Morning Run</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 mb-1">Steps</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-green-500 rounded-full h-4" style={{ width: `${(1780 / 1700) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">1780/1700</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Calories</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-purple-500 rounded-full h-4" style={{ width: `${(300 / 400) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">300/400</p>
              </div>
            </div>
          </div>
          {/* Map goes here */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Customize your Workout Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-9-9 9 9 0 019 9z" /></svg>
            <p className="text-lg font-bold mb-2">Strength Training</p>
            <p className="text-gray-500">Build muscle and strength</p>
          </div>
          <div className="bg-green-100 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-9-9 9 9 0 019 9z" /></svg>
            <p className="text-lg font-bold mb-2">Cardio</p>
            <p className="text-gray-500">Improve endurance and heart health</p>
          </div>
          <div className="bg-red-100 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-9-9 9 9 0 019 9z" /></svg>
            <p className="text-lg font-bold mb-2">Flexibility</p>
            <p className="text-gray-500">Increase range of motion and flexibility</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-9-9 9 9 0 019 9z" /></svg>
            <p className="text-lg font-bold mb-2">Balance</p>
            <p className="text-gray-500">Enhance stability and coordination</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
