import React from 'react';

const About = () => {
    return (
        <div id='about' className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Who We Are</h2>
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-px bg-cyan-400 w-16"></div>
                        <div className="mx-3">
                            <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <div className="h-px bg-cyan-400 w-16"></div>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        MediMind AI is a next-generation healthcare platform focused on AI-based diagnostics, patient management, and accessible treatment solutions for all.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left Content */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
                            Bridging technology and care through smart medical systems.
                        </h3>
                        
                        <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                            <p className='text-xl'>
                                We’re reshaping healthcare delivery through AI, smart hospital systems, and real-time patient-doctor connectivity. From online consultations to health analytics, we ensure modern care for everyone.
                            </p>
                            <p className='text-xl'>
                                Our mission is simple: better health outcomes with technology that empowers patients and healthcare professionals alike.
                            </p>
                        </div>

                        {/* Doctor Profile */}
                        <div className="flex items-center">
                            <div className="w-16 h-16 bg-gradient-to-br bg-teal-500 text-white rounded-full flex items-center justify-center mr-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-teal-500">David Ambrose</h4>
                                <p className="text-gray-600">Founder & Director</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Weekly Timetable */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border-2 border-teal-400 rounded-lg p-6">
                            <h4 className="text-xl font-semibold text-teal-500 mb-6">Weekly Timetable</h4>
                            
                            <div className="space-y-4">
                                {[
                                    ['Monday', '8:00am-7:00pm'],
                                    ['Tuesday', '9:00am-6:00pm'],
                                    ['Wednesday', '9:00am-6:00pm'],
                                    ['Thursday', '8:00am-7:00pm'],
                                    ['Friday', '8:00am-7:00pm'],
                                    ['Saturday', '9:00am-5:00pm'],
                                    ['Sunday', '9:00am-3:00pm']
                                ].map(([day, time], idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-700">{day}</span>
                                        <span className="text-gray-600">{time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Call Now Section */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Call Now</p>
                                        <p className="text-lg font-semibold text-teal-500">(+01) - 234 567 890</p>
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

export default About;
