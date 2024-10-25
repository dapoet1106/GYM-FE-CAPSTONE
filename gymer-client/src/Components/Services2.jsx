import React from 'react';

const Services = () => {
  return (
    <div className='bg-customGreen py-10 px-5'>
      <div className='container mx-auto'>
        {/* Header Title */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-black'>
            Plan Your Diet
          </h1>
        </div>

        {/* Background Image Section */}
        <div className='relative w-full h-[40rem] bg-no-repeat bg-cover bg-center' style={{ backgroundImage: "url('src/assets/salad-2068220.jpg')" }}>
          <div className='absolute inset-0 flex items-center justify-start p-8 md:p-16'>
            <div className='text-white font-semibold text-xl md:text-2xl max-w-lg md:max-w-xl'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, aperiam soluta at nulla, aliquam facere voluptatibus consectetur, vero porro sint nihil vitae non praesentium. Odio odit aperiam quo minus corrupti.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
