import React, { useState } from "react";
import Logo from "/src/assets/logo.png";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"; // Ensure you have Heroicons installed

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="text-white duration-200 relative z-40 ">
      {/* upper Navbar */}
      <div className="py-2">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
            </a>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <XMarkIcon className="h-8 w-8 text-white" />
              ) : (
                <Bars3Icon className="h-8 w-8 text-white" />
              )}
            </button>
          </div>

          {/* Navbar Links for Desktop */}
          <ul className="hidden lg:flex gap-4 text-lg font-semibold">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#howitworks">How it works</a>
            </li>
            
            <li>
              <a href="#contactus">Contact Us</a>
            </li>
          </ul>

        
  

          {/* Right side button */}
          <div className="hidden lg:flex gap-4 text-lg font-semibold">
            <button className="bg-green-900 hover:bg-green-950 text-white p-2 px-[2.2rem] rounded-[2rem] font-semibold">
              <Link to="/signup">Start Now</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black">
          <ul className="flex flex-col items-center gap-4 text-lg font-semibold py-4">
            <li>
              <a href="#home" onClick={toggleMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#howitworks" onClick={toggleMenu}>
                How it works
              </a>
            </li>
            <li>
              <a href="#aboutus" onClick={toggleMenu}>
                About Us
              </a>
            </li>
            <li>
              <a href="#contactus" onClick={toggleMenu}>
                Contact Us
              </a>
            </li>
            <li>
              <button
                onClick={toggleMenu}
                className="bg-green-900 hover:bg-green-950 text-white p-2 px-[2.2rem] rounded-[2rem] font-semibold"
              >
                <Link to="/signup">Start Now</Link>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;