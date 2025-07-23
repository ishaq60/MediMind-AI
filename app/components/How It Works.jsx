import { ArrowRight, Brain, FileText, Stethoscope } from 'lucide-react';
import React from 'react';

const HowItWorks= () => {
    return (
        <div>
            <section id="how-it-works" className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get professional medical insights in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Input Symptoms", desc: "Describe your symptoms or upload medical reports, X-rays, or lab results", icon: FileText },
              { step: 2, title: "AI Analysis", desc: "Our advanced AI analyzes your data using medical knowledge and pattern recognition", icon: Brain },
              { step: 3, title: "Get Results", desc: "Receive detailed insights, possible conditions, and recommendations for next steps", icon: Stethoscope }
            ].map((step, idx) => (
              <div key={idx} className="relative text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  <span className="text-blue-600">Step {step.step}:</span> {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{step.desc}</p>
                
                {idx < 2 && (
                  <ArrowRight className="hidden md:block absolute top-10 -right-4 w-8 h-8 text-blue-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default HowItWorks;