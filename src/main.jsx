import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import './index.css'; // Import your Tailwind CSS file

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
