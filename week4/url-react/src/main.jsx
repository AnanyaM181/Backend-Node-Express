// Import StrictMode from React
// StrictMode helps find potential problems in your app during development
import { StrictMode } from 'react'

// Import createRoot from react-dom/client
// createRoot is used to create a root where the React app will be rendered
import { createRoot } from 'react-dom/client'

// Import global CSS file for styling
import './index.css'

// Import the main App component
import App from './App.jsx'

// Get the HTML element with id="root" from index.html
// and create a React root on it
createRoot(document.getElementById('root')).render(
  
  // StrictMode is a wrapper that activates extra checks and warnings
  // It runs only in development mode, not in production
  <StrictMode>
    
    // App is the main component of your React application
    <App />
  
  </StrictMode>,
)
