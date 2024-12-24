import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  X, Info  } from 'lucide-react';
import features from '../features.json'; 
import SignupModal from '../../Features/Authentication/views/Signup.jsx';
import LoginModal from '../../Features/Authentication/views/Login.jsx';
import ProfileAvatar from '../componants/profile.jsx';
import BackgroundGrid from '../componants/BackGroundGrid.jsx';
import { iconMap } from '../../constants/iconMap';
import { navItems } from '../../constants/navItems';
const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup states
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const handleFeatureClick = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
      <BackgroundGrid />
      {/* <div className="absolute inset-0 z-0">
        <img src="path/to/your/design-image.png" alt="Design Background" className="w-full h-full object-cover opacity-10" />
      </div> */}

      <header 
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500 
          ${isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}
        `}
      
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
              RemoteEnv
            </h1>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative px-2 py-1 text-sm font-medium tracking-wide
                    transition-colors duration-300
                    ${activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'}
                    group
                  `}
                >
                  {item.label}
                  <span className={`
                    absolute bottom-0 left-0 w-full h-0.5
                    bg-gradient-to-r from-purple-400 to-pink-500
                    transform origin-left transition-transform duration-300
                    ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `}></span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 text-sm font-medium text-white hover:text-purple-400 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg hover:shadow-purple-500/25"
              >
                Get Started
              </button>
              <ProfileAvatar 
                isAuthenticated={isAuthenticated}
                mockUser={{ name: "John Doe", role: "Developer" }}
                showProfileDropdown={showProfileDropdown}
                setShowProfileDropdown={setShowProfileDropdown}
                setShowLoginModal={setShowLoginModal}
                setShowSignupModal={setShowSignupModal}
                setIsAuthenticated={setIsAuthenticated}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Development Environment,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Anywhere, Anytime
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience seamless development with our cloud-powered workspace solution
          </p>
        </div>
      </section>

      <section id="features" className="py-15">
        <div className="max-w-7xl mx-auto px-4">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Powerful Features for Modern Development
          </h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className={`
                    group relative 
                    bg-gradient-to-br from-white/5 to-white/10
                    backdrop-blur-xl rounded-2xl
                    shadow-xl hover:shadow-2xl 
                    transition-all duration-500
                    cursor-pointer 
                    transform hover:scale-105
                    border border-white/10
                    hover:border-purple-500/30
                    overflow-hidden
                  `}
                  onClick={handleFeatureClick}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                  <div className="relative p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                        <Icon className={`
                          w-8 h-8 text-white
                          transition-transform duration-500
                          ${hoveredIndex === index ? 'scale-110' : 'scale-100'}
                        `} />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFeature(feature);
                        }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <Info className="w-5 h-5 text-white/80" />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-3 from-blue to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          </div>
        </div>
      </section>

      <section id="feedback" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            What Our Users Say
          </h2>
        </div>
      </section>

      {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal} />}
      {showSignupModal && <SignupModal setShowSignupModal={setShowSignupModal} setShowLoginModal={setShowLoginModal} />}
      
      {selectedFeature && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedFeature(null)}
        >
          <div 
            className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-purple-500/20"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {selectedFeature.title}
              </h2>
              <button
                onClick={() => setSelectedFeature(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white/80" />
              </button>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              {selectedFeature.info}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;