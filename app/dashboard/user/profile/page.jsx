"use client"
import React, { useState } from 'react';
import { User, Edit3, Save, X, Phone, MapPin, Calendar, Shield, Heart, Clock, FileText, Star } from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  // User data with the specified information plus additional medical platform fields
  const [userProfile, setUserProfile] = useState({
    _id: "6875d6ffeff138ff875c0fbd",
    name: "Ishaq Shamim",
    email: "ishaqshamim243@gmail.com",
    image: "https://lh3.googleusercontent.com/a/ACg8ocIxVz9iWm-IPMMxetycSPMLtEO-h",
    type: "user",
    // Additional fields for medical platform
    phone: "+880 1712-345678",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    bloodType: "O+",
    emergencyContact: "+880 1812-987654",
    emergencyContactName: "Sarah Shamim",
    address: "House 42, Road 8, Dhanmondi, Dhaka-1205",
    medicalHistory: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Penicillin", "Shellfish"],
    currentMedications: ["Metformin 500mg", "Lisinopril 10mg"],
    preferredLanguage: "English",
    joinedDate: "2024-03-15",
    lastLogin: "2025-07-20T10:30:00Z",
    totalDiagnoses: 12,
    totalAppointments: 8,
    membershipTier: "Premium"
  });

  const [editedProfile, setEditedProfile] = useState({...userProfile});

  const handleSave = () => {
    setUserProfile({...editedProfile});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({...userProfile});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'medical', label: 'Medical History', icon: Heart },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src={userProfile.image} 
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-fullbg-gradient-to-r p-3 rounded-xl from-blue-500 to-purple-600  text-white flex items-center justify-center text-xl font-bold" style={{display: 'none'}}>
                  {userProfile.name.charAt(0)}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                <p className="text-gray-600">{userProfile.email}</p>
                <div className="flex items-center mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    userProfile.membershipTier === 'Premium' 
                      ? 'bg-gold-100 text-gold-800 border border-gold-300' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {userProfile.membershipTier} Member
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r p-3 rounded-xl from-blue-500 to-purple-600 text-white"
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userProfile.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900">{userProfile.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userProfile.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editedProfile.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-900">{new Date(userProfile.dateOfBirth).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      {isEditing ? (
                        <select
                          value={editedProfile.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{userProfile.gender}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                      {isEditing ? (
                        <select
                          value={editedProfile.bloodType}
                          onChange={(e) => handleInputChange('bloodType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{userProfile.bloodType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Contact Name"
                            value={editedProfile.emergencyContactName}
                            onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <input
                            type="tel"
                            placeholder="Contact Number"
                            value={editedProfile.emergencyContact}
                            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-900">{userProfile.emergencyContactName}</p>
                          <p className="text-gray-600 text-sm">{userProfile.emergencyContact}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      {isEditing ? (
                        <textarea
                          value={editedProfile.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userProfile.address}</p>
                      )}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-6">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'medical' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                      <div className="space-y-1">
                        {userProfile.medicalHistory.map((condition, index) => (
                          <div key={index} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm inline-block mr-2">
                            {condition}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
                      <div className="space-y-1">
                        {userProfile.allergies.map((allergy, index) => (
                          <div key={index} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm inline-block mr-2">
                            {allergy}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                      <div className="space-y-2">
                        {userProfile.currentMedications.map((medication, index) => (
                          <div key={index} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                            {medication}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                      <p className="text-gray-900">{userProfile.preferredLanguage}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Account Activity</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-indigo-600 font-medium">Total Diagnoses</p>
                        <p className="text-2xl font-bold text-indigo-900">{userProfile.totalDiagnoses}</p>
                      </div>
                      <FileText className="w-8 h-8 text-indigo-600" />
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Total Appointments</p>
                        <p className="text-2xl font-bold text-green-900">{userProfile.totalAppointments}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600 font-medium">Member Since</p>
                        <p className="text-lg font-bold text-purple-900">
                          {new Date(userProfile.joinedDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                      <Star className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
                  <p className="text-sm text-gray-600">
                    Last Login: {new Date(userProfile.lastLogin).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    User ID: {userProfile._id}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Account Type: {userProfile.type.charAt(0).toUpperCase() + userProfile.type.slice(1)}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Password</h4>
                    <p className="text-gray-600 text-sm mb-3">Last updated 3 months ago</p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Change Password
                    </button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                    <p className="text-gray-600 text-sm mb-3">Add an extra layer of security to your account</p>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Privacy Settings</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 mr-2" />
                        <span className="text-sm text-gray-700">Allow data sharing with healthcare providers</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 mr-2" />
                        <span className="text-sm text-gray-700">Receive appointment reminders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 mr-2" />
                        <span className="text-sm text-gray-700">Receive promotional emails</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;