import React from "react";
import { Sparkles } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-orange-600" />
            <span className="text-xl font-bold text-orange-800">
              Pingua Mahotsav
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#events"
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Events
            </a>
            <a
              href="#map"
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Venue Map
            </a>
            <a
              href="#organizers"
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Organizers
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
