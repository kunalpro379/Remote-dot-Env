import React from 'react';

const FileReceiver = ({ receiverCode, setReceiverCode, isSearching, handleConnect }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">Enter Sender's Code:</label>
      <input 
        type="text"
        value={receiverCode}
        onChange={(e) => setReceiverCode(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-2"
        placeholder="Enter code..."
      />

      <button 
        onClick={handleConnect}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2 ${
          !receiverCode ? 'bg-gray-400 cursor-not-allowed' : ''
        }`}
        disabled={!receiverCode}
      >
        {isSearching ? (
          <span className="animate-spin">Connecting...</span>
        ) : (
          'Connect'
        )}
      </button>
    </div>
  );
};

export default FileReceiver;
