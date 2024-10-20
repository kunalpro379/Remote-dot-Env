import React, { useState } from 'react';

const DesktopController = ({ onSelect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showRoleCard, setShowRoleCard] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [uniqueId, setUniqueId] = useState('');
  const [passKey, setPassKey] = useState('');
  const [inputError, setInputError] = useState('');

  const title = "Control a Remote Desktop";
  const description = "As a controller, you can take control of the desktop sharer's computer and perform actions remotely.";
  const steps = [
    "Obtain the unique ID and key provided by the desktop sharer.",
    "Establish a secure connection with the server using the provided credentials.",
    "Send a request to the desktop sharer to download and run a script on their computer.",
    "Wait for the desktop sharer to accept the request and run the script.",
    "Once accepted, you will be able to control the desktop sharer's screen and perform actions remotely."
  ];

  const handleConnect = () => {
    // Validate inputs
    if (uniqueId.length !== 15 || passKey.length !== 10) {
      setInputError('Please enter a 15-digit unique ID and a 10-digit passkey.');
      return;
    }
    setInputError('');
    setIsConnecting(true);
    setAnimationPhase(1);

    // Phase 1: Initial connection animation
    setTimeout(() => {
      setAnimationPhase(2);
    }, 1000);

    // Phase 2: Show processing
    setTimeout(() => {
      setAnimationPhase(3);
    }, 2000);

    // Phase 3: Complete and show the role card
    setTimeout(() => {
      setIsConnecting(false);
      setShowRoleCard(true);
      onSelect({ title, description, steps });
    }, 3000);
  };

  const closeRoleCard = () => {
    setShowRoleCard(false);
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <div className="w-full md:w-auto">
        <input
          type="text"
          placeholder="Enter 15-digit Unique ID"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          maxLength={15}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
          type="text"
          placeholder="Enter 10-digit Passkey"
          value={passKey}
          onChange={(e) => setPassKey(e.target.value)}
          maxLength={10}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {inputError && <p className="text-red-500 mt-2">{inputError}</p>}
      </div>

      <button
        onClick={handleConnect}
        className={`
          relative overflow-hidden
          bg-red-500 text-white px-12 py-4 rounded-xl shadow-lg 
          hover:bg-red-600 transition-all duration-300 
          w-full md:w-auto text-lg md:text-xl
          ${isConnecting ? 'cursor-not-allowed opacity-75' : 'hover:scale-105'}
        `}
        disabled={isConnecting}
      >
        <span className={`transition-opacity duration-300 ${isConnecting ? 'opacity-0' : 'opacity-100'}`}>
          Desktop Controller
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
            <div className={`
              absolute inset-0 rounded-full border-4 border-blue-500 
              animate-[spin_3s_linear_infinite] 
              transition-all duration-500
              ${animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `}></div>
            
            <div className={`
              h-12 w-12 rounded-full bg-blue-500
              animate-[pulse_1s_ease-in-out_infinite]
              transition-all duration-500
              ${animationPhase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `}></div>

            <div className={`
              absolute inset-0 flex items-center justify-center
              text-3xl text-white
              transition-all duration-500
              ${animationPhase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `}>
              ✓
            </div>
          </div>
          <div className="text-gray-700 text-base md:text-lg animate-pulse">
            {animationPhase === 1 && "Initiating connection..."}
            {animationPhase === 2 && "Securing channel..."}
            {animationPhase === 3 && "Almost ready..."}
          </div>
        </div>
      )}

      {showRoleCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-500">
          <div className="bg-white bg-opacity-90 rounded-xl p-6 md:p-8 shadow-2xl w-full max-w-2xl mx-4 md:mx-0 relative
                        transform transition-all duration-500 animate-[slideIn_0.5s_ease-out]">
            <button
              onClick={closeRoleCard}
              className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition duration-300 text-xl"
            >
              X
            </button>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{title}</h2>
            <p className="mt-2 text-black text-base md:text-lg">{description}</p>
            <ul className="mt-4 space-y-2">
              {steps.map((step, index) => (
                <li key={index} 
                    className="text-blue-500 flex items-center space-x-2 text-sm md:text-base
                             animate-[fadeIn_0.5s_ease-out]"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="text-red-500 text-base md:text-lg">Step{index + 1}:</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => window.location.href = `/remote-desktop/${uniqueId}`}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 text-lg md:text-xl"
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

export default DesktopController;
