import { Phone, User, Video } from 'lucide-react';
import React from 'react';

const ShowBookingModal = 
({selectedDate,selectedDoctor, 
setSelectedTime,
setSelectedType,selectedTime,
setSelectedDate,selectedType,
setShowBookingModal,
confirmBooking,
  
}) => {
    return (
        <div>
            <div className="fixed inset-0   bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-blue-600 rounded-3xl max-w-md w-full p-8">
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
        </div>
    );
};

export default ShowBookingModal;