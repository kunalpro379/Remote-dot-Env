import React from 'react';
import { ArrowRight } from 'lucide-react'; 
import '../styles/Arrow.css';

const Arrow = () => {
  return (
    <div className="arrow-container flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full">
      <ArrowRight className="text-white w-6 h-6" />
    </div>
  );
};

export default Arrow;