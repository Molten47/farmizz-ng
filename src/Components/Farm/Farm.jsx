import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Import images (make sure to add these to your assets folder)
import techImage from '../../assets/front-view-woman-holding-box.jpg';
import sustainabilityImage from '../../assets/african-people-harvesting-vegetables.jpg';
import aboutUsImage from '../../assets/african-people-harvesting-vegetables.jpg';
import contactImage from '../../assets/photorealistic-woman.jpg';
import ctaImage from '../../assets/front-view-woman-holding-box.jpg';

const Farm = () => {
  // Data for charts
  const waterUsageData = [
    { name: 'Traditional', value: 100 },
    { name: 'Farmizz', value: 40 },
  ];
  
  const yieldData = [
    { name: 'Jan', traditional: 400, farmizz: 420 },
    { name: 'Feb', traditional: 380, farmizz: 430 },
    { name: 'Mar', traditional: 500, farmizz: 580 },
    { name: 'Apr', traditional: 480, farmizz: 620 },
    { name: 'May', traditional: 520, farmizz: 700 },
    { name: 'Jun', traditional: 580, farmizz: 750 },
  ];
  
  const sustainabilityData = [
    { name: 'Water', value: 35 },
    { name: 'Solar', value: 30 },
    { name: 'Organic', value: 25 },
    { name: 'Community', value: 10 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='bg-white'>
      {/* Section 1: Technology Meets Agriculture */}
      <div className='min-h-[80vh] bg-[#10635b] py-16 px-4 md:px-8 z-0'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            {/* Left: Content */}
            <div>
              <h2 className='text-4xl md:text-5xl font-bold mb-6 text-[#ff8c33] new-font'>
                Where Technology <span className='text-white'>Meets Agriculture</span>
              </h2>
              <p className='text-lg text-white/90 leading-relaxed alt-font mt-6 mb-8'>
                Farmizz uses data-driven farming techniques—like IoT sensors, precision irrigation, and satellite mapping—to improve crop yield, reduce waste, and promote sustainable farming. Our innovative approach combines traditional agricultural wisdom with cutting-edge technology.
              </p>
              <p className='text-white/90 leading-relaxed mb-8 alt-font'>
                Through real-time monitoring and AI-powered decision making, we're able to optimize growing conditions while using fewer resources. This smart approach to farming is not just good for business—it's essential for our planet's future.
              </p>
              <button className='bg-[#ff8c33] hover:bg-[#e67d2e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg text-lg basic-font'>
                Explore Our Technology
              </button>
            </div>
            {/* */}
            <div className='relative rounded-2xl overflow-hidden shadow-2xl'>
              <img 
                src={techImage} 
                alt="Technology in agriculture" 
                className='w-full h-[32rem] object-cover'
              />
              {/* Overlay with data visualization */}
              <div className='absolute bottom-0 left-0 right-0 bg-black/70 p-6 backdrop-blur-sm'>
                <h3 className='text-white text-xl font-semibold mb-3 basic-font'>Yield Improvement</h3>
                <div className='h-[14rem] w-full'>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={yieldData}>
                      <XAxis dataKey="name" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <Tooltip />
                      <Line type="monotone" dataKey="traditional" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="farmizz" stroke="#ff8c33" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className='flex justify-center mt-2'>
                  <div className='flex items-center mr-4'>
                    <div className='w-3 h-3 bg-[#8884d8] mr-2'></div>
                    <span className='text-white text-xs basic-font'>Traditional</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-3 h-3 bg-[#ff8c33] mr-2'></div>
                    <span className='text-white text-xs basic-font'>Farmizz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Sustainability */}
      <div className='min-h-[80vh] bg-[#f5f7fa] py-16 px-4 md:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-14 items-center'>
            {/* Left: Image */}
            <div className='relative rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1'>
              <img 
                src={sustainabilityImage} 
                alt="Sustainable farming" 
                className='w-full h-[32rem] object-cover'
              />
              {/* Overlay with data visualization */}
              <div className='absolute bottom-0 left-0 right-0 bg-black/70 p-6 backdrop-blur-sm'>
                <h3 className='text-white text-xl font-semibold mb-3 basic-font'>Resource Optimization</h3>
                <div className='flex justify-between'>
                  <div className='w-1/2 h-[180px]'>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={waterUsageData}>
                        <XAxis dataKey="name" stroke="#ffffff" />
                        <YAxis stroke="#ffffff" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#00C49F" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className='text-white text-center text-xs mt-2 alt-font'>Water Usage %</p>
                  </div>
                  <div className='w-1/2 h-[14rem]'>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sustainabilityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {sustainabilityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className='text-white text-center text-xs mb-5 alt-font'>Sustainability Focus</p>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className='order-1 md:order-2'>
              <h2 className='text-4xl md:text-5xl font-bold mb-6 text-[#10635b] new-font'>
                Rooted in <span className='text-[#ff8c33]'>Sustainability</span>
              </h2>
              <p className='text-lg text-gray-700 leading-relaxed alt-font mt-6 mb-8 basic-font'>
                From using renewable energy to minimizing chemical use, Farmizz is committed to sustainable agriculture practices that protect the environment and support local communities. We believe that farming should work with nature, not against it.
              </p>
              
              <div className='space-y-4 mb-8'>
                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-[#10635b] rounded-full flex items-center justify-center mr-4 shrink-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-[#10635b] mb-1 basic-font'>Reduced Water Usage</h3>
                    <p className='text-gray-600 alt-font'>Our smart irrigation systems use up to 60% less water than traditional methods while maintaining optimal soil moisture.</p>
                  </div>
                </div>
                
                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-[#10635b] rounded-full flex items-center justify-center mr-4 shrink-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-[#10635b] mb-1 basic-font'>Organic Farming</h3>
                    <p className='text-gray-600 alt-font'>We embrace organic principles and natural pest control methods, eliminating the need for harmful chemicals.</p>
                  </div>
                </div>
                
                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-[#10635b] rounded-full flex items-center justify-center mr-4 shrink-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-[#10635b] mb-1 basic-font'>Fair Trade Partnerships</h3>
                    <p className='text-gray-600 alt-font'>We work directly with local farmers, ensuring fair compensation and sustainable community development.</p>
                  </div>
                </div>
              </div>
              
              <button className='bg-[#10635b] hover:bg-[#0a4f49] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg text-lg basic-font'>
                Our Sustainability Commitment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are /philosophy section */}
      <div className='min-h-[80vh] bg-white py-16 px-4 md:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            {/* Left: Content */}
            <div>
              <h2 className='text-4xl md:text-5xl font-bold mb-6 text-[#10635b] new-font'>
                Who <span className='text-[#ff8c33]'>We Are</span>
              </h2>
              <p className='text-lg text-gray-700 leading-relaxed basic-font mt-6 mb-6'>
                Farmizz is a forward-thinking agritech company passionate about bridging the gap between technology and farming. Our mission is to empower farmers, deliver nutritious food, and make agriculture more sustainable through innovation.
              </p>
              <p className='text-gray-600 mb-6 alt-font'>
                Founded in 2020 by a team of agricultural scientists and technology experts, we've grown from a small pilot project to a comprehensive farming platform that serves communities across the region. Our team combines expertise in agronomy, data science, engineering, and sustainability to create holistic solutions for modern farming challenges.
              </p>
              <div className='bg-[#f5f7fa] p-6 rounded-xl mb-6'>
                <h3 className='font-semibold text-[#10635b] mb-2 basic-font'>Our Mission</h3>
                <p className='text-gray-600 italic alt-font'>To transform agriculture through technology, making it more efficient, sustainable, and accessible for all.</p>
              </div>
              <button className='bg-[#ff8c33] hover:bg-[#e67d2e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg text-lg basic-font'>
                Meet Our Team
              </button>
            </div>
            {/* Right: Image */}
            <div className='relative rounded-2xl overflow-hidden shadow-2xl'>
              <img 
                src={aboutUsImage} 
                alt="Farmizz team" 
                className='w-full h-[32rem] object-cover'
              />
              {/* Timeline overlay */}
              <div className='absolute bottom-0 left-0 right-0 bg-black/70 p-6 backdrop-blur-sm'>
                <h3 className='text-white text-xl font-semibold mb-3 basic-font'>Our Journey</h3>
                <div className='relative'>
                  <div className='absolute left-2 top-0 bottom-0 w-1 bg-white/30'></div>
                  
                  <div className='relative pl-10 pb-4'>
                    <div className='absolute left-0 top-2 w-5 h-5 bg-[#ff8c33] rounded-full'></div>
                    <p className='text-[#ff8c33] font-bold basic-font'>2020</p>
                    <p className='text-white text-sm alt-font'>Farmizz founded with first smart farm prototype</p>
                  </div>
                  
                  <div className='relative pl-10 pb-4'>
                    <div className='absolute left-0 top-2 w-5 h-5 bg-[#ff8c33] rounded-full'></div>
                    <p className='text-[#ff8c33] font-bold basic-font'>2022</p>
                    <p className='text-white text-sm alt-font'>Expanded to 10 partner farms and launched mobile app</p>
                  </div>
                  
                  <div className='relative pl-10'>
                    <div className='absolute left-0 top-2 w-5 h-5 bg-[#ff8c33] rounded-full'></div>
                    <p className='text-[#ff8c33] font-bold basic-font'>2024</p>
                    <p className='text-white text-sm alt-font'>National recognition with sustainability award</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className='min-h-[80vh] bg-[#f5f7fa] py-16 px-4 md:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-24 items-center'>
            {/* Left: Image */}
            <div className='relative rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1'>
              <img 
                src={contactImage} 
                alt="Contact Farmizz" 
                className='w-full h-[40rem] object-center object-cover'
              />
              {/* Info overlay */}
              <div className='absolute bottom-0 left-0 right-0 bg-black/70 p-6 backdrop-blur-sm'>
                <h3 className='text-white text-xl font-semibold mb-3 basic-font'>Find Us</h3>
                <div className='space-y-3'>
                  <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff8c33] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className='text-white text-sm alt-font'>123 Agriculture Way, Green Valley, CA 94123</p>
                  </div>
                  <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff8c33] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className='text-white text-sm alt-font'>info@farmizz.com</p>
                  </div>
                  <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff8c33] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className='text-white text-sm alt-font'>(555) 123-4567</p>
                  </div>
                  <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff8c33] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className='text-white text-sm alt-font'>Mon-Fri: 9AM-5PM, Sat: 10AM-2PM</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className='order-1 md:order-2'>
              <h2 className='text-4xl md:text-5xl font-bold mb-6 text-[#10635b] new-font'>
                We'd Love to <span className='text-[#ff8c33]'>Hear from You</span>
              </h2>
              <p className='text-lg text-gray-700 leading-relaxed alt-font mt-6 mb-8 basic-font'>
                Have questions about our smart farming methods? Interested in partnering with us? Or maybe you just want to learn more about sustainable agriculture? We're here to help!
              </p>
              
              <form className='space-y-4'>
                <div>
                  <label htmlFor="name" className='block text-gray-700 font-medium mb-2 alt-font'>Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#10635b] focus:border-transparent outline-none transition alt-font'
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <label htmlFor="email" className='block text-gray-700 font-medium mb-2 alt-font'>Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#10635b] focus:border-transparent outline-none transition alt-font'
                    placeholder='your@email.com'
                  />
                </div>
                <div>
                  <label htmlFor="message" className='block text-gray-700 font-medium mb-2 alt-font'>Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#10635b] focus:border-transparent outline-none transition alt-font'
                    placeholder='How can we help you?'
                  ></textarea>
                </div>
                <button className='bg-[#10635b] hover:bg-[#0a4f49] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg text-lg w-full basic-font'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className='min-h-[60vh] bg-[#10635b] py-16 px-4 md:px-8 relative overflow-hidden'>
        <div className='absolute inset-0'>
          <img 
            src={ctaImage} 
            alt="Start your journey" 
            className='w-full h-full object-cover opacity-20'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-[#10635b] to-[#10635b]/80'></div>
        </div>
        
        <div className='max-w-6xl mx-auto relative z-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-4xl md:text-5xl font-bold mb-6 text-white new-font'>
                Start Your Smart Farming <span className='text-[#ff8c33] '>Journey Today</span>
              </h2>
              <p className='text-xl text-white/90 leading-relaxed alt-font mt-6 mb-8'>
                Whether you're a farmer, a buyer, or a sustainability enthusiast, join our mission to make agriculture smarter and greener. The future of farming starts with Farmizz.
              </p>
              <div className='flex flex-wrap gap-4'>
                <button className='bg-[#ff8c33] hover:bg-[#e67d2e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg text-lg basic-font'>
                  Join Farmizz
                </button>
                <button className='bg-transparent border-2 border-white hover:bg-white hover:text-[#10635b] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg text-lg basic-font'>
                  Schedule a Demo
                </button>
              </div>
            </div>
            
            <div className='bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20'>
              <h3 className='text-2xl font-bold text-white mb-6 basic-font'>Why Choose Farmizz?</h3>
              
              <div className='space-y-6 mt-4'>
                <div className='flex items-start'>
                  <div className='w-10 h-10 bg-[#ff8c33] rounded-full flex items-center justify-center mr-4 shrink-0'>
                    <span className='text-white font-bold basic-font'>1</span>
                  </div>
                  <div>
                    <h4 className='text-white font-semibold text-lg basic-font'>Increased Yield</h4>
                    <p className='text-white/80 alt-font'>Up to 30% higher crop yields through optimized growing conditions</p>
                  </div>
                </div>
                
                <div className='flex items-start'>
                  <div className='w-10 h-10 bg-[#ff8c33] rounded-full flex items-center justify-center mr-4 shrink-0'>
                    <span className='text-white font-bold basic-font'>2</span>
                  </div>
                  <div>
                    <h4 className='text-white font-semibold text- basic-font'>Resource Efficiency</h4>
                    <p className='text-white/80 alt-font'>Save up to 60% on water usage with smart irrigation systems</p>
                  </div>
                </div>
                
                <div className='flex items-start'>
                  <div className='w-10 h-10 bg-[#ff8c33] rounded-full flex items-center justify-center mr-4 shrink-0'>
                    <span className='text-white font-bold basic-font'>3</span>
                  </div>
                  <div>
                    <h4 className='text-white font-semibold text-lg basic-font'>Market Access</h4>
                    <p className='text-white/80 alt-font'>Connect directly with buyers for better prices and less waste</p>
                  </div>
                </div>
                
                <div className='flex items-start'>
                  <div className='w-10 h-10 bg-[#ff8c33] rounded-full flex items-center justify-center mr-4 shrink-0'>
                    <span className='text-white font-bold basic-font'>4</span>
                  </div>
                  <div>
                    <h4 className='text-white font-semibold text-lg basic-font'>Sustainability</h4>
                    <p className='text-white/80 alt-font'>Reduce environmental impact while improving soil health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Farm;