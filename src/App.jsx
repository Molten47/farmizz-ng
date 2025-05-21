import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signin from './Components/Sign In/Signin';
import Signup from './Components/Sign Up/Signip';
import Landing from './Components/Landing Page/Landing';
import SignupSuccess from './Components/SignUpSuccess/Success';
import FarmizzDashboard from './Pages/Dashboard/Dashboard';



const App = () => {
 

    return (
        <Router> 
        
            <div>
                <Routes>
                    <Route path="/" element={<Landing />} /> 
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                     <Route path="/success" element={<SignupSuccess />} />
                     <Route path='/dashboard' element={<FarmizzDashboard/>}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
