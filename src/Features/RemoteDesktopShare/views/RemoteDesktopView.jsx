import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { X, Info, Menu, Plus, History, Users, Share2, Shield, Globe } from 'lucide-react';
import './styles/RemoteDesktopView.css'; // Import the CSS file for the shimmer effect
import BackgroundGrid from '../../../RemotedotEnv/componants/BackGroundGrid';
import Header from '../components/Header';
import { useAuth } from '../../Authentication/controllers/AuthContext'; // Import useAuth

const RemoteDesktopView = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const { authState, logout, isLoading, errorMessage: authErrorMessage } = useAuth(); 
  const [sessionId, setSessionId] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinSession = () => {
    if (sessionId && authState.user?.payload?.['cognito:username']) {
      const username = authState.user.payload['cognito:username'];
      // Update navigation path to include feature path
      navigate(`/remote-desktop/${username}/${sessionId}`);
      setShowJoinModal(false);
    } else {
      console.error('Username or session ID missing');
    }
  };

  return (
    <div className="min-h-screen relative shimmer ">
      <BackgroundGrid />
     <div> <Header
        activeSection="home"
        scrollToSection={scrollToSection}
        authState={authState}
        showProfileDropdown={false}
        setShowProfileDropdown={() => {}}
        setShowLoginModal={() => {}}
        setShowSignupModal={() => {}}
        logout={() => {}}
      />
     </div>

      <main className="pt-20 container mx-auto px-4 ">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Remote Desktop Access
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Control computers remotely with enterprise-grade security. Connect and collaborate in real-time from anywhere.
          </p>
          
          {/* Enhanced Quick Action Buttons */}
          <div className="flex justify-center gap-4 mb-16">
            <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
              <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="relative">
                Create Session
                <span className="absolute inset-x-0 -bottom-1 h-px bg-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </span>
            </button>

            <button 
              onClick={() => setShowJoinModal(true)}
              className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative">
                Join Session
                <span className="absolute inset-x-0 -bottom-1 h-px bg-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </span>
            </button>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {/* Update each feature card with hover effects */}
            <div className="group bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="bg-blue-500/20 p-3 rounded-full w-fit mb-4">
                <Share2 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-User Control</h3>
              <p className="text-gray-400">Multiple controllers can access and manage a single host simultaneously</p>
            </div>
            <div className="group bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
              <div className="bg-green-500/20 p-3 rounded-full w-fit mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-gray-400">End-to-end encryption with advanced authentication protocols</p>
            </div>
            <div className="group bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="bg-purple-500/20 p-3 rounded-full w-fit mb-4">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Access</h3>
              <p className="text-gray-400">Connect to any device worldwide with minimal latency</p>
            </div>
          </div>

          {/* Join Session Modal */}
          {showJoinModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg shadow-purple-500/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Join Session</h2>
                  <button onClick={() => setShowJoinModal(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    placeholder="Enter Session ID"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
                  />
                  <button 
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg transition-colors duration-300"
                    onClick={handleJoinSession}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {showHistory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Connection History</h2>
                <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {showFriends && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Friends List</h2>
                <button onClick={() => setShowFriends(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RemoteDesktopView;