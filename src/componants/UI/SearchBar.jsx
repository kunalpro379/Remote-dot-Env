import React from "react";
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative flex items-center">
      <Search className="w-6 h-6 text-white mr-2" />
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 text-white bg-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default SearchBar;