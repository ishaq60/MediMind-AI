"use client";

import React, { useEffect, useState } from 'react';
import { 
  Search, Heart, Brain, Eye, Bone, Baby, 
  UserCheck, Shield, Stethoscope 
} from 'lucide-react'; // ✅ Make sure Stethoscope is imported

const DoctorHeader = ({ searchTerm, selectedCategory, setSelectedCategory,setSearchTerm }) => {
  const categories = [
    { id: 'all', name: 'All Specialists', icon: Heart, count: 156 },
    { id: 'cardiology', name: 'Heart Conditions', icon: Heart, count: 23 },
    { id: 'neurology', name: 'Brain & Nervous System', icon: Brain, count: 18 },
    { id: 'orthopedics', name: 'Bone & Joint Issues', icon: Bone, count: 31 },
    { id: 'ophthalmology', name: 'Eye Problems', icon: Eye, count: 15 },
    { id: 'pediatrics', name: 'Child Health', icon: Baby, count: 27 },
    { id: 'psychiatry', name: 'Mental Health', icon: UserCheck, count: 19 },
    { id: 'dermatology', name: 'Skin Conditions', icon: Shield, count: 22 }
  ];

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchTerm(debouncedSearch);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [debouncedSearch]);

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
          Find Your
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {' '}Perfect Doctor
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Search by condition, specialty, or doctor name. Book appointments instantly with top-rated healthcare professionals.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative focus-within:ring-2 focus-within:ring-blue-300 rounded-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by condition, symptom, or doctor name..."
            value={debouncedSearch}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-lg"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Specialty</h2>
        <div className="md:grid md:grid-cols-4 lg:grid-cols-8 gap-4 overflow-x-auto flex md:flex-none space-x-4 md:space-x-0 px-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
                className={`p-4 rounded-2xl border-2 min-w-[150px] transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-100'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-6 h-6 mx-auto mb-2 ${
                      selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  />
                )}
                <div className="text-sm font-medium text-gray-900 mb-1">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count} doctors</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;
