'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react'; // ✅ Added signOut, signIn
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { item: 'Home', path: '#home' },
    { item: 'Features', path: '#features' },
    { item: 'How It Works', path: '#how-it-works' },
    { item: 'Doctor', path: '#doctor' },
    { item: 'Testimonials', path: '#testimonials' },
    { item: 'Pricing', path: '#pricing' },
    { item: 'Contact', path: '#contact' },
    {
      item:"Dashboard",path:"/dashboard"
    }
  ];

  return (
    <div>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? 'bg-black/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">MedAI</span>
                <div className="text-xs text-white -mt-1">Diagnosis Assistant</div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(({ item, path }) => (
                <Link
                  key={item}
                  href={path}
                  className="text-white hover:text-blue-300 transition-colors duration-200 font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                
              ))}
               
              {status === 'authenticated' && session?.user ? (
                <div className="flex items-center space-x-3">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-white text-sm">{session.user.name}</span>
                  <Button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full font-semibold hover:shadow-md"
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => signIn()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </Button>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-gray-700 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                {navItems.map(({ item, path }) => (
                  <Link
                    key={item}
                    href={path}
                    className="block w-full text-left text-white hover:text-blue-400 py-2 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}

                {status === 'authenticated' && session?.user ? (
                  <div className="flex items-center space-x-3">
                    {session.user.image && (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-white text-sm">{session.user.name}</span>
                    <Button
                      onClick={() => signOut()}
                      className="ml-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full font-semibold"
                    >
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      signIn();
                      setIsMenuOpen(false);
                    }}
                    className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold"
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
