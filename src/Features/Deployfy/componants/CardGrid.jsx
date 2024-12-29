import React from 'react';
import Card from '../../../componants/UI/Card.jsx'; // Import the Card component
import projects from '../data/projects.json'; // Import the projects data
import './CardGrid.css'; // Import the CSS file for the grid styles

const CardGrid = () => {
  return (
    <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {projects.map((project, index) => (
        <Card 
          key={index} 
          project={project} // Pass the project data to the Card component
        />
      ))}
    </div>
  );
};

export default CardGrid;