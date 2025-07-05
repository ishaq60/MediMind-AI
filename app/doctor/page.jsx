"use client"
import React, { useEffect, useState } from 'react';
import { 
  Search, Filter, MapPin, Clock, Star, Calendar, 
  User, Phone, Mail, Heart, Brain, Eye, Bone,
  Activity, Stethoscope, Baby, UserCheck, Shield,
  ChevronDown, ChevronRight, Video, MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import useDoctors from '@/hooks/useDoctors';

const DoctorAppointmentSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
// const [setDoctors,doctor]=useState()


//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/services/api/get-all");
//         const data = await res.json();
//         console.log("✅ Doctors fetchedddd:", data);
//         setDoctors(data ); // adjust based on API response
//       } catch (error) {
//         console.error("Failed to fetch doctors", error);
//       }
//     };

//     fetchDoctors();
//   }, []);



// console.log(doctor)
const [doctorslist, refetch, isLoading] = useDoctors();
console.log("sss"  ,doctorslist);


  const categories = [
    { id: 'all', name: 'All Specialists', icon: Stethoscope, count: 156 },
    { id: 'cardiology', name: 'Heart Conditions', icon: Heart, count: 23 },
    { id: 'neurology', name: 'Brain & Nervous System', icon: Brain, count: 18 },
    { id: 'orthopedics', name: 'Bone & Joint Issues', icon: Bone, count: 31 },
    { id: 'ophthalmology', name: 'Eye Problems', icon: Eye, count: 15 },
    { id: 'pediatrics', name: 'Child Health', icon: Baby, count: 27 },
    { id: 'psychiatry', name: 'Mental Health', icon: UserCheck, count: 19 },
    { id: 'dermatology', name: 'Skin Conditions', icon: Shield, count: 22 }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      category: 'cardiology',
      hospital: 'Mayo Clinic',
      rating: 4.9,
      reviews: 234,
      experience: '15 years',
      location: 'New York, NY',
      price: '$150',
      image: '/api/placeholder/80/80',
      availability: ['Today', 'Tomorrow', 'This Week'],
      nextSlot: '2:30 PM Today',
      conditions: ['Heart Disease', 'Hypertension', 'Arrhythmia', 'Chest Pain'],
      consultationTypes: ['In-person', 'Video Call', 'Phone Call']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      category: 'neurology',
      hospital: 'Johns Hopkins',
      rating: 4.8,
      reviews: 189,
      experience: '12 years',
      location: 'Baltimore, MD',
      price: '$180',
      image: '/api/placeholder/80/80',
      availability: ['Tomorrow', 'This Week'],
      nextSlot: '10:00 AM Tomorrow',
      conditions: ['Migraine', 'Epilepsy', 'Stroke', 'Memory Issues'],
      consultationTypes: ['In-person', 'Video Call']
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Orthopedic Surgeon',
      category: 'orthopedics',
      hospital: 'Cleveland Clinic',
      rating: 4.9,
      reviews: 312,
      experience: '18 years',
      location: 'Cleveland, OH',
      price: '$200',
      image: '/api/placeholder/80/80',
      availability: ['This Week', 'Next Week'],
      nextSlot: '9:15 AM Friday',
      conditions: ['Joint Pain', 'Fractures', 'Arthritis', 'Sports Injuries'],
      consultationTypes: ['In-person', 'Video Call', 'Phone Call']
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Ophthalmologist',
      category: 'ophthalmology',
      hospital: 'Mass Eye and Ear',
      rating: 4.7,
      reviews: 156,
      experience: '10 years',
      location: 'Boston, MA',
      price: '$120',
      image: '/api/placeholder/80/80',
      availability: ['Today', 'Tomorrow'],
      nextSlot: '4:45 PM Today',
      conditions: ['Vision Problems', 'Cataracts', 'Glaucoma', 'Dry Eyes'],
      consultationTypes: ['In-person', 'Video Call']
    },
    {
      id: 5,
      name: 'Dr. Lisa Park',
      specialty: 'Pediatrician',
      category: 'pediatrics',
      hospital: "Children's Hospital",
      rating: 4.9,
      reviews: 278,
      experience: '14 years',
      location: 'Los Angeles, CA',
      price: '$100',
      image: '/api/placeholder/80/80',
      availability: ['Today', 'Tomorrow', 'This Week'],
      nextSlot: '11:30 AM Today',
      conditions: ['Fever', 'Growth Issues', 'Vaccines', 'Behavioral Problems'],
      consultationTypes: ['In-person', 'Video Call', 'Phone Call']
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialty: 'Psychiatrist',
      category: 'psychiatry',
      hospital: 'Mental Health Institute',
      rating: 4.8,
      reviews: 167,
      experience: '16 years',
      location: 'Chicago, IL',
      price: '$160',
      image: '/api/placeholder/80/80',
      availability: ['Tomorrow', 'This Week'],
      nextSlot: '3:00 PM Tomorrow',
      conditions: ['Depression', 'Anxiety', 'ADHD', 'Sleep Disorders'],
      consultationTypes: ['In-person', 'Video Call', 'Phone Call']
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesCategory = selectedCategory === 'all' || doctor.category === selectedCategory;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <div className="min-h-screen bg-gradient-to-br  from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Find Your
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Perfect Doctor</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search by condition, specialty, or doctor name. Book appointments instantly with top-rated healthcare professionals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by condition, symptom, or doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Specialty</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <category.icon className={`w-6 h-6 mx-auto mb-2 ${
                  selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <div className="text-sm font-medium text-gray-900 mb-1">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count} doctors</div>
              </button>
            ))}
          </div>
        </div>

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
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-6">
              <Link href={`/doctor/${doctor.id}`}>
              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                {/* Doctor Photo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                      <p className="text-blue-600 font-semibold">{doctor.specialty}</p>
                      <p className="text-gray-600 text-sm">{doctor.hospital}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{doctor.price}</div>
                      <div className="text-sm text-gray-500">consultation</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold text-gray-900">{doctor.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{doctor.location}</span>
                    </div>
                  </div>

                  {/* Specializes in */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Specializes in:</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.conditions.slice(0, 3).map((condition, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
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

                  {/* Availability & Booking */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900 font-medium">Next: {doctor.nextSlot}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {doctor.consultationTypes.includes('Video Call') && (
                        <Video className="w-5 h-5 text-blue-600" title="Video consultation available" />
                      )}
                      {doctor.consultationTypes.includes('Phone Call') && (
                        <Phone className="w-5 h-5 text-green-600" title="Phone consultation available" />
                      )}
                      {doctor.consultationTypes.includes('In-person') && (
                        <User className="w-5 h-5 text-purple-600" title="In-person consultation available" />
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => handleBooking(doctor)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Book Appointment
                    </button>
                    <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
              
              </Link>
            </div>
          ))}
        </div>

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
                  <div className="space-y-2">
                    {selectedDoctor.consultationTypes.map((type) => (
                      <label key={type} className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50">
                        <input type="radio" name="consultationType" className="mr-3" />
                        <span className="text-gray-900">{type}</span>
                        {type === 'Video Call' && <Video className="w-4 h-4 ml-auto text-blue-600" />}
                        {type === 'Phone Call' && <Phone className="w-4 h-4 ml-auto text-green-600" />}
                        {type === 'In-person' && <User className="w-4 h-4 ml-auto text-purple-600" />}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentSection;