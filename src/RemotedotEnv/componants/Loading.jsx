import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="loader">
        <div className="spinner spinner1"></div>
        <div className="spinner spinner2"></div>
        <div className="spinner spinner3"></div>
      </div>
      <style>{`
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 0, 0, 0.3);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          position: absolute;
        }
        .spinner1 {
          transform: rotate(0deg);
          border: 5px solid rgba(153, 255, 0, 0.3);

          border-radius: 70%;
        }
          
        .spinner2 {
          transform: rotate(120deg);
          border: 5px solid rgb(170, 0, 255);

          border-radius: 25%;
        }
        .spinner3 {
          transform: rotate(240deg);
                    border: 5px solid rgb(34, 0, 255);

          border-radius: 10%;
        }
          .spinner4 {
          transform: rotate(240deg);
                    border: 5px solid rgb(238, 255, 0);

          border-radius: 2%;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
