"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { Calendar, Clock, DollarSign, Video, Phone, User, X, Loader2, Star, MapPin, Building2 } from 'lucide-react';
import Loading from '@/app/components/Loading';

const UserAppoitment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      toast.error("Please login");
      router.push("/login");
      return;
    }

    const email = session?.user?.email;
    if (!email) return;

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/uappointmet/${email}`);
        const data = await res.json();
        console.log("API data:", data);
        
        // Handle both single appointment and array of appointments
        if (Array.isArray(data)) {
          setAppointments(data);
        } else if (data && typeof data === 'object') {
          setAppointments([data]);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch appointments");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [session, status, router]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setAppointments(appointments.filter(apt => apt._id !== appointmentId));
        toast.success("Appointment cancelled successfully");
      } else {
        toast.error("Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const getModeIcon = (bookingtype) => {
    switch(bookingtype?.toLowerCase()) {
      case 'video call':
      case 'videocall':
        return <Video className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'phone call':
      case 'audio call':
      case 'audiocall':
        return <Phone className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'in-person':
      case 'inperson':
      case 'offline':
        return <User className="h-3 w-3 sm:h-4 sm:w-4" />;
      default:
        return <User className="h-3 w-3 sm:h-4 sm:w-4" />;
    }
  };

  const getModeColor = (bookingtype) => {
    switch(bookingtype?.toLowerCase()) {
      case 'video call':
      case 'videocall':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'phone call':
      case 'audio call':
      case 'audiocall':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-person':
      case 'inperson':
      case 'offline':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getModeText = (bookingtype) => {
    switch(bookingtype?.toLowerCase()) {
      case 'video call':
      case 'videocall':
        return 'Video Call';
      case 'phone call':
      case 'audio call':
      case 'audiocall':
        return 'Phone Call';
      case 'in-person':
      case 'inperson':
      case 'offline':
        return 'In Person';
      default:
        return bookingtype || 'In Person';
    }
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return 'Time not specified';
    
    if (date.toLowerCase() === 'today') {
      return `Today at ${time}`;
    }
    
    return `${date} at ${time}`;
  };

  const getInitials = (name) => {
    if (!name) return 'D';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0].charAt(0) + parts[1].charAt(0);
    }
    return name.charAt(0);
  };

  if (status === "loading" || loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
          <span className="ml-2 text-gray-600"><Loading></Loading></span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">My Appointments</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your upcoming medical appointments</p>
      </div>

      {/* Empty State */}
      {appointments.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
          <p className="text-sm sm:text-base text-gray-500">You don't have any upcoming appointments at the moment.</p>
        </div>
      ) : (
        /* Appointments List */
        <div className="space-y-3 sm:space-y-4">
          {appointments.map((appointment, index) => {
            const doctor = appointment?.Dname || {};
            return (
              <div key={appointment._id || index} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                {/* Mobile Layout */}
                <div className="block sm:hidden p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center flex-1">
                      <div className="relative w-10 h-10 mr-3 flex-shrink-0">
                        {doctor.image ? (
                          <img 
                            src={doctor.image} 
                            alt={doctor.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                            <span className="text-sm font-semibold">
                              {getInitials(doctor.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {doctor.name || 'Doctor Name'}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {doctor.specialty || doctor.category || 'General Medicine'}
                        </p>
                        {doctor.hospital && (
                          <p className="text-xs text-gray-500 truncate flex items-center mt-1">
                            <Building2 className="h-3 w-3 mr-1" />
                            {doctor.hospital}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => cancelAppointment(appointment._id)}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Cancel appointment"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Mobile Info Grid */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                      <span className="text-sm">{formatDateTime(appointment.date, appointment.appointmentTime)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700">
                      
                        <span className="text-sm font-medium">
                          {doctor.price || 'Tk. 0'}
                        </span>
                      </div>
                      
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getModeColor(appointment.bookingtype)}`}>
                        {getModeIcon(appointment.bookingtype)}
                        <span className="ml-1">{getModeText(appointment.bookingtype)}</span>
                      </span>
                    </div>

                    {doctor.rating && (
                      <div className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                        <span className="text-sm">{doctor.rating}</span>
                        {doctor.reviews && (
                          <span className="text-xs text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-100">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      Reschedule
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center mt-2">
                    Appointment ID: {appointment._id?.slice(-6)}
                  </div>
                </div>

                {/* Tablet & Desktop Layout */}
                <div className="hidden sm:block p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3 md:mb-4">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 mr-3 md:mr-4 flex-shrink-0">
                          {doctor.image ? (
                            <img 
                              src={doctor.image} 
                              alt={doctor.name} 
                              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                              <span className="text-sm md:text-lg font-semibold">
                                {getInitials(doctor.name)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
                            {doctor.name || 'Doctor Name'}
                          </h3>
                          <p className="text-sm md:text-base text-gray-600 truncate">
                            {doctor.specialty || doctor.category || 'General Medicine'}
                          </p>
                          {doctor.hospital && (
                            <p className="text-xs md:text-sm text-gray-500 truncate flex items-center mt-1">
                              <Building2 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                              {doctor.hospital}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Desktop Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="text-sm truncate">{formatDateTime(appointment.date, appointment.appointmentTime)}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <DollarSign className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="text-sm font-medium">{doctor.price || 'Tk. 0'}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getModeColor(appointment.bookingtype)}`}>
                            {getModeIcon(appointment.bookingtype)}
                            <span className="ml-1">{getModeText(appointment.bookingtype)}</span>
                          </span>
                        </div>

                        {doctor.rating && (
                          <div className="flex items-center text-gray-600">
                            <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                            <span className="text-sm">{doctor.rating}</span>
                            {doctor.reviews && (
                              <span className="text-xs text-gray-500 ml-1">({doctor.reviews})</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => cancelAppointment(appointment._id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Cancel appointment"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Desktop Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-100 gap-3">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                      <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Reschedule
                      </button>
                    </div>
                    
                    <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                      ID: {appointment._id?.slice(-6)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserAppoitment;