import { AlertCircle, CheckCircle } from 'lucide-react';
import React from 'react';

const Result = ({results}) => {
    return (
        <div>
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Analysis Complete</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Possible Conditions</h4>
                        <div className="space-y-3">
                          {results.conditions.map((condition, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-gray-900">{condition.name}</h5>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  condition.severity === 'Low' ? 'bg-green-100 text-green-800' :
                                  condition.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {condition.severity}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                                    style={{ width: `${condition.confidence}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600">{condition.confidence}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <ul className="space-y-2">
                            {results.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div>
                              <p className="text-sm text-amber-800 font-medium">Medical Disclaimer</p>
                              <p className="text-xs text-amber-700 mt-1">
                                This AI analysis is for informational purposes only and should not replace professional medical advice.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
    );
};

export default Result;