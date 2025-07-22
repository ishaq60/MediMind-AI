"use client"
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Star,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import useUsersList from '@/hooks/Useuser';
import { useSession } from 'next-auth/react';
import useDoctorsList from '@/hooks/useDoctors';
import useDashboardSummary from '@/hooks/useDashboardsummary';

export default function AdminOverviewDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
   const { data: session, status } = useSession();
   const [doctors]=useDoctorsList()
   console.log(doctors)
   const {alluser}=useUsersList()
 
   const email = session?.user.email;
   console.log(email)
  // Sample data - in real app, this would come from your API
  const adminDetails = {
    name:  session?.user?.name,
    email: email,
    phone: '01703057181',
    location: 'Medical Center, Dhaka',
    role: 'Chief Administrator',
    joinDate: '2020-01-15',
    lastLogin: '2024-01-20 09:30 AM'
  };

  const {data}=useDashboardSummary()
  console.log(data)



  const dashboardStats = {
    totalUsers: data?.totalUsers,
    totalDoctors: data?.totalDoctors,
    totalAppointments: 1523,
    totalRevenue: 145250,
    activeUsers: 1892,
    pendingAppointments: 89,
    completedAppointments: 1234,
    cancelledAppointments: 200,
    todayAppointments: 67,
    avgRating: 4.6,
    totalReviews: data?.totalReviews
  };

  //***
 
  // const dashboardStats = {

  //coming to users
  //   totalUsers: alluser?.length,
  //doctor
  //   totalDoctors: doctors?.length,
  
   //   avgRating: 4.6,
  //   totalReviews: 892

  //coming to appointment
  //   totalAppointments: 1523,
  //   totalRevenue: 145250,-default
  //   activeUsers: 1892,-default
  //   pendingAppointments: 89,-defult
  //   completedAppointments: 1234,-defult
  //   cancelledAppointments: 200,-default
  //   todayAppointments: 67,-default
  
  // };
  // //  */

  const appointmentStatusData = [
    { name: 'Completed', value: 1234, color: '#10B981' },
    { name: 'Pending', value: 89, color: '#F59E0B' },
    { name: 'Cancelled', value: 200, color: '#EF4444' }
  ];

  const doctorSpecialtyData = [
    { name: 'Cardiology', value: 12, color: '#3B82F6' },
    { name: 'Neurology', value: 8, color: '#8B5CF6' },
    { name: 'Orthopedics', value: 10, color: '#06B6D4' },
    { name: 'Pediatrics', value: 7, color: '#F59E0B' },
    { name: 'Dermatology', value: 8, color: '#10B981' }
  ];

  const userTypeData = [
    { name: 'Patients', value: 2456, color: '#3B82F6' },
    { name: 'Doctors', value: 45, color: '#10B981' },
    { name: 'Staff', value: 156, color: '#F59E0B' },
    { name: 'Admin', value: 12, color: '#EF4444' }
  ];

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 45000, appointments: 120 },
    { month: 'Feb', revenue: 52000, appointments: 140 },
    { month: 'Mar', revenue: 48000, appointments: 135 },
    { month: 'Apr', revenue: 61000, appointments: 160 },
    { month: 'May', revenue: 55000, appointments: 145 },
    { month: 'Jun', revenue: 67000, appointments: 175 }
  ];

const recentAppointments = [
  { id: 1, patient: 'Rahim Uddin', doctor: 'Dr. Kamrul Hasan', time: '09:00 AM', status: 'completed', type: 'Consultation' },
  { id: 2, patient: 'Mitu Akter', doctor: 'Dr. Shirin Sultana', time: '10:30 AM', status: 'pending', type: 'Follow-up' },
  { id: 3, patient: 'Sumon Hossain', doctor: 'Dr. Anisur Rahman', time: '02:00 PM', status: 'cancelled', type: 'Check-up' },
  { id: 4, patient: 'Nusrat Jahan', doctor: 'Dr. Farhana Haque', time: '03:30 PM', status: 'completed', type: 'Emergency' }
];

const topDoctors = [
  { name: 'Dr. Kamrul Hasan', specialty: 'Cardiology', rating: 4.9, appointments: 156, revenue: 23400 },
  { name: 'Dr. Shirin Sultana', specialty: 'Neurology', rating: 4.8, appointments: 142, revenue: 21300 },
  { name: 'Dr. Anisur Rahman', specialty: 'Orthopedics', rating: 4.7, appointments: 138, revenue: 20700 },
  { name: 'Dr. Farhana Haque', specialty: 'Pediatrics', rating: 4.9, appointments: 134, revenue: 20100 }
];


  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon size={24} className={`text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const PieChartCard = ({ title, data, centerText }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, '']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
              <p className="text-gray-600 mt-1">Welcome back, {adminDetails.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Admin Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-sm font-medium text-gray-900">{adminDetails.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-sm font-medium text-gray-900">{adminDetails.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-sm font-medium text-gray-900">{adminDetails.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity size={16} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="text-sm font-medium text-gray-900">{adminDetails.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={dashboardStats.totalUsers}
            change={12}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Total Doctors"
            value={dashboardStats.totalDoctors}
            change={8}
            icon={UserCheck}
            color="green"
          />
          <StatCard
            title="Total Appointments"
            value={dashboardStats.totalAppointments.toLocaleString()}
            change={15}
            icon={Calendar}
            color="purple"
          />
          <StatCard
            title="Total Revenue"
            value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
            change={23}
            icon={DollarSign}
            color="yellow"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Users"
            value={dashboardStats.activeUsers.toLocaleString()}
            change={5}
            icon={Activity}
            color="green"
          />
          <StatCard
            title="Today's Appointments"
            value={dashboardStats.todayAppointments}
            change={-3}
            icon={Clock}
            color="blue"
          />
          <StatCard
            title="Average Rating"
            value={dashboardStats.avgRating}
            change={2}
            icon={Star}
            color="yellow"
          />
          <StatCard
            title="Total Reviews"
            value={dashboardStats.totalReviews}
            change={18}
            icon={MessageSquare}
            color="purple"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <PieChartCard
            title="Appointment Status"
            data={appointmentStatusData}
          />
          <PieChartCard
            title="Doctor Specialties"
            data={doctorSpecialtyData}
          />
          <PieChartCard
            title="User Types"
            data={userTypeData}
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue & Appointments</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
                <Bar yAxisId="right" dataKey="appointments" fill="#10B981" name="Appointments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      appointment.status === 'completed' ? 'bg-green-500' :
                      appointment.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-xs text-gray-600">{appointment.doctor} • {appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <p className={`text-xs capitalize ${
                      appointment.status === 'completed' ? 'text-green-600' :
                      appointment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {appointment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Doctors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Doctors</h3>
            <div className="space-y-4">
              {topDoctors.map((doctor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-xs text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">{doctor.appointments} appointments</p>
                    <p className="text-xs text-green-600">${doctor.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}