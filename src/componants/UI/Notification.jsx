import React from "react";
import { Bell } from 'lucide-react'; 

const Notification = () => {
  return (
    <div className="relative">
      <button className="text-white hover:text-gray-400 transition-colors">
        <Bell className="w-6 h-6" />
      </button>
      <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
    </div>
  );
};

export default Notification;