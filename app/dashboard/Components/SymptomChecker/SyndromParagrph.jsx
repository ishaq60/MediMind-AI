"use client"
import { Activity, Brain } from 'lucide-react';
import React from 'react';
import Result from './Result';

const SyndromParagrph = ({handleSymptomSubmit,setSymptoms,symptoms,isAnalyzing, result}) => {
    return (
        <div>
             <div className="space-y-2">
                <div className="text-center mb-8">
                  <Activity className="w-16 h-12 text-blue-500 mx-auto mb-2" />
                  <h2 className="text-3xl font-bold text-black mb-2">
                    Describe Your Symptoms
                  </h2>
                  <p className="text-black max-w-2xl mx-auto">
                    Tell us about what you're experiencing. Our AI will analyze
                    your symptoms and provide insights into possible conditions.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="symptoms"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      What symptoms are you experiencing?
                    </label>
                    <textarea
                      id="symptoms"
                      rows={6}
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                      placeholder="Describe your symptoms in detail..."
                    />
                  </div>

                  <button
                    onClick={handleSymptomSubmit}
                    disabled={!symptoms.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing Symptoms...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        <span>Analyze Symptoms with AI</span>
                      </>
                    )}
                  </button>
                </div>

               {<Result result={result} />}

              </div>
        </div>
    );
};

export default SyndromParagrph;