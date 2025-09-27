"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effect and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "events", "map", "organizers", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home", icon: "🏠" },
    { href: "#events", label: "Events", icon: "🎭" },
    { href: "#map", label: "Venue Map", icon: "🗺️" },
    { href: "#organizers", label: "Organizers", icon: "👥" },
    { href: "#contact", label: "Contact", icon: "📞" },
  ];

  const MobileMenu = () => (
    <div
      className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg border-b border-orange-200 transition-all duration-300 ${
        isMobileMenuOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="px-4 py-4 space-y-4">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === item.href.slice(1)
                ? "bg-orange-100 text-orange-700 font-semibold"
                : "text-gray-700 hover:bg-orange-50"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-base font-medium">{item.label}</span>
          </a>
        ))}
        {/* CTA Button in Mobile Menu */}
        {/* <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
          🎉 Register Now
        </button> */}
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200 py-1"
            : "bg-white/80 backdrop-blur-sm shadow-md border-b border-orange-100 py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Title */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="https://storage.googleapis.com/pingua-mahotsav/logo_1.png"
                  alt="Pingua Mahotsav Logo"
                  width={isScrolled ? 48 : 56}
                  height={isScrolled ? 48 : 56}
                  quality={100}
                  className={`rounded-full shadow-md border-2 border-orange-300 object-contain transition-all duration-300 ${
                    isScrolled ? "scale-90" : "scale-100"
                  }`}
                />
                {/* Animated ping effect */}
                <div className="absolute inset-0 rounded-full border-2 border-orange-400 animate-ping opacity-0"></div>
              </div>

              <div className="flex flex-col">
                <span
                  className={`font-extrabold text-orange-800 tracking-wide transition-all duration-300 ${
                    isScrolled ? "text-lg" : "text-xl"
                  }`}
                >
                  Pingua Mahotsav
                </span>
                <span className="text-xs text-orange-600 font-medium -mt-1">
                  13th Annual Celebration
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-200 group ${
                    activeSection === item.href.slice(1)
                      ? "bg-orange-100 text-orange-700 font-semibold shadow-inner"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-base font-medium relative">
                    {item.label}
                    {/* Hover underline effect */}
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full ${
                        activeSection === item.href.slice(1) ? "w-full" : ""
                      }`}
                    ></span>
                  </span>
                </a>
              ))}

              {/* CTA Button */}
              {/* <button className="ml-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <span>🎉</span>
                <span>Register</span>
              </button> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col space-y-1.5 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span
                className={`w-6 h-0.5 bg-orange-600 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-orange-600 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-orange-600 transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      <style jsx>{`
        @keyframes ping-small {
          75%,
          100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping-small 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;
