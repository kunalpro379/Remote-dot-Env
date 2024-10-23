// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import RemoteDesktopCard from './componants/Actions'; // Adjust the import path if needed
import RemoteDesktopPage from './pages/RemoteDesktopPage'; // Adjust the import path if needed
import FileDownload from './componants/RemoteDesktop/download_remotehost/downaload_host';// src/App.js
import RemoteDesktop from './pages/host_redirect';

function App() {
  return (
    <Router> {/* Wrap your routes with Router */}
      <div className="App">
      <Routes>
          <Route path="/" element={<RemoteDesktopCard />} />
          <Route path="/remote-desktop" element={<RemoteDesktopPage />} />
          <Route path="/hello" element={<FileDownload />} />
          <Route path="/remote-desktop/:uniqueId" element={<RemoteDesktop />} /> {/* Use 'element' here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

