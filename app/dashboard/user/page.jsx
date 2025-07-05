
'use client';

import React, { useState } from 'react';
import {
  Activity, Calendar, FileText, Brain, Star, AlertCircle, Menu, X, Heart, Search, Bell,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import UserAppoitment from './UserAppoitment';


import AskAI from './AskAI';
import SymptomChecker from '../Components/SymptomChecker/SymptomChecker';
import MedicalChatAssistant from '../Components/chatAssistance/chatBox';

export default function UserDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItemsUser = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'diagnosis', label: 'Diagnosis', icon: Brain },
    { id: 'reports', label: 'My Reports', icon: FileText },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'help', label: 'Help Center', icon: AlertCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <h1 className="text-2xl font-bold">Welcome, {session?.user?.name || 'User'}!</h1>;
      case 'appointments':
        return <UserAppoitment></UserAppoitment>
      case 'diagnosis':
        return <SymptomChecker></SymptomChecker>
      case 'reports':
        return <div className="text-lg">📄<MedicalChatAssistant></MedicalChatAssistant></div>;
      case 'favorites':
        return <div className="text-lg">⭐ Your Favorite Doctors</div>;
      case 'help':
        return <div className="text-lg">❓ Help Center and Support</div>;
      default:
        return <div className="text-gray-500 mt-10 text-center">Coming Soon</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MediAI
            </span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItemsUser.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-30 w-full">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-gray-700 border-none outline-none w-48 lg:w-64"
                />
              </div>

              {/* Notification */}
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {session?.user?.name?.[0] || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  {/* <p className="text-sm font-medium text-gray-900">{session?.user?.name || 'User'}</p> */}
                  <p className="text-xs text-gray-500 capitalize">user</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
