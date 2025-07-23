"use client";

import { Brain, Calendar, FileText, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const Feature = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description:
        "Advanced machine learning analyzes symptoms and medical reports with high accuracy",
    },
    {
      icon: FileText,
      title: "Smart Report Analysis",
      description:
        "Upload X-rays, blood tests, and get instant AI-powered summaries and insights",
    },
    {
      icon: Calendar,
      title: "Easy Appointments",
      description:
        "Book consultations with specialists based on AI recommendations and availability",
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description:
        "Your medical data is secure with enterprise-grade encryption and privacy protection",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Better Healthcare
            </span>
          </h2>

          {/* 👇 Fade-up motion paragraph */}
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Our AI-powered platform combines cutting-edge technology with
            medical expertise to provide accurate, fast, and reliable health
            insights.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                className="group p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:scale-105"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <Icon className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Feature;
