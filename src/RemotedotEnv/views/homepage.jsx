import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import features from '../features.json'; 
import SignupModal from '../../Features/Authentication/views/Signup.jsx';
import LoginModal from '../../Features/Authentication/views/Login.jsx';
import BackgroundGrid from '../componants/BackGroundGrid.jsx';
import { iconMap } from '../../constants/iconMap';
import { navItems } from '../../constants/navItems';
import { useAuth } from '../../Features/Authentication/controllers/AuthContext.jsx'; // Import useAuth
import Header from '../componants/Header.jsx';
import Features from '../componants/Features.jsx';
import Pricing from '../componants/Pricing.jsx';
import ContactUs from '../componants/ContactUs.jsx';
import FeatureSelections from '../componants/FeatureSelections.jsx';
import Adv from '../componants/Advertisement.jsx';
import Loading from '../componants/Loading.jsx'; // Import Loading component
import Footer from '../componants/Footer.jsx';
import useScrollToSection from '../../hooks/useScrollToSection.jsx'; // Import custom hook

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { authState, logout, isLoading, errorMessage: authErrorMessage } = useAuth(); 
  console.log(authState); // Print authState

  const { isScrolled, activeSection, scrollToSection } = useScrollToSection(); // Use custom hook

  useEffect(() => {
    if (authErrorMessage) {
      setShowError(true);
      setErrorMessage(authErrorMessage);
      setTimeout(() => {
        setShowError(false);
        setErrorMessage('');
      }, 3000);
    }
  }, [authErrorMessage]);

  const handleFeatureClick = (feature) => {
    if (!authState.isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate(feature.path); // Navigate to feature route using feature's path
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
      {isLoading && <Loading />}
      {showError && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-2 z-50">
          {errorMessage}
        </div>
      )}
      <BackgroundGrid />
      {/* <div className="absolute inset-0 z-0">
        <img src="path/to/ your/design-image.png" alt="Design Background" className="w-full h-full object-cover opacity-10" />
      </div> */}

      <Header
        isScrolled={isScrolled}
        navItems={navItems}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        showProfileDropdown={showProfileDropdown}
        setShowProfileDropdown={setShowProfileDropdown}
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
        authState={authState} 
        logout={logout}
      />
      <Adv/>
      <Features
        features={features}
        iconMap={iconMap}
        handleFeatureClick={handleFeatureClick} // Pass feature to handleFeatureClick
        setHoveredIndex={setHoveredIndex}
        hoveredIndex={hoveredIndex}
        setSelectedFeature={setSelectedFeature}
      />
      <Pricing/>
      <ContactUs/>

      {!authState.isAuthenticated && showLoginModal && (
        <LoginModal setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal} />
      )}
      {showSignupModal && <SignupModal setShowSignupModal={setShowSignupModal} setShowLoginModal={setShowLoginModal} />}
  
      <FeatureSelections
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
      />
        <Footer />

    </div>
  );
};

export default HomePage;