"use client"
import React, { useState } from 'react';
import { Plus, X, Upload, Calendar, Clock, MapPin, Star, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';

const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    category: '',
    experience: '',
    hospital: '',
    location: '',
    description: '',
    price: '',
    image: '',
    rating: 5.0,
    reviews: 0,
    nextSlot: '',
    conditions: [''],
    consultationTypes: [''],
    availability: ['']
  });

  const [errors, setErrors] = useState({});

  const specialties = [
    'Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedic', 'Pediatrician',
    'Psychiatrist', 'Radiologist', 'Surgeon', 'Urologist', 'Gynecologist'
  ];

  const categories = [
    'cardiology', 'dermatology', 'neurology', 'orthopedic', 'pediatrics',
    'psychiatry', 'radiology', 'surgery', 'urology', 'gynecology'
  ];

  const consultationOptions = ['In-person', 'Video Call', 'Phone Call'];
  const availabilityOptions = ['Today', 'Tomorrow', 'This Week', 'Next Week'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.specialty) newErrors.specialty = 'Specialty is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.hospital.trim()) newErrors.hospital = 'Hospital is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.nextSlot.trim()) newErrors.nextSlot = 'Next available slot is required';

    // Validate arrays
    if (formData.conditions.filter(c => c.trim()).length === 0) {
      newErrors.conditions = 'At least one condition is required';
    }
    if (formData.consultationTypes.filter(c => c.trim()).length === 0) {
      newErrors.consultationTypes = 'At least one consultation type is required';
    }
    if (formData.availability.filter(a => a.trim()).length === 0) {
      newErrors.availability = 'At least one availability option is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  if (validateForm()) {
    const cleanedData = {
      ...formData,
      conditions: formData.conditions.filter((c) => c.trim()),
      consultationTypes: formData.consultationTypes.filter((c) => c.trim()),
      availability: formData.availability.filter((a) => a.trim()),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
    };

    console.log("Doctor data submitted:", cleanedData);

    const res = await fetch("/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedData),
    });

    if (res.ok) {
      toast.success("Doctor registered successfully!")

      // Reset
      setFormData({
        name: "",
        specialty: "",
        category: "",
        experience: "",
        hospital: "",
        location: "",
        description: "",
        price: "",
        image: "",
        rating: 5.0,
        reviews: 0,
        nextSlot: "",
        conditions: [""],
        consultationTypes: [""],
        availability: [""],
      });
    } else {
      console.error("Failed to register doctor");
    }
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br   from-blue-50 to-indigo-100  px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Plus className="w-8 h-8" />
              Doctor Registration
            </h1>
            <p className="text-blue-100 mt-2">Add a new doctor to the system</p>
          </div>

          <div className="p-8 space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  Doctor Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter doctor's full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  Specialty *
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.specialty ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select specialty</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience *
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.experience ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 15 years"
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Hospital *
                </label>
                <input
                  type="text"
                  value={formData.hospital}
                  onChange={(e) => handleInputChange('hospital', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.hospital ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Hospital name"
                />
                {errors.hospital && <p className="text-red-500 text-sm mt-1">{errors.hospital}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Dhaka, Bangladesh"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Consultation Fee *
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Tk. 1500"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Next Available Slot *
                </label>
                <input
                  type="text"
                  value={formData.nextSlot}
                  onChange={(e) => handleInputChange('nextSlot', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.nextSlot ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 2:30 PM Today"
                />
                {errors.nextSlot && <p className="text-red-500 text-sm mt-1">{errors.nextSlot}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter detailed description about the doctor's experience and expertise..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Upload className="w-4 h-4 inline mr-1" />
                Profile Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="https://example.com/doctor-image.jpg"
              />
            </div>

            {/* Rating and Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Star className="w-4 h-4 inline mr-1 text-yellow-500" />
                  Rating
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Reviews
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={(e) => handleInputChange('reviews', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conditions Treated *
              </label>
              {formData.conditions.map((condition, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={condition}
                    onChange={(e) => handleArrayChange('conditions', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., Heart Disease"
                  />
                  {formData.conditions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('conditions', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('conditions')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Condition
              </button>
              {errors.conditions && <p className="text-red-500 text-sm mt-1">{errors.conditions}</p>}
            </div>

            {/* Consultation Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Types *
              </label>
              {formData.consultationTypes.map((type, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <select
                    value={type}
                    onChange={(e) => handleArrayChange('consultationTypes', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select consultation type</option>
                    {consultationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {formData.consultationTypes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('consultationTypes', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('consultationTypes')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Consultation Type
              </button>
              {errors.consultationTypes && <p className="text-red-500 text-sm mt-1">{errors.consultationTypes}</p>}
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Availability *
              </label>
              {formData.availability.map((slot, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <select
                    value={slot}
                    onChange={(e) => handleArrayChange('availability', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select availability</option>
                    {availabilityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {formData.availability.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('availability', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('availability')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Availability
              </button>
              {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-2 bg-teal-500 hover:bg-teal-600 text-white text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Register Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistrationForm;