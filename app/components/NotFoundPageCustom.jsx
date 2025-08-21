"use client";
import React from 'react';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  FileQuestion,
  MapPin,
  Compass,
  RefreshCw
} from 'lucide-react';

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    // In a real app, you'd use your router's navigation
    window.location.href = '/';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const popularPages = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Products', path: '/products', icon: Search },
    { name: 'About Us', path: '/about', icon: FileQuestion },
    { name: 'Contact', path: '/contact', icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-8xl sm:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center animate-pulse">
              <FileQuestion className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
          
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* Popular Pages */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Try these popular pages instead
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {popularPages.map((page, index) => (
              <button
                key={index}
                onClick={() => window.location.href = page.path}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-teal-600 transition-all group"
              >
                <page.icon className="w-6 h-6 text-gray-600 group-hover:text-teal-600" />
                <span className="text-sm font-medium">{page.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Still can't find what you're looking for? 
            <button className="ml-1 text-teal-600 hover:text-teal-700 font-medium">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}