import React, { useState } from 'react';
import '../styles/Card.css'; // Import the CSS file for the card styles
import { Menu } from 'lucide-react'; // Import the Menu icon
import squid from '../../assets/squid.png'; // Ensure this path is correct
import git1 from '../../assets/git1.png'; // Ensure this path is correct
import git2 from '../../assets/git2.png'; // Ensure this path is correct
const Card = ({ project }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="card flex flex-col bg-white shadow-md rounded-lg p-3">
      <div className="flex flex-col w-full">
        <div className="w-full mb-2 flex flex-row justify-between">
          <div className='flex items-center flex-row'>
            <img src={squid} alt={project.name} className="w-10 h-12 rounded-full" />
              <div className='flex flex-col ml-2 items-start '>
                <button className='font-bold' >{project.name}</button>
                <button className='text-sm' >
                  <href>{project.url}</href>
                </button>

              </div>
          </div>

          <div className='flex flex-row'>
            <button onClick={toggleMenu} className="menu-button">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            {showMenu && (
              <div className="menu bg-white shadow-lg rounded-lg p-2">
                <ul>
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mb-2 flex flex-row justify-between">
          <div className='flex items-center'>
            <img src={git1} alt="" className="w-4 h-4 mr-2" />
            <div className="bg-gray-900 x-1 my-1 rounded-lg px-3 py-1"><button>{project.repo}</button></div>
          </div>
        </div>
        <div className="w-full mb-2 flex flex-col justify-between ">
          
          <div className='flex items-center mx-1 text-sm'>
            <p>{project.latestCommit}</p>
          </div>
          <div className='flex items-center'>
          <div className='flex items-center mx-1'>
            <p>{project.timestamp}</p>
          </div>
          <div className='flex items-center mx-1'>
            
            <img src={git2} alt="" className="w-4 h-4" />
            <p className='font-bold'>{project.branch}</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
