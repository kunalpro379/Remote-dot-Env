import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { 
  X, Settings, Users, Mic, MessageSquare, Volume2, 
  MonitorPlay, Shield, Info
} from 'lucide-react';
import BackgroundGrid from './styles/BackgroundGrid';
import { useAuth } from '../../Authentication/controllers/AuthContext';

const ControllerView = () => {
  const { username, sessionId } = useParams();
  const navigate = useNavigate();
  const { authState } = useAuth();
  
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [activeUsers, setActiveUsers] = useState([
    { id: 1, name: 'Host', role: 'host' },
    { id: 2, name: username, role: 'controller' },
  ]);

  const toggleChat = () => setShowChat(!showChat);
  const toggleSettings = () => setShowSettings(!showSettings);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleAudio = () => setIsAudioEnabled(!isAudioEnabled);

  return (
    <div className="h-screen bg-gray-900 relative shimmer overflow-hidden ">
      <div className="fixed inset-0 z-0 blur-1xl">
        <BackgroundGrid />
      </div>
      <div className="flex h-full">
        {/* Left Section */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className=" z-10 px-4 py-2">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-white">Remote.Env</h1>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Exit to Main Menu</span>
              </button>
            </div>
          </div>

          {/* Remote Desktop Window */}
          <div className="flex-1 p-4 h-full overflow-hidden">
            <div className="bg-black/60 backdrop-blur-sm rounded-xl  border border-white/20 flex items-center justify-center h-full">
              <MonitorPlay className="w-16 h-16 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-80  backdrop-blur-2xl border-l border-white/20 p-4 flex flex-col h-full overflow-hidden ">
          {/* Session Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 ">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Secure Connection</span>
            </div>
            <div className="text-sm text-gray-400">
              Session ID: {sessionId}
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Active Users
              </h3>
              <span className="text-bold text-gray-400 ">{activeUsers.length}</span>
            </div>
            <div className="space-y-2">
              {/* {activeUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between text-sm">
                  <span>{user.name}</span>
                  <span className="text-xs text-gray-400">{user.role}</span>
                </div>
              ))} */}
              
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between gap-2 mb-4 p-2">
  <button
    onClick={toggleMute}
    className={`p-2.5 w-10 h-10 rounded-lg flex items-center justify-center ${
      isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-gray-300'
    }`}
  >
    <Mic className="w-4 h-4" />
  </button>
  <button
    onClick={toggleAudio}
    className={`p-2.5 w-10 h-10 rounded-lg flex items-center justify-center ${
      !isAudioEnabled ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-gray-300'
    }`}
  >
    <Volume2 className="w-4 h-4" />
  </button>
  <button
    onClick={toggleChat}
    className={`p-2.5 rounded-lg flex items-center justify-center gap-2 ${
      showChat ? 'bg-blue-500/20 text-blue-500' : 'bg-white/5 text-gray-300'
    }`}
  >
    <MessageSquare className="w-4 h-4" />
    <span className="text-sm">Chat</span>
  </button>
  <button
    onClick={toggleSettings}
    className="p-2.5 rounded-lg flex items-center justify-center gap-2 bg-white/5 text-gray-300 hover:bg-white/10"
  >
    <Settings className="w-4 h-4" />
    <span className="text-sm">Settings</span>
  </button>
</div>

          {/* Chat Section (Toggled) */}
          {showChat && (
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                {/* Chat messages would go here */}
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControllerView;