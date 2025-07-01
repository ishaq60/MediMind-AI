"use client";
import React from "react";
import { X, Eye, Heart } from "lucide-react";

export default function Sidebar({
  sidebarItems,
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen
}) {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:flex lg:flex-col`}
      >
        {/* Top Logo + Close */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MediAI
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Sidebar Items */}
        <nav className="p-3 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer: AI Status */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-sm">AI Status</span>
            </div>
            <p className="text-xs text-gray-600">System running optimally</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-11/12"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
