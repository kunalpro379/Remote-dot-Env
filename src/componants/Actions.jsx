// RemoteDesktopCard.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// Main component
const RemoteDesktopCard = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [selectedFeature, setSelectedFeature] = useState(null); // State to manage the selected feature

  const features = [
    {
      title: "Remote Desktop",
      description: "Control another computer remotely, as if you were sitting right in front of it.",
      info: "This feature allows you to take full control of a remote desktop, enabling you to work on applications, access files, and perform tasks on another computer.",
      path: "/remote-desktop", // Add path for navigation
    },
    {
      title: "File Sharing",
      description: "Share files easily and quickly between connected computers.",
      info: "Allows users to send and receive files without storing them permanently on the remote system. Perfect for quick transfers.",
      path: "/file-sharing", // Add path for navigation
    },
  ];

  // Function to handle card click
  const handleFeatureClick = (path) => {
    console.log('Navigating to:', path); // Debug log
    navigate(path); // Use navigate to redirect to the selected feature's page
  };

  // Function to show detailed information
  const showFeatureDetails = (feature) => {
    setSelectedFeature(feature); // Set the selected feature to display details
  };

  // Function to hide detailed information
  const hideFeatureDetails = () => {
    setSelectedFeature(null); // Reset the selected feature
  };

  return (
    <div className="flex flex-wrap justify-center p-12"> {/* Increased padding */}
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="max-w-sm w-full bg-white rounded-lg shadow-lg m-8 transition-transform transform hover:-translate-y-2 cursor-pointer" // Increased margin
        >
          <div className="p-12 relative" onClick={() => handleFeatureClick(feature.path)}> {/* Increased padding */}
            <button 
              className="absolute top-6 left-6 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-800 transition duration-300" // Increased button size
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                showFeatureDetails(feature);
              }}
            >
              info
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 ml-10">{feature.title}</h2> {/* Increased title font size */}
            <p className="mt-4 text-gray-600 text-lg">{feature.description}</p> {/* Increased description font size */}
          </div>
        </div>
      ))}

      {/* Modal for detailed information */}
      {selectedFeature && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-12 shadow-lg max-w-sm w-full"> {/* Increased padding */}
            <h2 className="text-2xl font-semibold text-gray-800">{selectedFeature.title}</h2> {/* Increased title font size */}
            <p className="mt-4 text-gray-600 text-lg">{selectedFeature.info}</p> {/* Increased info font size */}
            <div className="flex justify-end mt-6"> {/* Increased margin */}
              <button 
                onClick={hideFeatureDetails} 
                className="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" // Increased button padding
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoteDesktopCard;
