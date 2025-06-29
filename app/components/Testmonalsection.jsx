"use client"
import React from 'react';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testmonalsection = () => {
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
    <section id="testimonials" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-gray-900">
          Trusted by Healthcare
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Professionals</span>
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border border-gray-100 shadow-xl">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-2xl text-gray-700 mb-8 italic leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                <div>
                  <p className="text-xl font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testmonalsection;
