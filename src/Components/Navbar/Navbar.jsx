import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='w-full bg-transparent flex justify-center items-center'>
      <nav className='w-full md:w-4/5 lg:w-3/4 bg-primary text-white rounded-b-lg fixed top-0 z-20 py-3 md:py-4 px-4 md:px-6 flex justify-center items-center shadow-lg min-h-[5vh]'>
        <div className='flex justify-between items-center w-full'>
          {/* Logo */}
          <div className='font-bold new-font text-2xl md:text-[34px]'>
            <h1>Farm<span className='text-[#ff8c33]'>izz</span></h1>
          </div>
          
          {/* Navigation Links - Desktop */}
          <div className='hidden md:flex items-center'>
            <ul className='flex space-x-3 lg:space-x-7 basic-font items-center'>
              <li className='hover:text-[#ff8c33] text-base lg:text-[1.2rem] cursor-pointer transition-colors duration-300'>Home</li>
              <li className='hover:text-[#ff8c33] text-base lg:text-[1.2rem] cursor-pointer transition-colors duration-300'>Our Fruits</li>
              <li className='hover:text-[#ff8c33] text-base lg:text-[1.2rem] cursor-pointer transition-colors duration-300'>Our Farm</li>
              <li className='hidden lg:block hover:text-[#ff8c33] text-base lg:text-[1.2rem] cursor-pointer transition-colors duration-300'>Sustainability</li>
              <li className='hover:text-[#ff8c33] text-base lg:text-[1.2rem] cursor-pointer transition-colors duration-300'>About Us</li>
              <li className='hover:text-[#ff8c33] text-base lg:text-[1.2rem] cursor-pointer transition-colors duration-300'>Contact Us</li>
            </ul>
          </div>
          
          {/* Start Button - Desktop */}
          <div className='hidden md:block'>
            <button className='bg-[#ff8c33] text-base lg:text-[1.2rem] basic-font hover:bg-[#e67d2e] text-white font-bold py-1.5 md:py-2 px-4 md:px-6 rounded-lg transition-all duration-300 shadow-md'>
              Start
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className='flex md:hidden'>
            <button 
              onClick={toggleMenu}
              className='text-white focus:outline-none'
              aria-label="Toggle menu"
            >
              {/* Hamburger Icon */}
              {!isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='fixed top-[5vh] left-0 right-0 bg-primary shadow-lg z-10 mt-1 rounded-b-lg py-4 px-6 md:hidden'>
          <ul className='flex flex-col space-y-4 basic-font'>
            <li className='hover:text-[#ff8c33] text-[1.1rem] cursor-pointer transition-colors duration-300'>Home</li>
            <li className='hover:text-[#ff8c33] text-[1.1rem] cursor-pointer transition-colors duration-300'>Our Fruits</li>
            <li className='hover:text-[#ff8c33] text-[1.1rem] cursor-pointer transition-colors duration-300'>Our Farm</li>
            <li className='hover:text-[#ff8c33] text-[1.1rem] cursor-pointer transition-colors duration-300'>Sustainability</li>
            <li className='hover:text-[#ff8c33] text-[1.1rem] cursor-pointer transition-colors duration-300'>About Us</li>
            <li className='hover:text-[#ff8c33] text-[1.1rem] cursor-pointer transition-colors duration-300'>Contact Us</li>
          </ul>
          <div className='mt-6'>
            <Link to='/signup'>
            <button className='bg-[#ff8c33] w-full text-[1.1rem] basic-font hover:bg-[#e67d2e] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md'>
              Start
            </button>
            </Link>
         
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;