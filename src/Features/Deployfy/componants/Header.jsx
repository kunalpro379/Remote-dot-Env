import React from "react";
import ProfileAvatar from "../../../RemotedotEnv/componants/profile";
import CustomHeader from "../../../componants/UI/CustomHeader/custom-header";
import SearchBar from "../../../componants/UI/SearchBar";
import Notifications from "../../../componants/UI/Notification";
import squidImage from '../../../assets/squid.png'; 

const Header = ({
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
    <CustomHeader>
      <div className="flex items-center space-x-4">
      <img src={squidImage} alt="Squid Logo" className="w-10 h-14" /> {/* Add the squid image */}
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Deployfy
        </h1>
        <SearchBar /> {/* Add SearchBar next to the title */}
      </div>

      <div className="flex items-center space-x-4">
        <Notifications />
        {authState.isAuthenticated ? (
          <div className="text-white">
            Welcome, {authState.user?.payload?.['cognito:username'] || 'Guest'}
          </div>
        ) : (
          <></>
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
    </CustomHeader>
  );
};

export default Header;