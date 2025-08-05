import Link from "next/link";
import React, { useState } from "react";
import MyTypeAnimation from "./MyTypeAnimation";
import image from "../../public/assets/image/AdobeStock_658147333_Preview.jpeg"
import image2 from "../../public/assets/image/close-up-people-wearing-lab-coats.jpg"
const Banner = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  return (
    <>
      <div className="relative pt-20 min-h-[800px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
         style={{
    backgroundImage: `url(${image2.src})`,
  }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-cyan-300/15 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-300/20 rounded-full blur-md"></div>
          <div className="absolute top-20 left-1/4 w-20 h-20 bg-indigo-400/10 rounded-full blur-lg"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between h-full min-h-[700px] gap-8">
            {/* Left Content */}
            <div className="flex-1 text-white z-20 pt-8">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">&nbsp;</span>
                <MyTypeAnimation></MyTypeAnimation>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
                Get instant, accurate health insights with our advanced AI.
                Upload symptoms, medical reports, or X-rays and receive
                professional-grade analysis in seconds. Book appointments with
                specialists instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={"/dashboard"}
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Symptom Checker
                </Link>
                <button
                  onClick={openVideoModal}
                  className="bg-transparent border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                >
                  See demo video
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative lg:flex justify-center lg:justify-end">
              <div className="relative">
                {/* Doctor Image Placeholder - using CSS to create a professional silhouette */}
                <div className="w-80 h-96 lg:w-96 lg:h-[480px] relative">
                  {/* Professional doctor figure */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20 rounded-t-full"></div>

                  {/* Doctor silhouette representation */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    {/* Body */}
                    <div className="w-32 h-48 bg-white rounded-t-3xl relative shadow-2xl">
                      {/* Lab coat details */}
                      <div className="absolute top-4 left-4 w-2 h-12 bg-blue-200 rounded-full"></div>
                      <div className="absolute top-4 right-4 w-2 h-12 bg-blue-200 rounded-full"></div>

                      {/* Stethoscope */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                        <div className="w-12 h-12 border-4 border-blue-600 rounded-full bg-transparent"></div>
                        <div className="w-1 h-8 bg-blue-600 mx-auto"></div>
                      </div>

                      {/* Arms */}
                      <div className="absolute -left-4 top-12 w-8 h-16 bg-white rounded-full transform rotate-12 shadow-lg"></div>
                      <div className="absolute -right-4 top-12 w-8 h-16 bg-white rounded-full transform -rotate-12 shadow-lg"></div>
                    </div>

                    {/* Head */}
                    <div className="w-20 h-20 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full mx-auto -mb-2 shadow-lg relative">
                      {/* Face features */}
                      <div className="absolute top-6 left-6 w-2 h-2 bg-blue-800 rounded-full"></div>
                      <div className="absolute top-6 right-6 w-2 h-2 bg-blue-800 rounded-full"></div>
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-orange-400 rounded-full"></div>

                      {/* Hair */}
                      <div className="absolute -top-2 left-2 right-2 h-6 bg-gradient-to-r from-amber-800 to-amber-700 rounded-t-full"></div>
                    </div>
                  </div>

                  {/* Floating medical icons */}
                  <div className="absolute top-10 -left-8 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-6 h-6 border-2 border-white rounded-full relative">
                      <div className="absolute inset-1 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div className="absolute top-32 -right-10 w-12 h-12 bg-cyan-300/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-6 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-6 bg-white rounded-full absolute"></div>
                  </div>

                  <div className="absolute bottom-20 -left-6 w-12 h-12 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-6 h-6 border-2 border-white rounded-sm relative transform rotate-45">
                      <div className="absolute inset-1 border border-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
   {showVideoModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l7-5-7-5z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
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
      <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
        <div className="space-y-4">
          {/* Video Player */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 relative">
              <video
                className="w-full h-full object-cover rounded-lg"
                controls
                poster="/assets/demo-thumbnail.jpg"
                preload="metadata"
              >
                <source src="/assets/Demo.mp4" type="video/mp4" />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l7-5-7-5z"/>
                    </svg>
                    <p>Your browser does not support the video tag.</p>
                  </div>
                </div>
              </video>
              
              {/* Custom play button overlay (optional) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l7-5-7-5z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  How Our AI Health Assistant Works
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Watch this comprehensive demo to see how our advanced AI analyzes symptoms,
                  medical reports, and X-rays to provide instant health insights
                  and connect you with the right specialists. Duration: 3:45
                </p>
              </div>
            </div>
          </div>

          {/* Features highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Symptom Analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>X-ray Reading</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Specialist Matching</span>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Video quality: HD • Subtitles available</span>
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Download
            </button>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
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