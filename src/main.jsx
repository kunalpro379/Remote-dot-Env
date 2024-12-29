import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import './index.css'; // Import your Tailwind CSS file
import { AuthProvider } from "./Features/Authentication/controllers/AuthContext"; // Import AuthProvider

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App
root.render(
  <AuthProvider> {/* Wrap App with AuthProvider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
