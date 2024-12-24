//This is reomvoed From project 

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, Button, Input, Alert } from './ui-components';

const RemoteDesktop = () => {
  const [key, setKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [filename, setFilename] = useState('undefined');
  const intervalRef = useRef(null);
  const imgRef = useRef(null);
  const serverUrl = 'http://192.168.43.227:5000';

  const handleConnect = async () => {
    try {
      const response = await fetch(`${serverUrl}/new_session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _key: key }),
      });

      if (response.status === 200 || response.status === 500) {
        const data = await response.json();
        setIsConnected(true);
        setError('');
        startImageLoop();
        if (response.status === 500) {
          alert(data.error);
        }
      } else {
        setError('Failed to connect. Please check your key and try again.');
      }
    } catch (err) {
      setError(`Connection error: ${err.message}`);
    }
  };

  const postEvent = useCallback(async (payload) => {
    try {
      const response = await fetch(`${serverUrl}/event_post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload, _key: key }),
      });

      if (!response.ok) {
        console.error('Failed to post event');
      }
    } catch (err) {
      console.error('Error posting event:', err);
    }
  }, [key]);

  const fetchImage = useCallback(async () => {
    try {
      const response = await fetch(`${serverUrl}/rd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          __: Date.now(), 
          filename: filename, 
          _key: key 
        }),
      });

      const newFilename = response.headers.get('filename');
      setFilename(newFilename);

      const blob = await response.blob();
      if (blob.size) {
        const objectURL = URL.createObjectURL(blob);
        if (imgRef.current) {
          imgRef.current.src = objectURL;
        }
      }
    } catch (err) {
      console.error('Error fetching image:', err);
    }
  }, [key, filename]);

  const startImageLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(fetchImage, 500);
  }, [fetchImage]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (isConnected) {
      event.preventDefault();
      postEvent({
        type: 'keydown',
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        key: event.key,
      });
    }
  }, [isConnected, postEvent]);

  const handleImageClick = useCallback((event) => {
    if (isConnected) {
      postEvent({
        type: 'click',
        x: event.clientX,
        y: event.clientY,
      });
    }
  }, [isConnected, postEvent]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-4xl mx-auto p-6">
        {!isConnected ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Remote Desktop Controller</h2>
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter your connection key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleConnect}>Connect</Button>
            </div>
            {error && (
              <Alert variant="error">
                {error}
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Connected</h2>
              <Button 
                variant="destructive" 
                onClick={() => {
                  setIsConnected(false);
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                  }
                }}
              >
                Disconnect
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <img
                ref={imgRef}
                onClick={handleImageClick}
                alt="Remote Desktop"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RemoteDesktop;