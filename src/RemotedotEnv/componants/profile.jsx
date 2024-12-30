// src/components/ProfileAvatar.jsx
import React from "react";
import { Mail, Lock, User, Settings, LogOut, AlertCircle } from "react-feather";

const ProfileAvatar = ({ logout, isAuthenticated, mockUser, showProfileDropdown, setShowProfileDropdown, setShowLoginModal, setShowSignupModal, setIsAuthenticated }) => (
  <div className="relative">
    <button
      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
      className={`w-16 h-16 rounded-full ${isAuthenticated ? 'bg-blue-500' : 'bg-purple-500'} 
        flex items-center justify-center hover:scale-110 hover:bg-blue-600 transition-all duration-300`}
    >
      {isAuthenticated ? (
        <span className="text-2xl font-bold text-white">
          {mockUser.username ? mockUser.username[0].toUpperCase() : <User className="w-8 h-8" />}
        </span>
      ) : (
        <User className="w-8 h-8 text-white" />
      )}
    </button>
    
    {showProfileDropdown && (
      <div 
        className="absolute top-20 right-0 w-72 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 p-6 transform transition-all duration-300"
      >
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{mockUser.username ? mockUser.username[0].toUpperCase() : "Una"}</span>
              </div>
              <div>
                <h3 className="text-white font-bold">{mockUser.username}</h3>
                <p className="text-white/60 text-sm">{mockUser.role}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                <User size={18} />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Settings size={18} />
                <span>Settings</span>
              </button>
              <button 
                onClick={() => {
                  logout();
                  setIsAuthenticated(false);
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center gap-3 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
              <div className="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white/80" />
              </div>
              <div>
                <h3 className="text-white font-bold">Unauthorized User</h3>
                <p className="text-white/60 text-sm">Please sign in to continue</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setShowLoginModal(true);
                setShowProfileDropdown(false);
              }}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setShowSignupModal(true);
                setShowProfileDropdown(false);
              }}
              className="w-full border border-white/20 hover:bg-white/10 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    )}
  </div>
);

export default ProfileAvatar;