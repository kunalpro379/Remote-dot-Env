import React, { useEffect } from "react";

const SuccessMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default SuccessMessage;