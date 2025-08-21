import React, { useState } from "react";
import image2 from "../../public/assets/image/close-up-people-wearing-lab-coats.jpg"
const Banner = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  // Using placeholder images - replace with your actual image imports


  return (
    <>
      <div className="relative pt-16 sm:pt-20 min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url("/assets/image/close-up-people-wearing-lab-coats.jpg")`,
  }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 sm:bg-black/50"></div>
        </div>

        {/* Background decorative elements - Hidden on mobile for better performance */}
        <div className="absolute inset-0 hidden sm:block">
          <div className="absolute top-6 sm:top-10 right-4 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-cyan-300/15 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 right-1/4 sm:right-1/3 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-300/20 rounded-full blur-md"></div>
          <div className="absolute top-12 sm:top-20 left-1/4 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-indigo-400/10 rounded-full blur-lg"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col items-center justify-center text-center h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] py-8 sm:py-12 lg:py-16">
            {/* Main Content */}
            <div className="text-white z-20 max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
                <span className="block mb-2">AI-Powered Diagnoses</span>
                <span className="block text-cyan-300">in Seconds</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                Get instant, accurate health insights with our advanced AI.
                Upload symptoms, medical reports, or X-rays and receive
                professional-grade analysis in seconds. Book appointments with
                specialists instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <button
                  onClick={() => window.location.href = "/dashboard"}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  Symptom Checker
                </button>
                <button
                  onClick={openVideoModal}
                  className="w-full sm:w-auto bg-transparent border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-slate-900 font-semibold px-6 sm:px-8 py-3 rounded-lg transition-all duration-300 text-sm sm:text-base"
                >
                  See Demo Video
                </button>
              </div>

              {/* Feature highlights - Only show on larger screens */}
              <div className="hidden md:flex justify-center items-center mt-12 lg:mt-16 space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2 text-sm lg:text-base text-blue-200">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Instant Analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-sm lg:text-base text-blue-200">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2 text-sm lg:text-base text-blue-200">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal - Responsive */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="relative bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l7-5-7-5z"/>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  AI Health Assistant Demo
                </h3>
              </div>
              <button
                onClick={closeVideoModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-red-500 hover:text-gray-600 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Content */}
            <div className="p-3 sm:p-6 max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)] overflow-y-auto">
              <div className="space-y-3 sm:space-y-4">
                {/* Video Player */}
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 relative">
                    <video
                      className="w-full h-full object-cover rounded-lg"
                      controls
                      poster="/api/placeholder/800/450"
                      preload="metadata"
                    >
                      <source src="/assets/Demo.mp4" type="video/mp4" />
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center px-4">
                          <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l7-5-7-5z"/>
                          </svg>
                          <p className="text-sm sm:text-base">Your browser does not support the video tag.</p>
                        </div>
                      </div>
                    </video>
                  </div>
                </div>

                {/* Video Info */}
                <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-3 sm:p-4 border border-gray-100">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        How Our AI Health Assistant Works
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        Watch this comprehensive demo to see how our advanced AI analyzes symptoms,
                        medical reports, and X-rays to provide instant health insights
                        and connect you with the right specialists. Duration: 3:45
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features highlight */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 bg-gray-50 rounded-lg p-2 sm:p-3">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Symptom Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 bg-gray-50 rounded-lg p-2 sm:p-3">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>X-ray Reading</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 bg-gray-50 rounded-lg p-2 sm:p-3">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Specialist Matching</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-3 sm:px-6 py-2 sm:py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-500 space-y-2 sm:space-y-0">
                <span>Video quality: HD • Subtitles available</span>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button className="text-teal-600 hover:text-blue-700 font-medium">
                    Download
                  </button>
                  <button className="text-teal-600 hover:text-blue-700 font-medium">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;