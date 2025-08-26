import React from 'react';
import { Github, ArrowRight, Zap, Users, Share2 } from 'lucide-react';
import DecorativeElements from './DecorativeElements';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <DecorativeElements />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Heading */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Online 
            <span className="relative mx-4">
              <span className="bg-gradient-to-r from-green-200 to-green-300 px-4 py-2 rounded-lg inline-block transform -rotate-1">
                diagrams
              </span>
            </span>
            made simple
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create, Collaborate, Share. Simply with Draw.io.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="group bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center space-x-2">
              <span>Start drawing</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group flex items-center space-x-3 bg-white/80 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 font-medium shadow-md hover:shadow-lg border border-gray-200">
              <Github className="h-5 w-5 text-orange-500" />
              <span>12k on GitHub</span>
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-12">
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 border border-gray-200">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Lightning fast</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 border border-gray-200">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Real-time collaboration</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 border border-gray-200">
              <Share2 className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Easy sharing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;