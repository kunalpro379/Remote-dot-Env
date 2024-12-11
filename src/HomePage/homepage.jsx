import React, { useEffect, useState } from 'react';
import { features } from '../../HomePage/features.json';
import { RemoteDesktopCard } from './Actions';

const Homepage = ({ setIsAuthenticated }) => {
  const [featuresList, setFeaturesList] = useState([]);

  useEffect(() => {
    // Fetch features from features.json
    setFeaturesList(features);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-16 lg:p-24">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Welcome to Remote.Env
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {featuresList.map((feature, index) => (
          <RemoteDesktopCard key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
