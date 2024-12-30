import React, { useState, useEffect } from "react";
import ProfileAvatar from "../../../RemotedotEnv/componants/profile";
import CustomHeader from "../../../componants/UI/CustomHeader/custom-header";
import SearchBar from "../../../componants/UI/SearchBar";
import Notifications from "../../../componants/UI/Notification";
import squidImage from '../../../assets/squid.png'; 
import { X, Info, Menu, Plus, History, Users, Share2, Shield, Globe } from 'lucide-react';

const Header = ({

children,
  showProfileDropdown,
  setShowProfileDropdown,
  setShowLoginModal,
  setShowSignupModal,
  authState,
  logout
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CustomHeader 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-gray-900/90 shadow-lg shadow-black border-b border-gray-800/50' 
          : 'backdrop-blur-none bg-transparent'
      }`}
    >
      <div className="flex items-center space-x-3">
        <img src={squidImage} alt="Squid Logo" className="w-10 h-14 hover:scale-110 transition-transform duration-200" />
        <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Remote.Env
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setShowHistory(true)} 
          className="group flex items-center gap-2  hover:bg-gray-700/70 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
        >
          <History className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
        
        <button 
          onClick={() => setShowFriends(true)} 
          className="group flex items-center gap-2  hover:bg-gray-700/70 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
        >
          <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <Notifications className="hover:scale-105 transition-transform" />
        
        {authState.isAuthenticated ? (
          <div className="text-gray-300 font-medium px-3 py-1 rounded-lg bg-gray-800/30">
            {authState.user?.payload?.['cognito:username'] || 'Guest'}
          </div>
        ) : null}
        
        <ProfileAvatar 
          isAuthenticated={authState.isAuthenticated}
          mockUser={{ username: authState.user?.payload?.['cognito:username'] || 'Guest', role: "User" }}
          showProfileDropdown={showProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
          setIsAuthenticated={() => {}}
          logout={logout}
          className="hover:scale-105 transition-transform"
        />
      </div>
    </CustomHeader>
  );
};

export default Header;