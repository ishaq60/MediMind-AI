"use client"
import { Star } from 'lucide-react';
import React, { useState } from 'react';

const Testmonalsection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist, Mayo Clinic",
      text: "This AI assistant has revolutionized how we approach preliminary diagnosis. The accuracy is remarkable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Patient",
      text: "Got my symptoms analyzed in minutes and connected with the right specialist. Incredible technology!",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Emergency Medicine, Johns Hopkins",
      text: "The AI-powered report analysis saves us hours of work and helps us focus on patient care.",
      rating: 5
    }
  ];


    return (
        <div>
            <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-gray-900">
            Trusted by Healthcare
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Professionals</span>
          </h2>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border border-gray-100 shadow-xl">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl text-gray-700 mb-8 italic leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div>
                <p className="text-xl font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Testmonalsection;