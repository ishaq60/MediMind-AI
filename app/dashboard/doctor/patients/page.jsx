"use client"
import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Phone, 
  Video, 
  MapPin, 
  Clock, 
  Mail,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const DoctorPatientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookingTypeFilter, setBookingTypeFilter] = useState('all');

  // Mock data based on your structure - multiple patients
  const patientsData = [
    {
      _id: "6875f715f4930ec88ccd4ff3",
      user: {
        name: "Ishaq Shamim",
        email: "ishaqshamim243@gmail.com",
        image: "https://lh3.googleusercontent.com/a/ACg8ocIxVz9iWm-IPMMxetycSPMLtEO-hq…",
        type: "user"
      },
      appointmentTime: "9:00 AM",
      bookingtype: "Phone Call",
      date: "Today",
      status: "confirmed",
      expires: "2025-08-14T06:36:55.951Z"
    },
    {
      _id: "6875f715f4930ec88ccd4ff4",
      user: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        type: "user"
      },
      appointmentTime: "10:30 AM",
      bookingtype: "Video Call",
      date: "Today",
      status: "pending",
      expires: "2025-08-14T06:36:55.951Z"
    },
    {
      _id: "6875f715f4930ec88ccd4ff5",
      user: {
        name: "Michael Chen",
        email: "michael.chen@email.com",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        type: "user"
      },
      appointmentTime: "2:00 PM",
      bookingtype: "In-Person",
      date: "Today",
      status: "confirmed",
      expires: "2025-08-14T06:36:55.951Z"
    },
    {
      _id: "6875f715f4930ec88ccd4ff6",
      user: {
        name: "Emily Davis",
        email: "emily.davis@email.com",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        type: "user"
      },
      appointmentTime: "3:30 PM",
      bookingtype: "Phone Call",
      date: "Tomorrow",
      status: "confirmed",
      expires: "2025-08-14T06:36:55.951Z"
    },
    {
      _id: "6875f715f4930ec88ccd4ff7",
      user: {
        name: "Robert Wilson",
        email: "robert.wilson@email.com",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        type: "user"
      },
      appointmentTime: "11:00 AM",
      bookingtype: "Video Call",
      date: "Tomorrow",
      status: "cancelled",
      expires: "2025-08-14T06:36:55.951Z"
    },
    {
      _id: "6875f715f4930ec88ccd4ff8",
      user: {
        name: "Lisa Anderson",
        email: "lisa.anderson@email.com",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
        type: "user"
      },
      appointmentTime: "4:00 PM",
      bookingtype: "In-Person",
      date: "Tomorrow",
      status: "pending",
      expires: "2025-08-14T06:36:55.951Z"
    }
  ];

  const getBookingTypeIcon = (type) => {
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
    const statusConfig = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle }
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="h-3 w-3 mr-1" />
        {status || 'Pending'}
      </span>
    );
  };

  // Filter patients based on search and filters
  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = patient.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesBookingType = bookingTypeFilter === 'all' || patient.bookingtype.toLowerCase() === bookingTypeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesBookingType;
  });

  // Statistics
  const totalPatients = patientsData.length;
  const confirmedCount = patientsData.filter(p => p.status === 'confirmed').length;
  const pendingCount = patientsData.filter(p => p.status === 'pending').length;
  const cancelledCount = patientsData.filter(p => p.status === 'cancelled').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">My Patient Bookings</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{totalPatients}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              {/* Status Filter */}
              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              {/* Booking Type Filter */}
              <div className="sm:w-48">
                <select
                  value={bookingTypeFilter}
                  onChange={(e) => setBookingTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="phone call">Phone Call</option>
                  <option value="video call">Video Call</option>
                  <option value="in-person">In-Person</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Patient Bookings ({filteredPatients.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Appointment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={patient.user.image}
                            alt={patient.user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {patient._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.user.email}</div>
                      <div className="text-sm text-gray-500">{patient.user.type}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.date}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {patient.appointmentTime}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getBookingTypeIcon(patient.bookingtype)}
                        <span className="ml-2 text-sm text-gray-900">
                          {patient.bookingtype}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(patient.status)}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDashboard;