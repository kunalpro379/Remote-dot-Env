import React from 'react';

// Card Components
export const Card = ({ className = '', children, ...props }) => (
  <div 
    className={`bg-white rounded-lg shadow-md ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className = '', children, ...props }) => (
  <div 
    className={`px-6 py-4 border-b border-gray-200 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div 
    className={`px-6 py-4 ${className}`} 
    {...props}
  >
    {children}
  </div>
);