// SignupSuccess.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SignupSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleEmail, name } = location.state || {};
  const [countdown, setCountdown] = useState(5);
  const userName = name || googleEmail?.split('@')[0] || 'Farmer';

  // Auto-redirect after countdown
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  const handleSkip = () => {
    navigate('/dashboard');
  };

  // Tips for new users
  const farmingTips = [
    "Set up your farm profile to track your crops and livestock",
    "Check out the weather forecasts for optimal planting times",
    "Connect with other farmers in the community section"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">Welcome to Farmizz!</h2>
        <p className="text-xl text-gray-700 mb-6 text-center">
          Hello, <span className="font-semibold">{userName}</span>! Your account has been created successfully.
        </p>
        
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-green-700 mb-2">Getting Started:</h3>
          <ul className="space-y-2">
            {farmingTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-center">
          <p className="text-gray-500 mb-4">You will be redirected to your dashboard in {countdown} seconds</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleSkip}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition duration-200"
            >
              Go to Dashboard Now
            </button>
            <button
              onClick={() => navigate('/profile/setup')}
              className="border border-green-600 text-green-600 hover:bg-green-50 py-2 px-6 rounded-lg font-medium transition duration-200"
            >
              Complete Your Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;