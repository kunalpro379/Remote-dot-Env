import React, { useState, useCallback } from 'react';
import { Share2, Copy, Loader2, Send, Download } from 'lucide-react';
import useSubscriptionReceiver from './hooks/SubscriptionHook'; // Ensure this path is correct

const FileShareCard = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [receiverCode, setReceiverCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [mode, setMode] = useState(null); // "send" or "receive"
  
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

  const handleUpdate = useCallback((update) => {
    // Handle updates here
  }, []);

  const handleConnectionChange = useCallback((isConnected) => {
    setConnectionStatus(isConnected ? 'connected' : 'disconnected');
  }, []);

  const variables = { receiverId: isSearching ? receiverCode : null };

  const { isConnected, reconnect } = useSubscriptionReceiver(
    query,
    variables,
    handleUpdate,
    handleConnectionChange
  );

  const generateCode = () => {
    try {
      const code = Array.from(crypto.getRandomValues(new Uint8Array(10)))
        .map((b) => b.toString(36))
        .join('')
        .slice(0, 15);
      setGeneratedCode(code);
      setIsCopied(false);
      setError(null);
    } catch (err) {
      setError('Failed to generate code');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleConnect = () => {
    setIsSearching(true);
    setError(null);
  };

  const handleRetryConnection = () => {
    if (!isConnected && reconnect) {
      reconnect();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">File Sharing</h2>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        {connectionStatus === 'disconnected' && isSearching && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 p-4 rounded-md mb-4">
            Connection lost.
            <button 
              onClick={handleRetryConnection}
              className="text-blue-600 underline ml-2"
            >
              Retry
            </button>
          </div>
        )}

        <div className="flex justify-between mb-4">
          <button 
            onClick={() => { setMode('send'); generateCode(); }} 
            className={`flex items-center w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${mode === 'send' && 'bg-blue-600'}`}
          >
            <Send className="mr-2" /> Send a File
          </button>
          <button 
            onClick={() => setMode('receive')}
            className={`flex items-center w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${mode === 'receive' && 'bg-green-600'}`}
          >
            <Download className="mr-2" /> Receive a File
          </button>
        </div>

        {mode === 'send' && generatedCode && (
          <div className="mb-4">
            <span className="font-medium">Your Code:</span>
            <span className="ml-2">{generatedCode}</span>
            <button onClick={handleShare} className="ml-2">
              <Share2 className="h-5 w-5 text-blue-500" />
            </button>
            {isCopied && <span className="text-green-500 ml-2">Copied!</span>}
          </div>
        )}

        {mode === 'receive' && (
          <div className="mb-4">
            <label className="block text-gray-700">Enter Sender's Code:</label>
            <input 
              type="text"
              value={receiverCode}
              onChange={(e) => setReceiverCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter code..."
            />
          </div>
        )}

        <button 
          onClick={handleConnect}
          className={`flex items-center w-full ${mode === 'send' || mode === 'receive' ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-4 rounded hover:bg-blue-700`}
          disabled={!mode || (mode === 'receive' && !receiverCode)}
        >
          {isSearching ? (
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
          ) : (
            'Connect'
          )}
        </button>

        <h3 className="mt-6 font-semibold">Connection Status:</h3>
        <p className={`mt-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
          {connectionStatus === 'connected' ? 'Connected' : 'Not Connected'}
        </p>
      </div>
    </div>
  );
};

export default FileShareCard;
