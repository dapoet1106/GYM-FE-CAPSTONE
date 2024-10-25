import React from 'react';
import Image1 from '../assets/Weekly.jpg';
import Image2 from '../assets/Monthly.jpg';
import Image3 from '../assets/calculate.jpg';

const ServicesData = [
  {
    id: 1,
    img: Image1,
    name: 'Weekly',
    description: 'A personalized weekly plan tailored to your goals and needs.',
    aosDelay: '100',
  },
  {
    id: 2,
    img: Image2,
    name: 'Monthly',
    description: 'Track your progress monthly with a detailed workout routine.',
    aosDelay: '300',
  },
  {
    id: 3,
    img: Image3,
    name: 'Calculate',
    description: 'Easily calculate your calorie intake and track your nutrition.',
    aosDelay: '500',
  },
];

const Howitworks = () => {
  return (
    <div className='bg-customGreen py-10 px-5'>
      <div className='container mx-auto'>
        {/* Header Title */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-black'>
            Plan Your Workout Routine
          </h1>
        </div>

        {/* Services Card Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
          {ServicesData.map((data, index) => (
            <div
              key={index}
              className='relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'
            >
              <img src={data.img} alt={data.name} className='w-full h-48 object-cover' />
              <div className='p-5'>
                <h2 className='text-2xl font-semibold text-black mb-2'>{data.name}</h2>
                <p className='text-gray-700'>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Howitworks;
