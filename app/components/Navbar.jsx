'use client';

import React, { useState } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';

const Navbar = () => {
  const [session, setSession] = useState(null); // Mock session for demo
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock functions for demo
  const signIn = () => console.log('Sign in clicked');
  const signOut = () => console.log('Sign out clicked');

  const navItems = [
    { item: 'Home', path: '/' },
    { item: 'Features', path: '#features' },
    { item: 'How It Works', path: '#how-it-works' },
    { item: 'Doctors', path: '/doctors' },
    { item: 'Contact', path: '#contact' },
    { item: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo - Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <a href="/" className="block">
                  <span className="text-lg sm:text-xl lg:text-2xl text-teal-500 font-bold text-gray-800 leading-tight">
                    MediMind AI
                  </span>
                </a>
                <div className="text-xs sm:text-sm text-gray-600 -mt-0.5 sm:-mt-1 hidden sm:block">
                  AI-Powered Clinical Decision Support System
                </div>
                {/* Mobile tagline */}
                <div className="text-xs text-gray-600 -mt-0.5 block sm:hidden">
                  AI Health Assistant
                </div>
              </div>
            </div>

            {/* Desktop Nav - Hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
              {navItems.map(({ item, path }) => (
                <a
                  key={item}
                  href={path}
                  className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium relative group px-2 py-1 text-sm xl:text-base whitespace-nowrap"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              {session?.user ? (
                <div className="flex items-center space-x-2 xl:space-x-3">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-7 h-7 xl:w-8 xl:h-8 rounded-full"
                    />
                  )}
                  <span className="text-gray-700 text-sm xl:text-base max-w-24 truncate">
                    {session.user.name}
                  </span>
                  <button
                    onClick={signOut}
                    className="px-3 py-1.5 xl:px-4 xl:py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full font-semibold hover:shadow-md transition-all duration-200 text-sm xl:text-base"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={signIn}
                  className="px-4 py-1.5 xl:px-6 xl:py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm xl:text-base"
                >
                  Login
                </button>
              )}
            </div>

            {/* Tablet Auth Section - Show between md and lg */}
            <div className="hidden md:flex lg:hidden items-center space-x-3 flex-shrink-0">
              {session?.user ? (
                <div className="flex items-center space-x-2">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-7 h-7 rounded-full"
                    />
                  )}
                  <button
                    onClick={signOut}
                    className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full font-semibold text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={signIn}
                  className="px-4 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold transition-all duration-200 text-sm"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

          {/* Mobile/Tablet Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Navigation Links */}
                <div className="space-y-2 sm:space-y-3">
                  {navItems.map(({ item, path }) => (
                    <a
                      key={item}
                      href={path}
                      className="block w-full text-left text-gray-700 hover:text-teal-600 hover:bg-gray-50 py-2 sm:py-3 px-2 sm:px-3 transition-colors font-medium text-sm sm:text-base rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Auth Section */}
                <div className="space-y-3">
                  {session?.user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 px-2 sm:px-3">
                        {session.user.image && (
                          <img
                            src={session.user.image}
                            alt={session.user.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-900 font-medium text-sm sm:text-base truncate">
                            {session.user.name}
                          </div>
                          <div className="text-gray-600 text-xs sm:text-sm truncate">
                            {session.user.email}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-semibold text-sm sm:text-base"
                      >
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        signIn();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg transition-all duration-200"
                    >
                      Get Started
                    </button>
                  )}
                </div>

                {/* Quick Actions - Mobile Only */}
                <div className="md:hidden space-y-2 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500 px-2">Quick Actions</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                      Emergency
                    </button>
                    <button className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 sm:h-20"></div>
    </div>
  );
};

export default Navbar;