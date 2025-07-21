import Link from "next/link";
import React from "react";


const Banner = () => {
  return (
    <div className="relative mt-4 min-h-[700px] bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-800 overflow-hidden">
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
          <div className="flex-1 text-white z-20 pt-16 lg:pt-0">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">AI-Powered&nbsp;</span>
      
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
              Get instant, accurate health insights with our advanced AI. Upload
              symptoms, medical reports, or X-rays and receive
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
              <button className="bg-transparent border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                Our Service
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
  );
};

export default Banner;
