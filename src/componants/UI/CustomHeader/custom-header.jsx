import React from "react";

const CustomHeader = ({ isScrolled, children }) => {
  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500 
        ${isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {children}
      </div>
    </header>
  );
};

export default CustomHeader;