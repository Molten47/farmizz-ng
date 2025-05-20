import React from 'react'
import image1 from '../../assets/photorealistic-woman.jpg'
import image2 from '../../assets/biologist-forest.jpg'
import image3 from '../../assets/african-man-harvesting-vegetables.jpg'

const Fruits = () => {
  const fruitData = [
    {
      id: 1,
      tag: 'Organic',
      image: image1,
      description: 'Grown without synthetic pesticides or fertilizers, our organic produce promotes biodiversity and soil health.'
    },
    {
      id: 2,
      tag: 'Smart-grown',
      image: image2,
      description: 'Using IoT sensors and precision agriculture to optimize growing conditions and reduce water usage.'
    },
    {
      id: 3,
      tag: 'Zero pesticides',
      image: image3,
      description: 'Natural farming methods that protect beneficial insects and ensure your food is free from harmful chemicals.'
    }
  ]

  return (
    <div className='min-h-[80vh] bg-gradient-to-b from-[#9fd169] via-[#ffffff] to-[#7fb349] py-16 px-4 md:px-8 z-0'>
      {/* Header Section */}
      <div className='max-w-4xl mx-auto text-center mb-16'>
        <h2 className='text-4xl md:text-5xl font-bold mb-6 text-white new-font'>Fresh. Local. <span className='text-[#ff8c33]'>Naturally Grown.</span></h2>
        <p className='text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed alt-font'>
          Explore our range of fresh fruits, vegetables, and organic produce delivered straight from farm to table. 
          Grown using smart irrigation, pest control, and organic techniques.
        </p>
      </div>
      
      {/* Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {fruitData.map((item) => (
          <div key={item.id} className='relative group overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl'>
            {/* Image */}
            <div className='h-100 overflow-hidden'>
              <img 
                src={item.image} 
                alt={item.tag} 
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
            </div>
            
            {/* Tag Overlay */}
            <div className='absolute top-4 right-4 bg-[#ff8c33] text-white py-2 px-5 rounded-full basic-font font-semibold text-sm'>
              {item.tag}
            </div>
            
            {/* Content Overlay */}
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transform transition-all duration-300'>
              <h3 className='text-2xl font-bold basic-font text-white mb-2'>{item.tag}</h3>
              <p className='text-white/90 text-sm transform transition-all duration-300 max-h-0 alt-font group-hover:max-h-24 opacity-0 group-hover:opacity-100'>
                {item.description}
              </p>
              <button className='mt-4 basic-font bg-white/20 backdrop-blur-sm border border-white/50 text-white py-2 px-4 rounded-full text-sm hover:bg-white hover:text-[#7fb349] transition-all duration-300 opacity-0 group-hover:opacity-100'>
                Learn more
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tech Integration Section */}
      <div className='mt-20 max-w-4xl mx-auto text-center'>
        <div className='inline-block bg-white/20 backdrop-blur-sm py-2 px-6 rounded-full text-white text-sm font-semibold mb-6 basic-font'>
          POWERED BY AGRITECH
        </div>
        <h3 className='text-3xl font-bold text-white mb-6 basic-font'>Technology-Driven Agriculture</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-5'>
          <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
            <div className='w-12 h-12 bg-[#ff8c33] rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className='text-white text-lg font-semibold mb-2 basic-font'>Smart Irrigation</h4>
            <p className='text-white/80 text-sm alt-font'>Precision water management using soil sensors and weather data</p>
          </div>
          <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
            <div className='w-12 h-12 bg-[#ff8c33] rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className='text-white text-lg font-semibold  basic-font mb-2'>Organic Protection</h4>
            <p className='text-white/80 text-sm alt-font'>Biological pest control and natural defense systems</p>
          </div>
          <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
            <div className='w-12 h-12 bg-[#ff8c33] rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className='text-white text-lg font-semibold mb-2 basic-font'>Blockchain Tracking</h4>
            <p className='text-white/80 text-sm alt-font'>Full traceability from seed to harvest to your table</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fruits