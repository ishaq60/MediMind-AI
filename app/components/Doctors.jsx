"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  Clock,
  Video,
  Phone,
  User,
  MapPin,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [sliceDoc, setslicdoc] = useState(2);

  const categories = [
    {
      id: "cardiology",
      name: "Heart",
      icon: Heart,
      color: "from-red-500 to-pink-500",
    },
    {
      id: "neurology",
      name: "Brain",
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "orthopedics",
      name: "Bones",
      icon: Bone,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "ophthalmology",
      name: "Eyes",
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "pediatrics",
      name: "Children",
      icon: Baby,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "psychiatry",
      name: "Mental Health",
      icon: UserCheck,
      color: "from-teal-500 to-blue-500",
    },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:3000/services/api/get-all");
        const data = await res.json();
        console.log("✅ Doctors fetched:", data);
        setDoctors(data.res || data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleBooking = (doctor) => {
    console.log("Book appointment for:", doctor.name);
    // Implement your booking logic here
  };

  return (
    <section id="doctor" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Find Specialists by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Condition
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with top-rated specialists based on your diagnosis and
            symptoms
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {categories.map((category, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div
                className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
              >
                <category.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-center font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Doctors */}
        <div className="grid lg:grid-cols-2 gap-6">
          {doctors?.slice(0, sliceDoc).map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden">
                    <Image
                      src={doctor.image.trim()}
                      alt={`Image of ${doctor.name}`}
                      width={80}
                      height={80}
                      className="object-cover rounded-2xl w-full h-full"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        {doctor.specialty}
                      </p>
                      <p className="text-gray-600 text-sm">{doctor.hospital}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {doctor.price}
                      </div>
                      <div className="text-sm text-gray-500">consultation</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
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

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Specializes in:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.conditions.slice(0, 3).map((condition, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                        >
                          {condition}
                        </span>
                      ))}
                      {doctor.conditions.length > 3 && (
                        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                          +{doctor.conditions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900 font-medium">
                        Next: {doctor.nextSlot}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      {doctor.consultationTypes.includes("Video Call") && (
                        <Video
                          className="w-5 h-5 text-blue-600"
                          title="Video consultation available"
                        />
                      )}
                      {doctor.consultationTypes.includes("Phone Call") && (
                        <Phone
                          className="w-5 h-5 text-green-600"
                          title="Phone consultation available"
                        />
                      )}
                      {doctor.consultationTypes.includes("In-person") && (
                        <User
                          className="w-5 h-5 text-purple-600"
                          title="In-person consultation available"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:space-x-3 mt-6 gap-3">
                    {/* <button
                      onClick={() => handleBooking(doctor)}
                      className="flex-1 px-6 py-3  bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Book Appointment
                    </button> */}
                    <Link
                      href={`/doctor/${doctor._id}`}
                      className="flex-1 text-center px-6 py-3 border-2 border-purple-600 text-text- rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-8">
        <Link href={"/doctor"} className="w-full">
        
          <button
           
            className="flex-1 px-8 py-3 bg-gradient-to-r w-full from-blue-500 to-purple-600   text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            See All
          </button>
        
        </Link>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
