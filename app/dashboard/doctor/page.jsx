"use client";
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Phone, 
  Video, 
  MapPin, 
  Clock, 
  Mail,
  Award,
  TrendingUp,
  Heart,
  Activity,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  MessageCircle,
  FileText,
  DollarSign,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

const DoctorOverviewDashboard = () => {
  const { data: session, status } = useSession();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data for demonstration
  const dashboardData = {
    todayStats: {
      totalAppointments: 12,
      completed: 8,
      pending: 3,
      cancelled: 1,
      revenue: 2400
    },
    upcomingAppointments: [
      {
        id: 1,
        patient: "Sarah Johnson",
        time: "10:00 AM",
        type: "Video Call",
        status: "confirmed",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
      },
      {
        id: 2,
        patient: "Michael Chen",
        time: "11:30 AM",
        type: "Phone Call",
        status: "pending",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      },
      {
        id: 3,
        patient: "Emily Davis",
        time: "2:00 PM",
        type: "In-Person",
        status: "confirmed",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      }
    ],
    recentActivity: [
      { action: "Completed appointment with John Doe", time: "30 minutes ago", type: "appointment" },
      { action: "New patient registration", time: "1 hour ago", type: "patient" },
      { action: "Updated treatment plan", time: "2 hours ago", type: "treatment" },
      { action: "Received lab results", time: "3 hours ago", type: "lab" }
    ],
    weeklyStats: {
      appointments: [20, 25, 30, 28, 35, 32, 38],
      revenue: [1200, 1500, 1800, 1600, 2100, 1900, 2400]
    },
    patientSatisfaction: {
      rating: 4.8,
      reviews: 156,
      recentReviews: [
        { patient: "Anonymous", rating: 5, comment: "Excellent care and very professional!" },
        { patient: "Anonymous", rating: 4, comment: "Great doctor, very knowledgeable." },
        { patient: "Anonymous", rating: 5, comment: "Best healthcare experience I've had." }
      ]
    }
  };

  const getAppointmentTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'phone call':
        return <Phone className="h-4 w-4 text-blue-500" />;
      case 'video call':
        return <Video className="h-4 w-4 text-green-500" />;
      case 'in-person':
        return <MapPin className="h-4 w-4 text-purple-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const configs = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-800' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    const config = configs[status] || configs.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status}
      </span>
    );
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color = "blue", trend = null }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{trend}</span>
            </div>
          )}
        </div>
        <Icon className={`h-8 w-8 text-${color}-500`} />
      </div>
    </div>
  );

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome back, Dr. {session?.user?.name || "Doctor"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Profile Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg mb-8">
          <div className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center">
                  {session?.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name} 
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Dr. {session?.user?.name || "Doctor"}</h2>
                  <p className="text-blue-100">General Practitioner</p>
                  {session?.user?.email && (
                    <p className="text-blue-100 text-sm flex items-center mt-1">
                      <Mail className="h-4 w-4 mr-1" />
                      {session.user.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-xl font-bold">{dashboardData.patientSatisfaction.rating}</span>
                </div>
                <p className="text-blue-100 text-sm">{dashboardData.patientSatisfaction.reviews} reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Today's Appointments"
            value={dashboardData.todayStats.totalAppointments}
            icon={Calendar}
            color="blue"
            trend="+12% from yesterday"
          />
          <StatCard
            title="Completed"
            value={dashboardData.todayStats.completed}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Pending"
            value={dashboardData.todayStats.pending}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            title="Cancelled"
            value={dashboardData.todayStats.cancelled}
            icon={XCircle}
            color="red"
          />
          <StatCard
            title="Today's Revenue"
            value={`$${dashboardData.todayStats.revenue}`}
            icon={DollarSign}
            color="green"
            trend="+8% from yesterday"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Appointments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Appointments
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={appointment.image}
                          alt={appointment.patient}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{appointment.patient}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getAppointmentTypeIcon(appointment.type)}
                        <span className="text-sm text-gray-600">{appointment.type}</span>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    View All Appointments
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {activity.type === 'appointment' && <Calendar className="h-5 w-5 text-blue-500" />}
                        {activity.type === 'patient' && <User className="h-5 w-5 text-green-500" />}
                        {activity.type === 'treatment' && <FileText className="h-5 w-5 text-purple-500" />}
                        {activity.type === 'lab' && <Activity className="h-5 w-5 text-orange-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats & Reviews */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    Add New Patient
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <FileText className="h-4 w-4 mr-2" />
                    View Reports
                  </button>
                </div>
              </div>
            </div>

            {/* Patient Satisfaction */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Patient Satisfaction
                </h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-yellow-600">{dashboardData.patientSatisfaction.rating}</div>
                  <div className="flex justify-center space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-5 w-5 ${star <= Math.floor(dashboardData.patientSatisfaction.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Based on {dashboardData.patientSatisfaction.reviews} reviews</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Recent Reviews</h4>
                  {dashboardData.patientSatisfaction.recentReviews.slice(0, 2).map((review, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">"{review.comment}"</p>
                      <p className="text-xs text-gray-500 mt-1">- {review.patient}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* This Week Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  This Week Summary
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Appointments</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {dashboardData.weeklyStats.appointments.reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Revenue</span>
                    <span className="text-lg font-semibold text-green-600">
                      ${dashboardData.weeklyStats.revenue.reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. per Day</span>
                    <span className="text-lg font-semibold text-blue-600">
                      {Math.round(dashboardData.weeklyStats.appointments.reduce((a, b) => a + b, 0) / 7)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOverviewDashboard;