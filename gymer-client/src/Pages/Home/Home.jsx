import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QuoteIcon, TrophyIcon } from 'lucide-react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const quotes = [
  "Don't stop when you're tired. Stop when you're done.",
  "The only bad workout is the one that didn't happen.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "Push yourself because no one else is going to do it for you.",
  "Great things never come from comfort zones."
];

const BMIChart = ({ bmi }) => {
  const categories = [
    { name: "Underweight", color: "#7FFFD4", range: [0, 18.5] },
    { name: "Normal", color: "#40E0D0", range: [18.5, 24.9] },
    { name: "Overweight", color: "#9370DB", range: [24.9, 29.9] },
    { name: "Obese", color: "#FF69B4", range: [29.9, 100] },
  ];

  const getBMICategory = (bmi) => {
    for (const category of categories) {
      if (bmi >= category.range[0] && bmi < category.range[1]) {
        return category.name;
      }
    }
    return "Obese";
  };

  const getIndicatorPosition = (bmi) => {
    const minBMI = 15;
    const maxBMI = 40;
    const position = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
    return Math.min(Math.max(position, 0), 100);
  };

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between mb-2">
        <span className="text-lg font-semibold">BMI: {bmi}</span>
        <span className="text-lg font-semibold text-green-500">{getBMICategory(bmi)}</span>
      </div>
      <div className="relative h-8 rounded-full overflow-hidden">
        {categories.map((category, index) => (
          <div
            key={index}
            className="absolute h-full"
            style={{
              backgroundColor: category.color,
              left: `${(category.range[0] - 15) * 4}%`,
              width: `${(category.range[1] - category.range[0]) * 4}%`,
            }}
          ></div>
        ))}
        <div
          className="absolute w-0.5 h-full bg-black"
          style={{ left: `${getIndicatorPosition(bmi)}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-sm text-gray-600">
        <span>15</span>
        <span>18.5</span>
        <span>24.9</span>
        <span>29.9</span>
        <span>40</span>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const [progress, setProgress] = useState({
    steps: 7500,
    calories: 500,
    exercise: 45,
  });

  useEffect(() => {
    // Set an initial quote
    setQuote(quotes[0]);
  }, []);

  const handleQuoteChange = () => {
    // Get a random quote from the array
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  const data = [
    { name: 'Steps', value: progress.steps / 10000 * 100, fill: '#82ca9d' }, // Green color
    { name: 'Calories', value: progress.calories / 600 * 100, fill: '#FF885B' }, // Orange color
    { name: 'Exercise', value: progress.exercise / 60 * 100, fill: '#113b1d' } // Dark green color
  ];

  const [userName, setUserName] = useState('John Doe'); // Simulating a logged-in user
  const [showBMI, setShowBMI] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBMI(bmiValue.toFixed(1));
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Overview Section */}
      <section className="mb-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Today's Overview</h2>
          <div className="space-y-4">
            {/* Radial Bar Chart */}
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-green-800">Fitness Progress</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="10%"
                  outerRadius="80%"
                  barSize={10}
                  data={data}
                >
                  <RadialBar
                    barSize={40}
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff' }}
                    background
                    clockWise
                    dataKey="value"
                    fill="#8884d8" // Default color
                  />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            {/* Daily Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Steps:</span>
                  <span className="font-semibold text-green-600">{progress.steps} / 10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Calories Burned:</span>
                  <span className="font-semibold text-orange-500">{progress.calories} / 600</span>
                </div>
                <div className="flex justify-between">
                  <span>Exercise Duration:</span>
                  <span className="font-semibold text-blue-300">{progress.exercise} min / 60 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Your Plan */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create Your Plan</h2>
          <p className="mb-4">
            Ready to take your fitness journey to the next level? Create a personalized plan tailored to your goals
            and preferences.
          </p>
          <button
            onClick={() => setShowBMI(true)}
            className="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
          {showBMI && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Calculate your BMI</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter your height in cm"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter your weight in kg"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                    Birthday
                  </label>
                  <input
                    id="birthday"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={calculateBMI}
                  className="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Calculate BMI
                </button>
                {bmi && <BMIChart bmi={parseFloat(bmi)} />}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="relative mb-12 bg-gradient-to-r from-red-100 via-red-200 to-orange--300 shadow-md rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <QuoteIcon className="h-12 w-12 text-green-600 cursor-pointer" onClick={handleQuoteChange} />
        </div>
        <img
          src="src/assets/cardio.png"
          alt="Animated Character"
          className="absolute top-4 right-4 h-24 w-auto"
        />
        <h2 className="text-xl font-semibold mb-4">Motivational Quote</h2>
        <p className="italic text-gray-700" onClick={handleQuoteChange}>
          {quote}
        </p>
      </section>

      {/* Weekly Challenge */}
      <section className="relative mb-12 bg-cover bg-center bg-no-repeat shadow-md rounded-lg p-6 text-center"
        style={{ backgroundImage: "url('src/assets/00.jpg')" }}
      >
        <TrophyIcon className="absolute top-4 left-1/2 transform -translate-x-1/2 h-12 w-12 text-orange-400" />
        <div className="bg-opacity-60 bg-gray-800 p-6 rounded-lg mt-12">
          <h2 className="text-lg font-semibold mt-4 mb-4 text-white">Weekly Challenge</h2>
          <p className="text-gray-200 mb-4">Complete 5 hours of exercise this week to win a reward!</p>
          <button className="bg-orange-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg">Join Challenge</button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-800 text-white py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Testimonials</h2>
        <div className="max-w-4xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <p className="italic">"This app changed my life. I'm in the best shape I've ever been!"</p>
            <span className="block mt-4 font-semibold">- Jane Doe</span>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <p className="italic">"The personalized plans are perfect for my fitness goals."</p>
            <span className="block mt-4 font-semibold">- Mark Smith</span>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <p className="italic">"I love the challenges! They keep me motivated and engaged."</p>
            <span className="block mt-4 font-semibold">- Alice Lee</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
