"use client";

import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, Phone, Video, User, Award } from 'lucide-react';
import Loading from '../Loading';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const DoctorDetailsClient = ({ doctorData }) => {
  const [bookingtoggle, setbookingtoogle] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const router = useRouter();
  const session = useSession();

  // ✅ Redirect if not logged in when booking toggle is active
  useEffect(() => {
    if (bookingtoggle && session.status === "unauthenticated") {
      toast.error("You must be logged in to book an appointment.");
      router.push("/login");
    }
  }, [bookingtoggle, session.status, router]);

  const confirmBooking = async () => {
    if (!doctorData) {
      toast.error("No doctor selected.");
      return;
    }
    if (!selectedDate || !selectedTime || !selectedType) {
      toast.error("Please fill in all booking details.");
      return;
    }
    if (session.status !== "authenticated") {
      toast.error("You must be logged in to book an appointment.");
      router.push("/login");
      return;
    }

    const bookingdata = {
      doctor: doctorData,
      appointmentTime: selectedTime,
      bookingtype: selectedType,
      date: selectedDate,
      user: session.data?.user || null,
    };

    console.log("Booking data:", bookingdata);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingdata),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          `Appointment booked with ${doctorData.name} on ${selectedDate} at ${selectedTime}`
        );

        setbookingtoogle(false);
        setSelectedDate("");
        setSelectedTime("");
        setSelectedType("");
      } else {
        toast.error("Booking failed: " + result.error);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong while booking.");
    }
  };

  if (!doctorData) {
    return (
      <div className="min-h-screen bg-gray-50 mt-24 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Doctor Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={doctorData.image}
                alt={doctorData.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover border-2 border-gray-100"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/160x160?text=Doctor';
                }}
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {doctorData.name}
                  </h1>
                  <p className="text-lg text-blue-600 font-medium mb-1">
                    {doctorData.specialty}
                  </p>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{doctorData.hospital}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{doctorData.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {doctorData.price}
                  </div>
                  <div className="text-sm text-gray-500">Consultation Fee</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium text-green-700">
                    {doctorData.rating}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">
                    ({doctorData.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                  <Award className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-sm font-medium text-blue-700">
                    {doctorData.experience} experience
                  </span>
                </div>
              </div>

              {doctorData.nextSlot && (
                <div className="flex items-center bg-orange-50 px-4 py-2 rounded-lg border border-orange-200">
                  <Clock className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="font-medium text-orange-800">
                    Next available: {doctorData.nextSlot}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About Dr. {doctorData.name?.split(' ')[1] || 'Doctor'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {doctorData.description}
              </p>
            </div>

            {doctorData.conditions && doctorData.conditions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Conditions Treated
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctorData.conditions.map((condition, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <button
                onClick={() => {
                  setSelectedDoctor(doctorData);
                  setbookingtoogle(true);
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Book Appointment
              </button>

              {bookingtoggle && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white border border-blue-600 rounded-3xl max-w-md w-full p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Appointment</h2>
                      <p className="text-gray-600">with {doctorData.name}</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Select Date</label>
                        <div className="grid grid-cols-3 gap-2">
                          {doctorData.availability?.length ? doctorData.availability.map((date) => (
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
                          )) : <div className="text-sm text-gray-500">No available slots</div>}
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
                          {doctorData.consultationTypes?.map((type) => (
                            <label
                              key={type}
                              className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="consultationType"
                                className="mr-3"
                                checked={selectedType === type}
                                onChange={() => setSelectedType(type)}
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
                          onClick={() => setbookingtoogle(false)}
                          className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmBooking}
                          disabled={!selectedDate || !selectedTime || !selectedType}
                          className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
                            selectedDate && selectedTime && selectedType
                              ? 'bg-blue-500 hover:bg-blue-400'
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsClient;
