import React, { useState } from 'react'

const StarIcon = ({ filled, half }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill={filled || half ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    {half && (
      <path fill="currentColor" d="M12 2.24l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69L12 2.24z" clipPath="url(#half-star-clip)" />
    )}
    {half && (
      <defs>
        <clipPath id="half-star-clip">
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>
    )}
  </svg>
)

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} filled={true} />
      ))}
      {hasHalfStar && <StarIcon half={true} />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <StarIcon key={i + fullStars} filled={false} />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  )
}

const trainers = [
  { id: 1, name: "Mike Johnson", specialty: "Weight Training", imageUrl: "/src/assets/mike-johnson.jpg?height=200&width=200", rating: 4.5 },
  { id: 2, name: "Sarah Lee", specialty: "Yoga", imageUrl: "src/assets/Sarah Lee.jpg?height=200&width=200", rating: 5 },
  { id: 3, name: "Jane Smith Chen", specialty: "Cardio", imageUrl: "src/assets/jane-smith.jpg?height=200&width=200", rating: 4 },
  { id: 4, name: "Emma Wilson", specialty: "Pilates", imageUrl: "/src/assets/Emma-Wilson.jpg?height=200&width=200", rating: 4.5 },
  { id: 5, name: "John Doe", specialty: "CrossFit", imageUrl: "/src/assets/john-doe.jpg?height=200&width=200", rating: 3.5 },
  { id: 6, name: "Lisa Taylor", specialty: "Nutrition", imageUrl: "src/assets/Lisa-Taylor.jpg?height=200&width=200", rating: 5 },
]

export default function Component() {
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSelectTrainer = (trainerId) => {
    setSelectedTrainer(trainerId)
    setShowConfirmation(false)
  }

  const handleContinue = () => {
    setShowConfirmation(true)
  }

  const selectedTrainerName = trainers.find(trainer => trainer.id === selectedTrainer)?.name

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Trainer</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={trainer.imageUrl} alt={trainer.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{trainer.name}</h2>
              <p className="text-gray-600">{trainer.specialty}</p>
              <div className="mt-2">
                <StarRating rating={trainer.rating} />
              </div>
            </div>
            <div className="p-4 bg-gray-50">
              <button
                className={`w-full py-2 px-4 rounded-md transition-colors ${selectedTrainer === trainer.id
                    ? 'bg-green-500 text-white'
                    : 'bg-green-900 text-white hover:bg-green-950'
                  }`}
                onClick={() => handleSelectTrainer(trainer.id)}
              >
                {selectedTrainer === trainer.id ? (
                  <>
                    <svg className="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Selected
                  </>
                ) : (
                  'Select Trainer'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedTrainer && (
        <div className="mt-8 text-center">
          <button
            className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-colors text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={handleContinue}
          >
            Continue with Selected Trainer
          </button>
        </div>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
            <p className="mb-6">You have selected {selectedTrainerName} as your trainer. Would you like to proceed?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                onClick={() => {
                  // Here you would typically navigate to the next page or perform some action
                  alert(`Great! You're all set with ${selectedTrainerName}. Let's start your fitness journey!`)
                  setShowConfirmation(false)
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}