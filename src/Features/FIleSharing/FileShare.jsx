import React, { useState, useCallback } from 'react';
import { Send, Download, Copy, X, Loader2, UserCircle } from 'lucide-react';
import useSubscriptionReceiver from '../hooks/SubscriptionHook';

export default function FileSharePopup() {
  const [mode, setMode] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [receiverCode, setReceiverCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);

  // Assume this is the current user's ID
  const userId = 'kunal'; // Replace with actual logic to get current user ID
  
  // Subscription query
  const query = `
subscription OnFileChunkReceived($receiverId: ID!) {
  fileChunkReceived(receiverId: $receiverId) {
    fileId
    chunkIndex
    chunkData
    totalChunks
    senderId
    receiverId
  }
}
  `;
  
  // Subscription handler
  const handleUpdate = useCallback((update) => {
    if (update?.senderId) {
      setConnectedUsers(prev => {
        if (!prev.find(user => user.id === update.senderId)) {
          return [...prev, { id: update.senderId, name: `User ${update.senderId}` }];
        }
        return prev;
      });
    }
  }, []);

  const handleConnectionChange = useCallback((isConnected) => {
    setConnectionStatus(isConnected ? 'connected' : 'disconnected');
  }, []);

  const variables = { 
    receiverId: mode === 'send' ? userId : null, // Assign userId to receiverId when sending
    senderId: mode === 'receive' ? receiverCode : null // Use receiverCode as senderId when receiving
  };

  // Only use subscription when isSubscriptionActive is true
  const { isConnected, reconnect } = useSubscriptionReceiver(
    isSubscriptionActive ? query : null,
    isSubscriptionActive ? variables : null,
    handleUpdate,
    handleConnectionChange
  );

  const generateCode = () => {
    const code = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 6)
      .toUpperCase();
    setGeneratedCode(code);
    return code;
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setShowPopup(true);
    setError(null);
    if (selectedMode === 'send') {
      generateCode();
      // Activate subscription when sending
      setIsSubscriptionActive(true);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy code');
    }
  };

  const handleConnect = () => {
    if (mode === 'receive' && (!receiverCode || receiverCode.length !== 6)) {
      setError('Please enter a valid 6-character code');
      return;
    }
    setIsSearching(true);
    setError(null);
    // Activate subscription when connecting
    setIsSubscriptionActive(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setMode(null);
    setGeneratedCode('');
    setReceiverCode('');
    setIsSearching(false);
    setConnectedUsers([]);
    setError(null);
    // Deactivate subscription when closing
    setIsSubscriptionActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">File Transfer</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleModeSelect('send')}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
            >
              <Send size={20} />
              Send File
            </button>
            <button
              onClick={() => handleModeSelect('receive')}
              className="flex items-center justify-center gap-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition"
            >
              <Download size={20} />
              Receive File
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 sm:max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {mode === 'send' ? 'Send File' : 'Receive File'}
              </h3>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {mode === 'send' && (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-500">Share this code with receiver:</p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="text-2xl font-mono bg-gray-100 px-4 py-2 rounded">
                      {generatedCode}
                    </code>
                    <button
                      onClick={copyCode}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <Copy size={20} />
                    </button>
                  </div>
                  {isCopied && (
                    <p className="text-green-500 text-sm">Copied to clipboard!</p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Connected Users:</h4>
                  {connectedUsers.length > 0 ? (
                    <ul className="space-y-2">
                      {connectedUsers.map(user => (
                        <li key={user.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <UserCircle size={20} className="text-gray-500" />
                          <span>{user.name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">Waiting for users to connect...</p>
                  )}
                </div>
              </div>
            )}

            {mode === 'receive' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Enter sender's code:</label>
                  <input
                    type="text"
                    value={receiverCode}
                    onChange={(e) => setReceiverCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="w-full text-center text-2xl font-mono uppercase bg-gray-100 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ENTER CODE"
                  />
                </div>

                <button
                  onClick={handleConnect}
                  disabled={isSearching}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Connecting...
                    </>
                  ) : (
                    'Connect'
                  )}
                </button>

                {connectionStatus === 'connected' && (
                  <p className="text-green-500 text-center">
                    Connected to sender!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
