"use client"
import React from 'react';
import { 
  Menu, X, ArrowRight, Star, Shield, Clock, Users, Brain, Play,
  Stethoscope, FileText, Calendar, ChevronDown, Heart, Activity, 
  Zap, Award, CheckCircle, Phone, Mail, Eye, Bone, Baby, UserCheck,
  Search, MapPin, User, Video, Upload, BarChart3, Globe, Smartphone
} from "lucide-react"
const Doctors = () => {
    const categories = [
    { id: 'cardiology', name: 'Heart', icon: Heart, color: 'from-red-500 to-pink-500' },
    { id: 'neurology', name: 'Brain', icon: Brain, color: 'from-purple-500 to-indigo-500' },
    { id: 'orthopedics', name: 'Bones', icon: Bone, color: 'from-amber-500 to-orange-500' },
    { id: 'ophthalmology', name: 'Eyes', icon: Eye, color: 'from-blue-500 to-cyan-500' },
    { id: 'pediatrics', name: 'Children', icon: Baby, color: 'from-green-500 to-emerald-500' },
    { id: 'psychiatry', name: 'Mental Health', icon: UserCheck, color: 'from-teal-500 to-blue-500' }
  ];
    return (
        <div>
             {/* Doctor Categories Section */}
      <section id="doctor" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Find Specialists by
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Condition</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with top-rated specialists based on your diagnosis and symptoms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {categories.map((category, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <category.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-center font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Featured Doctors Preview */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-100">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Dr. Sarah Johnson", specialty: "Cardiologist", rating: 4.9, location: "New York", available: "Today 2:30 PM" },
                { name: "Dr. Michael Chen", specialty: "Neurologist", rating: 4.8, location: "Baltimore", available: "Tomorrow 10:00 AM" },
                { name: "Dr. Emily Rodriguez", specialty: "Orthopedic", rating: 4.9, location: "Cleveland", available: "Friday 9:15 AM" }
              ].map((doctor, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                      <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-semibold">{doctor.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{doctor.location}</span>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium mb-4">
                    Next available: {doctor.available}
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200">
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200">
                View All Doctors
              </button>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Doctors;