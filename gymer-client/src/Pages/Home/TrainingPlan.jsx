'use client'

import React, { useState, useEffect } from 'react'
import { Dumbbell, Flame, Clock, Info, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react'
import { format } from "date-fns"

export default function Component() {
  const [difficulty, setDifficulty] = useState('beginner')
  const [restTime, setRestTime] = useState(60)
  const [isResting, setIsResting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(restTime)
  const [progress, setProgress] = useState(0)
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState('male')
  const [calories, setCalories] = useState(0)
  const [workoutPlan, setWorkoutPlan] = useState({
    beginner: [
      {
        day: "Day 1",
        date: new Date(),
        exercises: [
          { name: "Squats", sets: 3, reps: "8-12" },
          { name: "Bench Press", sets: 3, reps: "8-12" },
          { name: "Bent-over Rows", sets: 3, reps: "8-12" },
          { name: "Overhead Press", sets: 3, reps: "8-12" },
          { name: "Planks", sets: 3, reps: "30-60 sec" },
        ]
      },
      {
        day: "Day 2",
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        exercises: [
          { name: "Deadlifts", sets: 3, reps: "8-12" },
          { name: "Pull-ups or Lat Pulldowns", sets: 3, reps: "8-12" },
          { name: "Dumbbell Lunges", sets: 3, reps: "8-12 each leg" },
          { name: "Dips or Tricep Pushdowns", sets: 3, reps: "8-12" },
          { name: "Bicycle Crunches", sets: 3, reps: "15-20 each side" },
        ]
      },
      {
        day: "Day 3",
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        exercises: [
          { name: "Leg Press", sets: 3, reps: "8-12" },
          { name: "Incline Dumbbell Press", sets: 3, reps: "8-12" },
          { name: "Cable Rows", sets: 3, reps: "8-12" },
          { name: "Dumbbell Shoulder Raises", sets: 3, reps: "8-12" },
          { name: "Russian Twists", sets: 3, reps: "15-20 each side" },
        ]
      }
    ],
    intermediate: [
      {
        day: "Day 1",
        date: new Date(),
        exercises: [
          { name: "Barbell Back Squats", sets: 4, reps: "6-8" },
          { name: "Barbell Bench Press", sets: 4, reps: "6-8" },
          { name: "Weighted Pull-ups", sets: 4, reps: "6-8" },
          { name: "Barbell Overhead Press", sets: 4, reps: "6-8" },
          { name: "Hanging Leg Raises", sets: 3, reps: "12-15" },
        ]
      },
      {
        day: "Day 2",
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        exercises: [
          { name: "Deadlifts", sets: 4, reps: "6-8" },
          { name: "Incline Dumbbell Press", sets: 4, reps: "8-10" },
          { name: "Barbell Rows", sets: 4, reps: "8-10" },
          { name: "Dumbbell Lunges", sets: 3, reps: "10-12 each leg" },
          { name: "Cable Woodchoppers", sets: 3, reps: "12-15 each side" },
        ]
      },
      {
        day: "Day 3",
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        exercises: [
          { name: "Front Squats", sets: 4, reps: "6-8" },
          { name: "Weighted Dips", sets: 4, reps: "8-10" },
          { name: "Weighted Chin-ups", sets: 4, reps: "8-10" },
          { name: "Barbell Hip Thrusts", sets: 3, reps: "10-12" },
          { name: "Plank with Alternating Leg Lifts", sets: 3, reps: "30-45 sec" },
        ]
      }
    ],
  })

  const exerciseDescriptions = {
    "Squats": "A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    "Bench Press": "An upper body compound movement that works the chest, shoulders, and triceps.",
    "Bent-over Rows": "A back exercise that targets the latissimus dorsi, rhomboids, and biceps.",
    "Overhead Press": "A shoulder exercise that also engages the triceps and upper chest.",
    "Planks": "A core strengthening exercise that also engages the shoulders, chest, and quads.",
    "Deadlifts": "A compound movement that works the entire posterior chain, including the back, glutes, and hamstrings.",
    "Pull-ups": "An upper body exercise that primarily targets the back and biceps.",
    "Lat Pulldowns": "A machine alternative to pull-ups, working similar muscle groups.",
    "Dumbbell Lunges": "A lower body exercise that works the quads, hamstrings, and glutes while also challenging balance.",
    "Dips": "An upper body exercise focusing on the chest, triceps, and shoulders.",
    "Tricep Pushdowns": "An isolation exercise for the triceps.",
    "Bicycle Crunches": "An abdominal exercise that also engages the obliques.",
    "Leg Press": "A machine-based lower body exercise targeting the quads, hamstrings, and glutes.",
    "Incline Dumbbell Press": "A variation of the bench press that places more emphasis on the upper chest.",
    "Cable Rows": "A back exercise that targets the middle back, lats, and biceps.",
    "Dumbbell Shoulder Raises": "An isolation exercise for the lateral deltoids.",
    "Russian Twists": "A core exercise that particularly targets the obliques.",
    "Barbell Back Squats": "A compound lower body exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    "Weighted Pull-ups": "An advanced variation of pull-ups that adds extra resistance for increased strength building.",
    "Hanging Leg Raises": "A challenging core exercise that targets the lower abs and hip flexors.",
    "Barbell Rows": "A compound back exercise that works the lats, rhomboids, and biceps.",
    "Cable Woodchoppers": "A rotational core exercise that targets the obliques and improves trunk rotation.",
    "Front Squats": "A squat variation that places more emphasis on the quadriceps and core stability.",
    "Weighted Dips": "An advanced variation of dips that adds extra resistance for increased upper body strength.",
    "Weighted Chin-ups": "An advanced pull-up variation that targets the biceps more than standard pull-ups.",
    "Barbell Hip Thrusts": "A lower body exercise that primarily targets the glutes and hamstrings.",
    "Plank with Alternating Leg Lifts": "A core stability exercise that also engages the hip flexors and improves balance.",
  }

  useEffect(() => {
    let interval
    if (isResting && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
        setProgress((prev) => prev + (100 / restTime))
      }, 1000)
    } else if (timeLeft === 0) {
      setIsResting(false)
      setProgress(0)
    }
    return () => clearInterval(interval)
  }, [isResting, timeLeft, restTime])

  const startRest = () => {
    setIsResting(true)
    setTimeLeft(restTime)
    setProgress(0)
  }

  const calculateCalories = () => {
    let bmr
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }
    setCalories(Math.round(bmr * 1.55))  // Assuming moderate activity level
  }

  const handleExerciseChange = (difficultyLevel, dayIndex, exerciseIndex, field, value) => {
    setWorkoutPlan(prevPlan => {
      const newPlan = JSON.parse(JSON.stringify(prevPlan))
      newPlan[difficultyLevel][dayIndex].exercises[exerciseIndex][field] = value
      return newPlan
    })
  }

  const handleDayChange = (difficultyLevel, dayIndex, field, value) => {
    setWorkoutPlan(prevPlan => {
      const newPlan = JSON.parse(JSON.stringify(prevPlan))
      newPlan[difficultyLevel][dayIndex][field] = value
      return newPlan
    })
  }

  const addExercise = (difficultyLevel, dayIndex) => {
    setWorkoutPlan(prevPlan => {
      const newPlan = JSON.parse(JSON.stringify(prevPlan))
      newPlan[difficultyLevel][dayIndex].exercises.push({ name: "New Exercise", sets: 3, reps: "8-12" })
      return newPlan
    })
  }

  const removeExercise = (difficultyLevel, dayIndex, exerciseIndex) => {
    setWorkoutPlan(prevPlan => {
      const newPlan = JSON.parse(JSON.stringify(prevPlan))
      newPlan[difficultyLevel][dayIndex].exercises.splice(exerciseIndex, 1)
      return newPlan
    })
  }

  const addDay = (difficultyLevel) => {
    setWorkoutPlan(prevPlan => {
      const newPlan = JSON.parse(JSON.stringify(prevPlan))
      const newDayNumber = newPlan[difficultyLevel].length + 1
      newPlan[difficultyLevel].push({
        day: `Day ${newDayNumber}`,
        date: new Date(new Date().setDate(new Date().getDate() + newDayNumber - 1)),
        exercises: [
          { name: "New Exercise", sets: 3, reps: "8-12" }
        ]
      })
      return newPlan
    })
  }

  const removeDay = (difficultyLevel, dayIndex) => {
    setWorkoutPlan(prevPlan => {
      const newPlan = JSON.parse(JSON.stringify(prevPlan))
      newPlan[difficultyLevel].splice(dayIndex, 1)
      return newPlan
    })
  }

  return (
    
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-gray-500 text-white p-4 sm:p-6 rounded-t-lg">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
            <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
            Enhanced Gym Training Plan
          </h1>
          <p className="text-purple-100 text-sm sm:text-base">Customizable workout plan with additional features</p>
        </div>
        <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <label htmlFor="difficulty" className="text-lg font-semibold">Difficulty:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full sm:w-[180px] p-2 border rounded"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>

          <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <label htmlFor="rest-time" className="text-lg font-semibold flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Rest Time: {restTime} seconds
            </label>
            <input
              type="range"
              id="rest-time"
              min="30"
              max="120"
              step="5"
              value={restTime}
              onChange={(e) => setRestTime(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {isResting && (
            <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between text-lg font-semibold">
                <span>Rest Timer: {timeLeft}s</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {!isResting && (
            <button
              onClick={startRest}
              className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center justify-center"
            >
              <Clock className="w-5 h-5 mr-2" />
              Start Rest Timer
            </button>
          )}

          <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold flex items-center">
              <Flame className="w-6 h-6 mr-2 text-orange-500" />
              Calorie Calculator
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight" className="block">Weight (kg)</label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="height" className="block">Height (cm)</label>
                <input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="age" className="block">Age</label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <button
              onClick={calculateCalories}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded flex items-center justify-center"
            >
              <Flame className="w-5 h-5 mr-2" />
              Calculate Calories
            </button>
            {calories > 0 && (
              <p className="text-lg font-semibold text-center">Estimated daily calorie needs: {calories} kcal</p>
            )}
          </div>

          {workoutPlan[difficulty].map((day, dayIndex) => (
            <div key={dayIndex} className="space-y-2 border-2 border-green-600 dark:border-green-900 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-green-100 dark:bg-green-900 p-2 rounded-t-lg">
                <input
                  type="text"
                  value={day.day}
                  onChange={(e) => handleDayChange(difficulty, dayIndex, 'day', e.target.value)}
                  className="w-full sm:w-32 bg-transparent font-semibold text-lg mb-2 sm:mb-0"
                />
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <input
                    type="date"
                    value={format(day.date, "yyyy-MM-dd")}
                    onChange={(e) => handleDayChange(difficulty, dayIndex, 'date', new Date(e.target.value))}
                    className="p-1 rounded border w-full sm:w-auto"
                  />
                </div>
                <button
                  onClick={() => removeDay(difficulty, dayIndex)}
                  className="text-red-500 hover:text-red-700 mt-2 sm:mt-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Exercise</th>
                      <th className="text-left">Sets</th>
                      <th className="text-left">Reps</th>
                      <th className="text-left">Info</th>
                      <th className="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <tr key={exerciseIndex}>
                        <td>
                          <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) => handleExerciseChange(difficulty, dayIndex, exerciseIndex, 'name', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => handleExerciseChange(difficulty, dayIndex, exerciseIndex, 'sets', Number(e.target.value))}
                            className="w-16 p-1 border rounded"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(difficulty, dayIndex, exerciseIndex, 'reps', e.target.value)}
                            className="w-24 p-1 border rounded"
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => alert(exerciseDescriptions[exercise.name] || "No description available.")}
                            className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 p-1 rounded flex items-center"
                          >
                            <Info className="h-4 w-4 mr-1" /> Info
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => removeExercise(difficulty, dayIndex, exerciseIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => addExercise(difficulty, dayIndex)}
                className="mt-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 p-2 rounded flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Exercise
              </button>
            </div>
          ))}
          <button
            onClick={() => addDay(difficulty)}
            className="mt-4 w-full bg-green-600 hover:bg-green-900 text-white p-2 rounded flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Day
          </button>
        </div>
      </div>
    
  )
}