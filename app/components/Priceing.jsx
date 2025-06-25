import { CheckCircle } from 'lucide-react';
import React from 'react';

const Priceing = () => {
    return (
        <div>
            <section id="pricing" className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Basic", price: "Free", features: ["5 diagnoses/month", "Basic symptom checker", "Email support"], popular: false },
              { name: "Pro", price: "$29", features: ["Unlimited diagnoses", "Advanced AI analysis", "Priority support", "Report uploads"], popular: true },
              { name: "Enterprise", price: "$99", features: ["Everything in Pro", "API access", "Custom integrations", "24/7 phone support"], popular: false }
            ].map((plan, idx) => (
              <div key={idx} className={`relative p-8 bg-white rounded-3xl border-2 hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-1">
                    {plan.price}
                    {plan.price !== "Free" && <span className="text-lg text-gray-500">/month</span>}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg' 
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}>
                  {plan.price === "Free" ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default Priceing;