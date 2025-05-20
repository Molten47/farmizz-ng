import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Farmizz color scheme from your code
const colors = {
  primary: '#10635b',
  secondary: '#ff8c33',
  light: '#f5f7fa',
  dark: '#333333',
  white: '#ffffff'
};

// Custom marker icon for farms
const farmIcon = new Icon({
  iconUrl: '/assets/farm-marker.png', // You'll need to add this to your assets
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const Footer = () => {
  // Farm locations
  const farmLocations = [
    { 
      name: "Farmizz Main Farm", 
      position: [37.7749, -122.4194],
      address: "123 Agriculture Way, Green Valley, CA 94123"
    },
    { 
      name: "Farmizz Distribution Center", 
      position: [37.8049, -122.4294],
      address: "456 Harvest Road, Green Valley, CA 94123" 
    }
  ];

  // State for newsletter subscription
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log(`Subscribing email: ${email}`);
      setSubscribed(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  // For SSR compatibility (Next.js)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Map Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {mounted && (
          <MapContainer 
            center={[37.7749, -122.4194]} 
            zoom={12} 
            style={{ height: '100%', width: '100%', zIndex: 1 }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {farmLocations.map((farm, index) => (
              <Marker 
                key={index} 
                position={farm.position} 
                icon={farmIcon}
              >
                <Popup>
                  <div>
                    <h3 className="font-semibold text-[#10635b]">{farm.name}</h3>
                    <p className="text-sm text-gray-600">{farm.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
        {/* Map Overlay */}
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-10">
          <h3 className="text-lg font-semibold text-[#10635b] basic-font">Farmizz Locations</h3>
          <p className="text-sm text-gray-600 alt-font">Visit our farms and distribution centers</p>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-[#10635b] basic-font">Farmizz</h3>
            <p className="mt-4 text-gray-600 alt-font">
              Where technology meets agriculture for a sustainable future.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-[#10635b] hover:text-[#ff8c33] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-[#10635b] hover:text-[#ff8c33] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-[#10635b] hover:text-[#ff8c33] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-[#10635b] hover:text-[#ff8c33] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-[#10635b] basic-font">Navigation</h3>
            <ul className="mt-4 space-y-2 alt-font">
              <li><a href="/" className="text-gray-600 hover:text-[#ff8c33] transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-[#ff8c33] transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-[#ff8c33] transition-colors">Contact</a></li>
              <li><a href="/sustainability" className="text-gray-600 hover:text-[#ff8c33] transition-colors">Sustainability</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-[#ff8c33] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-[#10635b] basic-font">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#ff8c33] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-600 alt-font">123 Agriculture Way, Green Valley, CA 94123</span>
              </li>
              <li className="flex items-start alt-font">
                <svg className="w-5 h-5 text-[#ff8c33] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-gray-600">info@farmizz.com</span>
              </li>
              <li className="flex items-start alt-font">
                <svg className="w-5 h-5 text-[#ff8c33] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-gray-600">(555) 123-4567</span>
              </li>
              <li className="flex items-start alt-font">
                <svg className="w-5 h-5 text-[#ff8c33] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-600">Mon-Fri: 9AM-5PM<br />Sat: 10AM-2PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-[#10635b] basic-font">Stay Updated</h3>
            <p className="mt-4 text-gray-600 alt-font">Subscribe for fresh updates and seasonal offers.</p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#10635b] focus:border-transparent outline-none transition alt-font"
                  placeholder="Your email address"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff8c33] hover:bg-[#e67d2e] text-white font-semibold rounded-lg transition-colors basic-font"
                >
                  {subscribed ? 'Thank you!' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#f5f7fa] py-4">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <p className="text-center text-gray-600 alt-font">Copyright © {new Date().getFullYear()} Farmizz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;