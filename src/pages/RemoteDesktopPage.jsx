// RemoteDesktopPage.jsx
import React, { useState, useEffect } from 'react';
import DesktopSharer from '../componants/DesktopSharer';
import DesktopController from '../componants/DesktopController';
// Function to generate a passkey ID
const generatepasskey = () => {
  return Math.random().toString(36).substr(2, 20);
};

// Main Component for RemoteDesktop
const RemoteDesktopPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [passkey, setpasskey] = useState(generatepasskey());

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  // Function to copy passkey ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(passkey);
    alert('passkey ID copied to clipboard!');
  };

  // Hardcoded user information
  const userInfo = {
    username: "JohnDoe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    helpline: "+919892885090",
  };

  useEffect(() => {
    // Update the passkey ID every 60 seconds
    const intervalId = setInterval(() => {
      setpasskey(generatepasskey());
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* User Information Section */}
      <div className="mb-12 text-center p-12 bg-black rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-green-600">Welcome, {userInfo.username}!</h2>
        <p className="mt-4 text-green-500 text-2xl">Here are your details:</p>
        <ul className="mt-6 space-y-4 text-xl">
          <li><strong>Username:</strong> {userInfo.username}</li>
          <li><strong>Phone Number:</strong> {userInfo.phone}</li>
          <li><strong>Email Address:</strong> {userInfo.email}</li>
          <li><strong>Helpline Number:</strong> {userInfo.helpline}</li>
          <li className="flex items-center">
            <strong>passkey ID:</strong>
            <span className="ml-2 p-2 bg-yellow-200 text-black rounded-lg font-mono">{passkey}</span>
            <button
              onClick={copyToClipboard}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Copy
            </button>
          </li>
        </ul>
      </div>

      <h1 className="text-6xl font-bold mb-16 mt-12">Choose Your Role</h1>
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-16 space-y-8 md:space-y-0">
        <DesktopSharer onSelect={handleRoleSelection} />
        <DesktopController onSelect={handleRoleSelection} />
      </div>
    </div>
  );
};

export default RemoteDesktopPage;
