import React, { useState } from 'react';
import { Upload, FileText, Activity, Brain, Stethoscope, AlertCircle, CheckCircle, X, Camera, FileUp } from 'lucide-react';
import Header from './Header';
import Report from './Report';
import ImagineFile from './ImagineFile';
import UploadFiles from './UploadFiles';

const SymptomChecker = () => {
  const [activeTab, setActiveTab] = useState('symptoms');
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSymptomSubmit = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        conditions: [
          { name: 'Common Cold', confidence: 85, severity: 'Low' },
          { name: 'Seasonal Allergies', confidence: 72, severity: 'Low' },
          { name: 'Viral Upper Respiratory Infection', confidence: 68, severity: 'Medium' }
        ],
        explanation: 'Based on your symptoms, these are the most likely conditions. The AI analysis considers symptom patterns and medical literature.',
        recommendations: [
          'Rest and stay hydrated',
          'Consider over-the-counter medications',
          'Monitor symptoms for 3-5 days',
          'Consult a doctor if symptoms worsen'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleFileUpload = (event, type) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: type,
      size: file.size,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        {/* header section */}
       <Header/>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'symptoms', name: 'Symptom Analysis', icon: Stethoscope },
                { id: 'reports', name: 'Medical Reports', icon: FileText },
                { id: 'imaging', name: 'Medical Imaging', icon: Camera }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } group inline-flex items-center py-4 px-3 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200`}
                  >
                    <Icon className={`${
                      activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    } -ml-0.5 mr-2 h-5 w-5`} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Symptoms Tab */}
            {activeTab === 'symptoms' && (
              <div className="space-y-2">
                <div className="text-center mb-8">
                  <Activity className="w-16 h-12 text-blue-500 mx-auto mb-2" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Describe Your Symptoms</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Tell us about what you're experiencing. Our AI will analyze your symptoms and provide insights into possible conditions.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                      What symptoms are you experiencing?
                    </label>
                    <textarea
                      id="symptoms"
                      rows={6}
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                      placeholder="Describe your symptoms in detail... (e.g., I've been experiencing a persistent cough for 3 days, along with a runny nose and mild fever)"
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

                {/* Results */}
                {results && (
                  <results results={results}></results>
                )}
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
                //Medical report
             <Report handleFileUpload={handleFileUpload}  formatFileSize={ formatFileSize} FileText={FileText} ></Report>
            )}

            {/* Imaging Tab */}
            {activeTab === 'imaging' && (
              <ImagineFile handleFileUpload={handleFileUpload}></ImagineFile>
            )}

            {/* Uploaded Files Display */}
            {uploadedFiles.length > 0 && (
            //   <div className="mt-8">
            //     <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h3>
            //     <div className="space-y-3">
            //       {uploadedFiles.map((file) => (
            //         <div key={file.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            //           <div className="flex items-center space-x-3">
            //             <div className="bg-blue-100 p-2 rounded-lg">
            //               {file.type === 'imaging' ? (
            //                 <Camera className="w-5 h-5 text-blue-600" />
            //               ) : (
            //                 <FileText className="w-5 h-5 text-blue-600" />
            //               )}
            //             </div>
            //             <div>
            //               <p className="font-medium text-gray-900">{file.name}</p>
            //               <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            //             </div>
            //           </div>
            //           <button
            //             onClick={() => removeFile(file.id)}
            //             className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
            //           >
            //             <X className="w-5 h-5" />
            //           </button>
            //         </div>
            //       ))}
            //     </div>

            //     <button className="mt-4 w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2">
            //       <Brain className="w-5 h-5" />
            //       <span>Analyze Uploaded Files</span>
            //     </button>
            //   </div>
            <UploadFiles uploadedFiles={uploadedFiles} formatFileSize={ formatFileSize} removeFile={removeFile} ></UploadFiles>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;