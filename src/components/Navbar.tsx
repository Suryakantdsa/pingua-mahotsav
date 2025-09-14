import React from "react";
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <div className="flex items-center space-x-2">
            <Image
              src="https://storage.googleapis.com/pingua-mahotsav/logo_1.png" // replace with your festival logo path
              alt="Pingua Mahotsav Logo"
              width={64}
              height={64}
              quality={100}
              className="rounded-full shadow-md border border-orange-200 object-contain"
            />

            <span className="text-xl font-extrabold text-orange-800 tracking-wide hover:text-orange-600 transition-colors">
              Pingua Mahotsav
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 font-medium">
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
