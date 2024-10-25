import React from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="overflow-hidden w-full h-[40rem] md:h-[50rem] lg:h-[60rem] bg-no-repeat bg-cover bg-[url('src/assets/first.jpg')] relative">
      <Navbar />
      <div className="text-white absolute top-[4rem] md:top-[6rem] lg:top-[8rem] left-[2rem] sm:left-[4rem] md:left-[6rem] lg:left-[8rem]">
        <div className="text-4xl sm:text-7xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <h1 className="mb-3">GET FIT</h1>
          <h1 className="mb-3">GET STRONG</h1>
          <h1 className="mb-3">GET HEALTHY</h1>
        </div>
        <p className="text-sm sm:text-base md:text-lg max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem] my-4 md:my-8">
          Welcome to our fitness training program designed to help you achieve your fitness goals with the help of desired trainers and a workout plan. Lorem ipsum dolor sit amet, consectetur adipisicing elit. In iusto inventore excepturi, aliquid placeat, eum, necessitatibus deleniti labore fuga consectetur itaque! Consequuntur ipsa quas distinctio harum quasi earum illo quam.
        </p>
        <div className="flex gap-2 text-sm sm:text-lg mt-8 md:mt-12">
          <button className="bg-green-900 hover:bg-green-950 text-white px-4 sm:px-[2.2rem] py-2 rounded-xl">
            <Link to="/login">LOGIN</Link>
          </button>
          <button className="rounded-xl px-4 sm:px-[2.2rem] py-2 text-white border border-white hover:bg-white hover:text-green-900">
            <Link to="/signup">SIGNUP</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
