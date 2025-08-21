"use client";
import React, { useEffect, useState } from "react";
import {
  Edit3,
  Save,
  X,
  MapPin,
  Clock,
  Star,
  Calendar,
  Phone,
  Video,
  User,
  Heart,
  Award,
  DollarSign,
  MessageCircle,
  Camera,
  Settings,
  Bell,
  BarChart3,
  Users,
  TrendingUp,
} from "lucide-react";

import useDoctorfind from "@/hooks/useOneDoctor";
import { useSession } from "next-auth/react";

const DoctorDashboardProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { session } = useSession();
  const name = "Dr. Md. Rahman Khan";
  const { doctor } = useDoctorfind(name);

  const [profileData, setProfileData] = useState({
    name: "",
    specialty: "",
    category: "",
    experience: "",
    hospital: "",
    location: "",
    description: "",
    price: "",
    image: "",
    rating: "",
    reviews: "",
    nextSlot: "",
    conditions: [],
    consultationTypes: [],
    availability: [],
  });

  const [editData, setEditData] = useState({ ...profileData });

  // ✅ Update state when doctor data loads
  useEffect(() => {
    if (doctor) {
      setProfileData({
        name: doctor.name,
        specialty: doctor.specialty,
        category: doctor.category,
        experience: doctor.experience,
        hospital: doctor.hospital,
        location: doctor.location,
        description: doctor.description,
        price: doctor.price,
        image: doctor.image,
        rating: doctor.rating,
        reviews: doctor.reviews,
        nextSlot: doctor.nextSlot,
        conditions: doctor.conditions || [],
        consultationTypes: doctor.consultationTypes || [],
        availability: doctor.availability || [],
      });
    }
  }, [doctor]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Dashboard stats
  const stats = [
    {
      icon: Users,
      label: "Total Patients",
      value: "1,200",
      color: "text-teal-600",
      bg: "bg-blue-50",
    },
    {
      icon: Calendar,
      label: "Appointments Today",
      value: "12",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: "89",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: "4.9",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800"><span className="text-blue-400">{doctor?.name}</span> ----Profile</h1>
            <p className="text-gray-600 mt-1">
              Manage your professional information
            </p>
          </div>
          <div className="flex gap-3">
            <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={profileData.image}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-white">
                    {profileData.name}
                  </h1>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <Edit3 className="w-5 h-5 text-white" />
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Save className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-blue-100 text-lg mb-3">
                  {profileData.specialty}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-blue-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{profileData.rating}</span>
                    <span>({profileData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-5 h-5" />
                    <span>{profileData.experience}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-semibold text-gray-800">
                    {profileData.hospital}
                  </p>
                  <p className="text-sm">{profileData.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-800">Next Available</p>
                  <p className="text-sm">{profileData.nextSlot}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-semibold text-gray-800">
                    Consultation Fee
                  </p>
                  <p className="text-sm">{profileData.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Professional Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-teal-600" />
              Professional Information
            </h2>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      value={editData.experience}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Fee
                    </label>
                    <input
                      type="text"
                      value={editData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {profileData.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.experience}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Consultation Fee</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.price}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Specializations */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-600" />
              Specializations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.conditions.map((condition, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">{condition}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Methods */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-600" />
              Consultation Methods
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {profileData.consultationTypes.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                >
                  {type === "In-person" && (
                    <User className="w-5 h-5 text-teal-600" />
                  )}
                  {type === "Video Call" && (
                    <Video className="w-5 h-5 text-teal-600" />
                  )}
                  {type === "Phone Call" && (
                    <Phone className="w-5 h-5 text-teal-600" />
                  )}
                  <span className="text-gray-700 font-medium">{type}</span>
                  <div className="ml-auto">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Status */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-600" />
              Availability Status
            </h2>
            <div className="space-y-4">
              {profileData.availability.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{slot}</span>
                  </div>
                  <button className="text-teal-600 hover:text-blue-800 text-sm font-medium">
                    Edit Schedule
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  New appointment scheduled
                </p>
                <p className="text-sm text-gray-600">
                  Patient: John Doe - Today at 3:30 PM
                </p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  New 5-star review received
                </p>
                <p className="text-sm text-gray-600">
                  Patient: Sarah Wilson left a positive review
                </p>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Profile updated</p>
                <p className="text-sm text-gray-600">
                  Consultation fee and availability updated
                </p>
              </div>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardProfile;
