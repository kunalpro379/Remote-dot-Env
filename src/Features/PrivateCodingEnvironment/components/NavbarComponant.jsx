import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { data } from './data'; 

const NavbarComponent = ({ showMenu, toggleMenu, scrollToSection }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (id) => {
    setActiveItem(id);
    if (scrollToSection) {
      scrollToSection(id);
    }
  };

  return (
    <div className="h-14 flex items-center justify-between bg-black-900 text-white z-20 px-4">
      <button onClick={toggleMenu} className="menu-button">
        <Menu className="w-9 h-9 text-white" />
      </button>
      <nav className="hidden md:flex items-center space-x-8">
        {data.map((item) => (
          <button
            key={item.id}
            className={`text-white ${activeItem === item.id ? 'bg-purple-900' : 'hover:bg-gray-800'} px-3 py-2 rounded transition-colors`}
            onClick={() => handleItemClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      {showMenu && (
        <div className="menu">
          <ul>
            {data.map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer ${activeItem === item.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'} px-3 py-2 rounded transition-colors`}
                onClick={() => handleItemClick(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarComponent;
