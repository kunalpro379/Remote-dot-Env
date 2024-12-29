import React from 'react';
import {  X, Info  } from 'lucide-react';

import ReactDOM from 'react-dom/client'; // Updated import
const Features=(
    {
        features,
        iconMap,
        handleFeatureClick,
        setHoveredIndex,
        hoveredIndex,
        setSelectedFeature,

    }
)=>{return(
    <section id="features" className="py-15">
    <div className="max-w-7xl mx-auto px-4">
      {/* <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
        Powerful Features for Modern Development
      </h2> 
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon];
          return (
            <div
              key={index}
              className={`
                group relative 
                bg-gradient-to-br from-white/5 to-white/10
                backdrop-blur-xl rounded-2xl
                shadow-xl hover:shadow-2xl 
                transition-all duration-500
                cursor-pointer 
                transform hover:scale-105
                border border-white/10
                hover:border-purple-500/30
                overflow-hidden
              `}
              onClick={() => handleFeatureClick(feature)} // Pass feature to handleFeatureClick
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                    <Icon className={`
                      w-8 h-8 text-white
                      transition-transform duration-500
                      ${hoveredIndex === index ? 'scale-110' : 'scale-100'}
                    `} />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeature(feature);
                    }}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Info className="w-5 h-5 text-white/80" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);}
export default Features;