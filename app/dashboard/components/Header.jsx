"use client";
import React from "react";
import { Menu, Bell, Search } from "lucide-react";

export default function Header({ setIsSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 w-full">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-700 outline-none w-48"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              DR
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Dr. Sarah</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
