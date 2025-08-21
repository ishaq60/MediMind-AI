
"use client"
import { Mail, Phone } from 'lucide-react';
import React from 'react';

const Contact = () => {
    return (
        <div>
             <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We're here to help you get started with AI-powered medical diagnosis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-2xl">
                <Phone className="w-6 h-6 text-teal-600" />
                <div>
                  <p className="font-semibold text-gray-900">Phone Support</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-2xl">
                <Mail className="w-6 h-6 text-teal-600" />
                <div>
                  <p className="font-semibold text-gray-900">Email Support</p>
                  <p className="text-gray-600">support@MediMind AI.com</p>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Response</h3>
                <p className="text-gray-600">Average response time: 2 hours</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <button
                onClick={() => alert('Message sent! We\'ll get back to you soon.')}
                className="w-full px-8 py-4   bg-teal-500 hover:bg-teal-600 text-white text-white  rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Contact;