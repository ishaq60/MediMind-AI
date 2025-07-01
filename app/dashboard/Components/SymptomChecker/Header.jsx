import { Brain } from 'lucide-react';
import React from 'react';

const Header = () => {
    return (
        <div>
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">AI Medical Diagnosis</h1>
                          <p className="text-sm text-gray-600">Intelligent symptom analysis and medical report review</p>
                        </div>
                      </div>
                    </div>
        </div>
    );
};

export default Header;