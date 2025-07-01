import React, { useState } from 'react';
import { 
  Activity, 
  Users, 
  Calendar, 
  FileText, 
  Brain, 
  TrendingUp, 
  Bell, 
  Search, 
  Plus, 
  Upload, 
  Download,
  Star,
  Clock,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Settings,
  Menu,
  X,
  Stethoscope,
  Heart,
  Eye,
  Zap
} from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function MedicalDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const session=useSession()
  console.log(session.user.type)

  const sidebarItemsDoctor = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'diagnosis', label: 'AI Diagnosis', icon: Brain },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

 
 

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
         
          <h1></h1>
        );
      default:
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 text-sm sm:text-base">This section is under development and will be available soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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

        <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 sm:bottom-6 left-3 sm:left-4 right-3 sm:right-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-sm sm:text-base">AI Status</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">System running optimally</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 sm:h-2 rounded-full w-11/12"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 w-full">
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search patients, reports..."
                  className="bg-transparent text-sm text-gray-700 placeholder-gray-500 border-none outline-none w-48 lg:w-64"
                />
              </div>

              {/* Mobile Search Button */}
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">DR</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Dr. Sarah Wilson</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}