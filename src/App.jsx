// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import RemoteDesktopCard from './componants/Actions'; // Adjust the import path if needed
import RemoteDesktopPage from './pages/RemoteDesktopPage'; // Adjust the import path if needed

function App() {
  return (
    <Router> {/* Wrap your routes with Router */}
      <div className="App">
        <Routes>
          <Route path="/" element={<RemoteDesktopCard />} />
          <Route path="/remote-desktop" element={<RemoteDesktopPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
