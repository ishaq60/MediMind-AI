"use client";

import { Button } from '@/components/ui/button';
import { Clock, MapPin, Phone, Star, User, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DoctorCard = ({ filteredDoctors = [], handleBooking }) => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              
              {/* Doctor Photo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={(doctor.image || '/default-doctor.png').trim()}
                    alt={`Image of ${doctor.name}`}
                    width={80}
                    height={80}
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-teal-600 font-semibold">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm">{doctor.hospital}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {doctor.price}
                    </div>
                    <div className="text-sm text-gray-500">consultation</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold text-gray-900">
                      {doctor.rating}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                </div>

                {/* Specializes in */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Specializes in:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(doctor.conditions || []).slice(0, 3).map((condition, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-teal-100 text-blue-700 text-xs rounded-full border border-blue-200"
                      >
                        {condition}
                      </span>
                    ))}
                    {(doctor.conditions || []).length > 3 && (
                      <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                        +{doctor.conditions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Availability & Booking */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-900 font-medium">
                      Next: {doctor.nextSlot}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    {(doctor.consultationTypes || []).includes('Video Call') && (
                      <Video
                        className="w-5 h-5 text-teal-600"
                        title="Video consultation available"
                      />
                    )}
                    {(doctor.consultationTypes || []).includes('Phone Call') && (
                      <Phone
                        className="w-5 h-5 text-green-600"
                        title="Phone consultation available"
                      />
                    )}
                    {(doctor.consultationTypes || []).includes('In-person') && (
                      <User
                        className="w-5 h-5 text-purple-600"
                        title="In-person consultation available"
                      />
                    )}
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button
                    onClick={() => handleBooking(doctor)}
                    className="flex-1 px-6 py-3 bg-teal-500 hover:bg-teal-600  text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Book Appointment
                  </Button>
                  <Link
                    href={`/doctors/${doctor._id}`}
                    className="px-6 py-1 border-2 border-teal-600 text-teal-600 rounded-xl font-semibold hover:bg-teal-100 transition-all duration-200"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorCard;
