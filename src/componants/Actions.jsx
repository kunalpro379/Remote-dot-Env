import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Share, Code, Users, Video, Clipboard, CheckSquare, FileText, X, Info, User, Settings, LogOut, Mail, Lock, AlertCircle, CameraIcon, Database, Globe2Icon } from 'lucide-react';
import Authentication from './Authentication';
import Homepage from './Homepage';

const RemoteDesktopCard = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup states
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    role: "Premium User"
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "test@test.com" && password === "password") {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your signup logic here
    if (signupPassword === signupConfirmPassword) {
      setIsAuthenticated(true);
      setShowSignupModal(false);
      // Reset form
      setSignupEmail('');
      setSignupPassword('');
      setSignupName('');
      setSignupConfirmPassword('');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleFeatureClick = (feature) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate(feature.path);
    }
  };

  return (
    <>
      <Authentication 
        setIsAuthenticated={setIsAuthenticated} 
        setShowLoginModal={setShowLoginModal} 
        setShowSignupModal={setShowSignupModal} 
        setShowError={setShowError} 
        setEmail={setEmail} 
        setPassword={setPassword} 
        setSignupEmail={setSignupEmail} 
        setSignupPassword={setSignupPassword} 
        setSignupName={setSignupName} 
        setSignupConfirmPassword={setSignupConfirmPassword} 
        handleLogin={handleLogin} 
        handleSignup={handleSignup} 
      />
      <Homepage 
        features={features} 
        handleFeatureClick={handleFeatureClick} 
        selectedFeature={selectedFeature} 
        setSelectedFeature={setSelectedFeature} 
        hoveredIndex={hoveredIndex} 
        setHoveredIndex={setHoveredIndex} 
        showProfileDropdown={showProfileDropdown} 
        setShowProfileDropdown={setShowProfileDropdown} 
        mockUser={mockUser} 
        isAuthenticated={isAuthenticated} 
      />
    </>
  );
};

export default RemoteDesktopCard;