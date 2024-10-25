"use client"

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function DietPlan() {
  const [dietPlan, setDietPlan] = useState([
    { name: "Breakfast", description: "Oatmeal with fruits", calories: 300 },
    { name: "Lunch", description: "Grilled chicken salad", calories: 450 },
    { name: "Dinner", description: "Salmon with vegetables", calories: 550 },
    { name: "Snacks", description: "Nuts and Greek yogurt", calories: 200 },
  ]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const total = dietPlan.reduce((sum, meal) => sum + meal.calories, 0);
    setTotalCalories(total);
  }, [dietPlan]);

  const handleDietChange = (index, field, value) => {
    const updatedDietPlan = [...dietPlan];
    if (field === 'calories') {
      updatedDietPlan[index][field] = parseInt(value) || 0;
    } else {
      updatedDietPlan[index][field] = value;
    }
    setDietPlan(updatedDietPlan);
  };

  const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F06292', '#AED581', '#7986CB', 
    '#FFD54F', '#4DB6AC', '#9575CD', '#F06292'
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Diet Plan</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Your daily meal plan and calories</p>
      </div>
      
      <div className="px-4 py-5 sm:px-6">
        <h4 className="text-lg leading-6 font-medium text-gray-900 mb-4">Calorie Distribution</h4>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dietPlan}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="calories"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {dietPlan.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dietPlan}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calories">
                  {dietPlan.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {dietPlan.map((meal, index) => (
            <div key={index} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <input
                  type="text"
                  value={meal.name}
                  onChange={(e) => handleDietChange(index, 'name', e.target.value)}
                  className="font-bold border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <textarea
                  value={meal.description}
                  onChange={(e) => handleDietChange(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="number"
                  value={meal.calories}
                  onChange={(e) => handleDietChange(index, 'calories', e.target.value)}
                  className="mt-2 w-32 border rounded px-2 py-1"
                  placeholder="Calories"
                />
              </dd>
            </div>
          ))}
        </dl>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <p className="font-bold">Total Calories: {totalCalories}</p>
        </div>
      </div>
    </div>
  );
} 