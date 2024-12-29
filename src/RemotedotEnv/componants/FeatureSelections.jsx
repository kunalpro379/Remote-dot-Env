import React from "react";
import {  X, Info  } from 'lucide-react';

const FeatureSelections = ({ 
    selectedFeature,
    setSelectedFeature,

 }) => {
return(
          selectedFeature && (
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedFeature(null)}
            >
              <div 
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-purple-500/20"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {selectedFeature.title}
                  </h2>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-white/80" />
                  </button>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {selectedFeature.info}
                </p>
              </div>
            </div>
          )
);
};

export default FeatureSelections;