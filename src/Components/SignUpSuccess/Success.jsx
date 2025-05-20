// SignupSuccess.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SignupSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleEmail } = location.state || {};



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Sign Up Successful!</h2>
        {googleEmail && <p className="text-gray-700 mb-2">Welcome, {googleEmail}!</p>}
        <p className="text-gray-600">You will be redirected shortly...</p>
        {/* You can add more information or actions here */}
      </div>
    </div>
  );
};

export default SignupSuccess;