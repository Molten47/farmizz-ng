import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Navbar from '../Navbar/Navbar';
import backVideo from '../../assets/Goodvideo.mp4';

const Hero = () => {
  return (
    <div className='flex relative flex-col -z-10 bg-light w-full h-screen overflow-hidden'>
      {/* Background Video */}
      <div className='absolute inset-0 w-full h-full z-0'>
        <video 
          autoPlay 
          loop 
          muted 
          className='object-cover w-full h-full'
          playsInline // Improves mobile video handling
        >
          <source src={backVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Subtle gradient overlay for text readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/40'></div>
      </div>
      
      {/* Floating Content about Farmizz */}
      <div className='relative flex flex-col items-center justify-center h-full px-4 text-center text-white mt-0 md:mt-16'>
        <div className='max-w-3xl mx-auto p-4 md:p-6 backdrop-blur-sm'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 new-font'>
            Welcome to <span className='text-[#ff8c33]'>Farm</span><span className='text-white'>izz</span>
          </h1>
          <p className='text-base md:text-lg lg:text-xl mb-6 md:mb-10 leading-relaxed basic-font max-w-2xl mx-auto'>
            Revolutionizing agriculture with smart farming solutions. 
            Connect with farmers, access fresh produce, and support sustainable practices 
            for a healthier community and planet.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mt-4'>
            <button className='bg-[#ff8c33] hover:bg-[#e67d2e] text-white font-bold py-2 md:py-3 basic-font px-6 md:px-8 rounded-lg transition-all duration-300 shadow-lg text-base md:text-lg'>
              Get Started
            </button>
            <button className='bg-white/20 basic-font hover:bg-white/30 backdrop-blur-sm border border-white/50 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg transition-all duration-300 shadow-lg text-base md:text-lg'>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;