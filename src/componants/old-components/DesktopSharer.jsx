import React, { useEffect, useState } from 'react';
//NOTE### this approach was removed from the project

const generateUniqueId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 20 }, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
};

const DesktopSharer = ({ onSelect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showRoleCard, setShowRoleCard] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [uniqueId, setUniqueId] = useState('');

  const title = "Share Your Desktop";
  const description = "As a controller, you can take control of the desktop sharer's computer and perform actions remotely.";
  const steps = [
    "Copy the unique ID and share it with a trusted controller.",
    "Wait for the connection.",
    "Automatically, a script will be downloaded on your side.",
    "You will be notified whether to run the script or stop it.",
    "Your desktop will be shared."
  ];

  useEffect(() => {
    const storedId = localStorage.getItem('uniqueId');
    const storedTime = localStorage.getItem('uniqueIdTime');

    const currentTime = Date.now();

    if (storedId && storedTime) {
      if (currentTime - storedTime < 1200000) {
        setUniqueId(storedId);
      } else {
        const newId = generateUniqueId();
        setUniqueId(newId);
        localStorage.setItem('uniqueId', newId);
        localStorage.setItem('uniqueIdTime', currentTime);
      }
    } else {
      const newId = generateUniqueId();
      setUniqueId(newId);
      localStorage.setItem('uniqueId', newId);
      localStorage.setItem('uniqueIdTime', currentTime);
    }

    const intervalId = setInterval(() => {
      const newId = generateUniqueId();
      setUniqueId(newId);
      localStorage.setItem('uniqueId', newId);
      localStorage.setItem('uniqueIdTime', Date.now());
    }, 1200000); 

    return () => clearInterval(intervalId);
  }, []);

  const handleConnect = () => {
    setIsConnecting(true);
    setAnimationPhase(1);

    setTimeout(() => {
      setAnimationPhase(2);
    }, 1000);

    setTimeout(() => {
      setAnimationPhase(3);
    }, 2000);

    setTimeout(() => {
      setIsConnecting(false);
      setShowRoleCard(true);
      onSelect({ title, description, steps });
    }, 3000);
  };

  const closeRoleCard = () => {
    setShowRoleCard(false);
  };

  const handleProceed = () => {
    window.location.href = `/remote-desktop/${uniqueId}`; // Use uniqueId instead of storedId
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <button
        onClick={handleConnect}
        className={`relative overflow-hidden
          bg-red-500 text-white px-12 py-4 rounded-xl shadow-lg 
          hover:bg-red-600 transition-all duration-300 
          w-full md:w-auto text-xl md:text-2xl
          ${isConnecting ? 'cursor-not-allowed opacity-75' : 'hover:scale-105'}`}
        disabled={isConnecting}
      >
        <span className={`transition-opacity duration-300 ${isConnecting ? 'opacity-0' : 'opacity-100'}`}>
          Desktop Sharer
        </span>
        {isConnecting && (
          <span className="absolute inset-0 flex items-center justify-center">
            Connecting...
          </span>
        )}
      </button>

      {isConnecting && (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full border-4 border-blue-500 
              animate-[spin_3s_linear_infinite] 
              transition-all duration-500
              ${animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            ></div>
            
            <div className={`h-16 w-16 rounded-full bg-blue-500
              animate-[pulse_1s_ease-in-out_infinite]
              transition-all duration-500
              ${animationPhase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            ></div>

            <div className={`absolute inset-0 flex items-center justify-center
              text-4xl text-white
              transition-all duration-500
              ${animationPhase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            >
              ✓
            </div>
          </div>
          <div className="text-gray-700 text-lg md:text-2xl animate-pulse">
            {animationPhase === 1 && "Initiating connection..."}
            {animationPhase === 2 && "Securing channel..."}
            {animationPhase === 3 && "Almost ready..."}
          </div>
        </div>
      )}

      {showRoleCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-500">
          <div className="bg-white bg-opacity-90 rounded-xl p-8 md:p-16 shadow-2xl w-full max-w-3xl mx-4 md:mx-0 relative
                          transform transition-all duration-500 animate-[slideIn_0.5s_ease-out]">
            <button
              onClick={closeRoleCard}
              className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition duration-300 text-2xl"
            >
              ×
            </button>

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">{title}</h2>
            <p className="mt-4 text-black text-lg md:text-2xl">{description}</p>
            <ul className="mt-6 space-y-3 md:space-y-4">
              {steps.map((step, index) => (
                <li key={index} 
                    className="text-blue-500 flex items-center space-x-3 md:space-x-4 text-base md:text-xl
                             animate-[fadeIn_0.5s_ease-out]"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="text-red-500 text-lg md:text-2xl">Step {index + 1}:</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-8 md:mt-12">
              <button
                onClick={handleProceed}
                className="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 text-xl md:text-2xl"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopSharer;
