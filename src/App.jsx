import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Features/Authentication/controllers/AuthContext.jsx'; // Import AuthProvider
import HomePage from './RemotedotEnv/views/homepage.jsx';
import ProtectedRoute from './RemotedotEnv/routes/ProtectedRoute.jsx';
import features from './RemotedotEnv/features.json'; // Import features

import {
  RemoteDesktopRoutes, // Note: Changed to RemoteDesktopRoutes
  Deployfy,
  FileSharing,
  PrivateCoding,
  CollaborativeCoding,
  MeetingHandler,
  VideoStreaming, // Ensure LiveStreaming is correctly imported
  VirtualWhiteboard,
  TextPad
} from './Features/index.js'; // Ensure these are named exports

const featureComponents = {
  '/remote-desktop/*': RemoteDesktopRoutes,  // Note: Changed to RemoteDesktopRoutes
  '/deployfy/*': Deployfy,
  '/file-sharing/*': FileSharing,
  '/private-coding/*': PrivateCoding,
  '/collab-coding/*': CollaborativeCoding,
  '/meetings/*': MeetingHandler,
  '/live-streaming/*': VideoStreaming,
  '/whiteboard/*': VirtualWhiteboard,
  '/textpad/*': TextPad,
};

function App() {
  return (
    <AuthProvider> {/* Wrap Router with AuthProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {features.map((feature) => (
              <Route
                key={feature.path}
                path={`${feature.path}/*`}  // The /* is important for nested routes
                element={<ProtectedRoute element={featureComponents[`${feature.path}/*`]} />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to home */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
