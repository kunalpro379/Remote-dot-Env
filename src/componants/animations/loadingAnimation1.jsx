import React, { useEffect, useRef } from 'react';

const LottieAnimation = ({ src }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Dynamically import the script for the dotlottie-player
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <dotlottie-player
        ref={playerRef}
        src={src} // Use the passed src prop for dynamic animation source
        background="transparent"
        speed="1"
        style={{ width: '300px', height: '300px' }} // Adjust size as needed
        direction="1"
        playMode="normal"
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default LottieAnimation;
