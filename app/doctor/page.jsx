"use client";
import React, { useState } from "react";
import { Filter, MapPin, Clock, Star, User, Phone, Video } from "lucide-react";
import Link from "next/link";
import useDoctors from "@/hooks/useDoctors";
import DoctorHeader from "../components/doctorDetails/doctorHeader";
import DoctorCard from "../components/doctorDetails/DoctorCard";
import Loading from "../components/Loading";
import ShowBookingModal from "../components/doctorDetails/ShowBookingModal";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";




const DoctorAppointmentSection = () => {
const router = useRouter();
  const session=useSession()
  

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [doctors, refetch, isLoading] = useDoctors();
  console.log(doctors);

  // Filter doctors by category and search term
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesCategory =
      selectedCategory === "all" || doctor.category === selectedCategory;
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.conditions.some((condition) =>
        condition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handleBooking = (doctor) => {
     if (session.status !== "authenticated") {
    toast.error("Please log in to book an appointment.");
     router.push("/login"); 
     return
  }
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

const bookingdata = {
  Dname: selectedDoctor,
  appointmentTime: selectedTime,
  bookingtype: selectedType,
  date: selectedDate,
 user: session
};

console.log("booking data form", bookingdata);

const confirmBooking = async () => {
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
        `Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`
      );

      setShowBookingModal(false);
      setSelectedDate("");
      setSelectedTime("");
    } else {
      toast.error("Booking failed: " + result.error);
    }
  } catch (error) {
    console.error("Booking error:", error);
    toast.error("Something went wrong while booking.");
  }
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

        {/* Doctor Card */}
        <DoctorCard
          filteredDoctors={filteredDoctors}
          handleBooking={handleBooking}
        >
          {" "}
        </DoctorCard>

        {/* Booking Modal */}
        {showBookingModal && selectedDoctor && (
          <ShowBookingModal
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            selectedDoctor={selectedDoctor}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            setSelectedType={setSelectedType}
            setShowBookingModal={setShowBookingModal}
            confirmBooking={confirmBooking}
          />
        )}

        {isLoading && (
          <div className="flex justify-center items-center mt-10">
            <Loading></Loading>
          </div>
        )}

        {filteredDoctors.length === 0 && !isLoading && (
          <p className="text-center text-gray-500 mt-10">
            No doctors found for your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentSection;
