import React from "react";
import ProfileAvatar from "../componants/profile";

const Header = ({
  isScrolled,
  navItems,
  activeSection,
  scrollToSection,
  showProfileDropdown,
  setShowProfileDropdown,
  setShowLoginModal,
  setShowSignupModal,
  authState,
  logout
}) => {
  return (
    <header 
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500 
        ${isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-red-500 to-purple-600 shimmer">
            Remote.Env
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
            <button
              onClick={() => scrollToSection('testimonials')}
              className={`relative px-2 py-1 text-sm font-medium tracking-wide transition-colors duration-300 ${activeSection === 'testimonials' ? 'text-white' : 'text-gray-400 hover:text-white'} group`}
            >
              Testimonials
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transform origin-left transition-transform duration-300 ${activeSection === 'testimonials' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {authState.isAuthenticated ? (
              <div className="text-white">
                Welcome, {authState.user?.payload?.['cognito:username'] || 'Guest'}
              </div>
            ) : (
              <>
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
              </>
            )}
            <ProfileAvatar 
              isAuthenticated={authState.isAuthenticated}
              mockUser={{ username: authState.user?.payload?.['cognito:username'] || 'Guest', role: "User" }}
              showProfileDropdown={showProfileDropdown}
              setShowProfileDropdown={setShowProfileDropdown}
              setShowLoginModal={setShowLoginModal}
              setShowSignupModal={setShowSignupModal}
              setIsAuthenticated={() => {}}
              logout={logout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;