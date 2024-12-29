import React, { useState, useEffect } from "react";
import { X, Info, Menu } from 'lucide-react';
import './PrivateCoding.css'; // Import the CSS file for the shimmer effect
import BackgroundGrid from '../../../RemotedotEnv/componants/BackGroundGrid';
import Header from '../components/Header';
import { useAuth } from '../../Authentication/controllers/AuthContext'; // Import useAuth
import NavbarComponent from '../components/NavbarComponant'; // Import the NavbarComponent

const PrivateCoding = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { authState, logout, isLoading, errorMessage: authErrorMessage } = useAuth(); 

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const container = document.querySelector('.snap-container');
      const sections = document.querySelectorAll('.snap-start');
      let currentSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          currentSection = section;
        }
      });

      if (currentSection) {
        container.scrollTop = currentSection.offsetTop;
      }
    };

    const container = document.querySelector('.snap-container');
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen relative shimmer">
      <BackgroundGrid />
      <Header
        activeSection="home"
        scrollToSection={scrollToSection}
        authState={authState}
        showProfileDropdown={false}
        setShowProfileDropdown={() => {}}
        setShowLoginModal={() => {}}
        setShowSignupModal={() => {}}
        logout={() => {}}
      />

      <main className="pt-20 snap-container"> 
        <NavbarComponent showMenu={showMenu} toggleMenu={toggleMenu} scrollToSection={scrollToSection} /> {/* Use NavbarComponent */}
        <div className="h-0.5 bg-gray-600" style={{ width: '100%' }}></div> {/* Adjust height to make the white line visible */}

        <div className="flex flex-col items-center space-y-8 mt-2 px-2 h-full snap-y snap-mandatory">
          <div className="flex flex-row justify-center items-start space-x-7 w-full max-w-9xl snap-start" id="projects">
            <div className="w-1/5 p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-white mb-4">Projects</h1>
              <p className="text-gray-400">Content for section 1</p>
            </div>
            <div className="w-0.5 bg-gray-600" style={{ height: 'calc(100vh - 10rem)' }}></div> 
            <div className="w-4/5 p-4 rounded-lg shadow-lg " style={{ height: 'calc(100vh - 10rem)', overflowY: 'hidden', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>
                {`
                  .w-4/5::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
            </div>
          </div>
          {/* Add other sections here with unique IDs */}
        </div>
      </main>
    </div>
  );
};

export default PrivateCoding;