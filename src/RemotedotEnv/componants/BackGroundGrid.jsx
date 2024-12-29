import React from "react";

const BackgroundGrid = () => {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
              <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(255, 255, 255, 0.13)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    );

  };
  

  export default BackgroundGrid;