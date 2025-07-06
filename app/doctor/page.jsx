"use client"
import React, { useState } from 'react';
import { 
  Filter, MapPin, Clock, Star, 
  User, Phone, Video 
} from 'lucide-react';
import Link from 'next/link';
import useDoctors from '@/hooks/useDoctors';
import DoctorHeader from '../components/doctorDetails/doctorHeader';
import DoctorCard from '../components/doctorDetails/DoctorCard';

const DoctorAppointmentSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [doctors, refetch, isLoading] = useDoctors();
  console.log(doctors)

  // Filter doctors by category and search term
  const filteredDoctors = doctors.filter(doctor => {
    const matchesCategory = selectedCategory === 'all' || doctor.category === selectedCategory;
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.conditions.some(condition => 
        condition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handleBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    alert(`Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`);
    setShowBookingModal(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DoctorHeader 
          searchTerm={searchTerm} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          setSearchTerm={setSearchTerm} 
        
        />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {filteredDoctors.length} Doctors Available
          </h3>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Doctor Cards */}
       <DoctorCard
         filteredDoctors={filteredDoctors}
       ></DoctorCard>

        {/* Booking Modal */}
        {showBookingModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Appointment</h2>
                <p className="text-gray-600">with {selectedDoctor.name}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Select Date</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Today', 'Tomorrow', 'Friday'].map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          selectedDate === date
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Select Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Consultation Type</label>
                  <div className="space-y-3">
                    {['Video Call', 'Phone Call', 'In-person'].map((type) => (
                      <label
                        key={type}
                        className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="consultationType"
                          className="mr-3"
                          checked={selectedDoctor.consultationTypes.includes(type) && selectedType === type}
                          onChange={() => setSelectedType(type)}
                          disabled={!selectedDoctor.consultationTypes.includes(type)}
                        />
                        <span className="text-gray-900">{type}</span>
                        {type === 'Video Call' && <Video className="w-4 h-4 ml-auto text-blue-600" />}
                        {type === 'Phone Call' && <Phone className="w-4 h-4 ml-auto text-green-600" />}
                        {type === 'In-person' && <User className="w-4 h-4 ml-auto text-purple-600" />}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 justify-end">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBooking}
                    disabled={!selectedDate || !selectedTime || !selectedType}
                    className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
                      selectedDate && selectedTime && selectedType
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-300 cursor-not-allowed'
                    }`}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center mt-10">
            <p className="text-gray-500 text-lg">Loading doctors...</p>
          </div>
        )}

        {filteredDoctors.length === 0 && !isLoading && (
          <p className="text-center text-gray-500 mt-10">No doctors found for your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentSection;
