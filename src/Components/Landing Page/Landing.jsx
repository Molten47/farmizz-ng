import React from 'react';
import Hero from '../Hero/Hero';
import Fruits from '../Fruits/Fruits';
import Navbar from '../Navbar/Navbar';
import Farm from '../Farm/Farm';
import Footer from '../Footer/Footer';
const Landing = () => {
  return (
    <div className='flex relative flex-col z-0 bg-light w-full min-h-screen overflow-hidden'>
      <Navbar/>
      <Hero/>
     <Fruits/>
     <Farm/>
     <Footer/>   
    </div>
  );
};

export default Landing;