import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'


const CLIENT_ID = "827215838376-gk0vkc0p5fsvsg00tverccsmkn23ir6u.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
