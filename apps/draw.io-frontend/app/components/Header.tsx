import React from 'react';
import Link from 'next/link';
import { PenTool, ChevronDown, Github, Users } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            <PenTool className="h-8 w-8" />
            <span>DRAW.IO</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Teams</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Roadmap</a>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                <span>Resources</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Github className="h-4 w-4" />
                <span>12k</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>50k+</span>
              </div>
            </div>
            <Link 
              href="/signin" 
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Sign in
            </Link>
            <Link 
              href="/signup" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              Free whiteboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;