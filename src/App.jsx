import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './Features/Authentication/controllers/AuthContext.jsx';
import HomePage from './RemotedotEnv/views/homepage.jsx';

function App() {
  return (
    // <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    // </AuthProvider>
  );
}

export default App;
