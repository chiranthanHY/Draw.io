import React from 'react';

const DecorativeElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating shapes and elements */}
      <div className="absolute top-20 left-10 transform rotate-12">
        <div className="bg-pink-200 rounded-lg p-3 shadow-lg">
          <span className="text-sm font-medium text-pink-800">brainstorm</span>
        </div>
      </div>
      
      <div className="absolute top-32 right-16 transform -rotate-6">
        <div className="bg-yellow-200 rounded-lg p-3 shadow-lg">
          <span className="text-sm font-medium text-yellow-800">ideate</span>
        </div>
      </div>

      <div className="absolute bottom-40 left-20 transform rotate-6">
        <div className="bg-blue-200 rounded-lg p-3 shadow-lg">
          <span className="text-sm font-medium text-blue-800">collaborate</span>
        </div>
      </div>

      <div className="absolute bottom-32 right-20 transform -rotate-3">
        <div className="bg-green-200 rounded-lg p-3 shadow-lg">
          <span className="text-sm font-medium text-green-800">visualize</span>
        </div>
      </div>

      <div className="absolute top-1/2 left-8 transform -rotate-12">
        <div className="bg-purple-200 rounded-lg p-3 shadow-lg">
          <span className="text-sm font-medium text-purple-800">workflow</span>
        </div>
      </div>

      <div className="absolute top-1/3 right-8 transform rotate-8">
        <div className="bg-indigo-200 rounded-lg p-3 shadow-lg">
          <span className="text-sm font-medium text-indigo-800">design</span>
        </div>
      </div>

      {/* Abstract shapes */}
      <div className="absolute top-16 left-1/3 w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-lg opacity-60 animate-pulse delay-300"></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-br from-teal-200 to-green-200 rounded-full opacity-60 animate-pulse delay-700"></div>
      
      {/* Lines and connectors */}
      <svg className="absolute inset-0 w-full h-full" style={{zIndex: -1}}>
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
            <circle cx="20" cy="20" r="1" fill="#e2e8f0"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.5"/>
      </svg>
    </div>
  );
};

export default DecorativeElements;