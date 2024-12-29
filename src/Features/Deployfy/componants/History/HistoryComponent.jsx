import React from 'react';
import CardGrid from '../CardGrid'; // Import the CardGrid component

const HistoryComponent = () => {
  return (
    <div className="w-5/5 p-4 rounded-lg shadow-lg " style={{ height: 'calc(100vh - 10rem)', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>
        {`
          .w-4/5::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-white mb-2">Projects</h1>
        <a href="#more" className="text-blue-300 hover:text-blue-500 transition-colors">More</a>
      </div>
      <div className="p-4 rounded-lg">
        <CardGrid />
      </div>
    </div>
  );
};

export default HistoryComponent;