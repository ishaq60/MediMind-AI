"use client"
import React, { useState } from 'react';
import { 
  Brain, 
  Calendar, 
  FileText, 
  Upload,
  Clock,
  User,
  Bell,
  Search,
  Plus,
  ChevronRight,
  Heart,
  Stethoscope,
  Activity,
  Star,
  Shield,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const UserHomePage = () => {
  const [userRole] = useState('patient'); // This would come from auth context
  const [userName] = useState('Sarah Johnson');

  // Sample user data
  const userData = {
    recentDiagnoses: 3,
    upcomingAppointments: 2,
    pendingReports: 1,
    healthScore: 85
  };

  const recentActivity = [
    { id: 1, type: 'diagnosis', title: 'Headache Analysis', result: 'Tension headache (92% confidence)', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'appointment', title: 'Dr. Michael Chen', specialty: 'Cardiology', time: 'Tomorrow 2:30 PM', status: 'upcoming' },
    { id: 3, type: 'report', title: 'Blood Test Results', time: '3 days ago', status: 'reviewed' }
  ];

const quickActions = [
  {
    icon: Brain,
    title: 'New Diagnosis',
    desc: 'Check symptoms with AI',
    color: 'purple',
    action: 'diagnosis',
    href: '/dashboard/disease-detector'
  },
  {
    icon: Upload,
    title: 'Upload Report',
    desc: 'X-ray, blood test, etc.',
    color: 'blue',
    action: 'upload',
    href: '/upload-report'
  },
  {
    icon: Calendar,
    title: 'Book Appointment',
    desc: 'Find available doctors',
    color: 'green',
    action: 'appointment',
    href: '/doctor'
  },
  {
    icon: FileText,
    title: 'View Records',
    desc: 'Past diagnoses & reports',
    color: 'orange',
    action: 'records',
    href: '/records'
  }
];

  const healthInsights = [
    { icon: Heart, title: 'Heart Rate', value: '72 BPM', status: 'Normal', color: 'green' },
    { icon: Activity, title: 'Health Score', value: '85/100', status: 'Good', color: 'blue' },
    { icon: Shield, title: 'Risk Level', value: 'Low', status: 'Stable', color: 'green' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
  
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
         <div className='flex  justify-between'>
           <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, ! 👋
          </h1>
          <div>
            <Link href={"user/disease-detector"}>
             <button className='text-2xl bg-gradient-to-r p-3 rounded-xl from-blue-500 to-purple-600 text-white '> Diagnosis</button>
            </Link>
           
          </div>
         </div>
          <p className="text-gray-600">
            How are you feeling today? Let's keep track of your health journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Diagnoses</p>
                <p className="text-2xl font-bold text-gray-900">{userData.recentDiagnoses}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{userData.upcomingAppointments}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                <p className="text-2xl font-bold text-gray-900">{userData.pendingReports}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Health Score</p>
                <p className="text-2xl font-bold text-gray-900">{userData.healthScore}/100</p>
              </div>
              <Heart className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
             {quickActions.map((action) => (
  <Link href={action.href} key={action.title}>
    <div className={`p-4 rounded-lg bg-${action.color}-100`}>
      <action.icon className="w-6 h-6" />
      <h3>{action.title}</h3>
      <p>{action.desc}</p>
    </div>
  </Link>
))}
            </div>

            {/* Recent Activity */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className={`p-6 ${index !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'diagnosis' ? 'bg-purple-100' :
                        activity.type === 'appointment' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {activity.type === 'diagnosis' && <Brain className="w-5 h-5 text-purple-600" />}
                        {activity.type === 'appointment' && <Calendar className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'report' && <FileText className="w-5 h-5 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        {activity.result && <p className="text-sm text-gray-600 mt-1">{activity.result}</p>}
                        {activity.specialty && <p className="text-sm text-gray-600 mt-1">{activity.specialty}</p>}
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Insights Sidebar */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Insights</h2>
            
            {/* AI Health Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">AI Health Summary</h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Based on your recent diagnoses and reports, your health indicators are looking good. Consider scheduling a routine checkup.
              </p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                View Full Analysis →
              </button>
            </div>

            {/* Health Metrics */}
            <div className="space-y-4">
              {healthInsights.map((insight, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <insight.icon className={`w-5 h-5 text-${insight.color}-600`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                        <p className="text-xs text-gray-600">{insight.status}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">{insight.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Today's Health Tip
              </h3>
              <p className="text-sm text-gray-600">
                Stay hydrated! Drinking 8 glasses of water daily can help improve your energy levels and support better health outcomes.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHomePage;