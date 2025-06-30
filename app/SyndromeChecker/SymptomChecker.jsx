// import React, { useState } from 'react';
// import { Upload, FileText, Activity, Brain, Stethoscope, AlertCircle, CheckCircle, X, Camera, FileUp } from 'lucide-react';

// const SymptomChecker = () => {
//   const [activeTab, setActiveTab] = useState('symptoms');
//   const [symptoms, setSymptoms] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState(null);
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const handleSymptomSubmit = async (e) => {
//     e.preventDefault();
//     setIsAnalyzing(true);
    
//     // Simulate AI analysis
//     setTimeout(() => {
//       setResults({
//         conditions: [
//           { name: 'Common Cold', confidence: 85, severity: 'Low' },
//           { name: 'Seasonal Allergies', confidence: 72, severity: 'Low' },
//           { name: 'Viral Upper Respiratory Infection', confidence: 68, severity: 'Medium' }
//         ],
//         explanation: 'Based on your symptoms, these are the most likely conditions. The AI analysis considers symptom patterns and medical literature.',
//         recommendations: [
//           'Rest and stay hydrated',
//           'Consider over-the-counter medications',
//           'Monitor symptoms for 3-5 days',
//           'Consult a doctor if symptoms worsen'
//         ]
//       });
//       setIsAnalyzing(false);
//     }, 3000);
//   };

//   const handleFileUpload = (event, type) => {
//     const files = Array.from(event.target.files);
//     const newFiles = files.map(file => ({
//       id: Date.now() + Math.random(),
//       name: file.name,
//       type: type,
//       size: file.size,
//       file: file
//     }));
//     setUploadedFiles(prev => [...prev, ...newFiles]);
//   };

//   const removeFile = (id) => {
//     setUploadedFiles(prev => prev.filter(file => file.id !== id));
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center space-x-3">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
//               <Brain className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">AI Medical Diagnosis</h1>
//               <p className="text-sm text-gray-600">Intelligent symptom analysis and medical report review</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Tab Navigation */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6" aria-label="Tabs">
//               {[
//                 { id: 'symptoms', name: 'Symptom Analysis', icon: Stethoscope },
//                 { id: 'reports', name: 'Medical Reports', icon: FileText },
//                 { id: 'imaging', name: 'Medical Imaging', icon: Camera }
//               ].map((tab) => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`${
//                       activeTab === tab.id
//                         ? 'border-blue-500 text-blue-600 bg-blue-50'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     } group inline-flex items-center py-4 px-3 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200`}
//                   >
//                     <Icon className={`${
//                       activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
//                     } -ml-0.5 mr-2 h-5 w-5`} />
//                     <span>{tab.name}</span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {/* Symptoms Tab */}
//             {activeTab === 'symptoms' && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <Activity className="w-16 h-16 text-blue-500 mx-auto mb-4" />
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2">Describe Your Symptoms</h2>
//                   <p className="text-gray-600 max-w-2xl mx-auto">
//                     Tell us about what you're experiencing. Our AI will analyze your symptoms and provide insights into possible conditions.
//                   </p>
//                 </div>

//                 <form onSubmit={handleSymptomSubmit} className="space-y-6">
//                   <div>
//                     <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
//                       What symptoms are you experiencing?
//                     </label>
//                     <textarea
//                       id="symptoms"
//                       rows={6}
//                       value={symptoms}
//                       onChange={(e) => setSymptoms(e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
//                       placeholder="Describe your symptoms in detail... (e.g., I've been experiencing a persistent cough for 3 days, along with a runny nose and mild fever)"
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={!symptoms.trim() || isAnalyzing}
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         <span>Analyzing Symptoms...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Brain className="w-5 h-5" />
//                         <span>Analyze Symptoms with AI</span>
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 {/* Results */}
//                 {results && (
//                   <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
//                     <div className="flex items-center space-x-2 mb-4">
//                       <CheckCircle className="w-6 h-6 text-green-600" />
//                       <h3 className="text-xl font-semibold text-gray-900">Analysis Complete</h3>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div>
//                         <h4 className="font-semibold text-gray-900 mb-3">Possible Conditions</h4>
//                         <div className="space-y-3">
//                           {results.conditions.map((condition, index) => (
//                             <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
//                               <div className="flex justify-between items-start mb-2">
//                                 <h5 className="font-medium text-gray-900">{condition.name}</h5>
//                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                   condition.severity === 'Low' ? 'bg-green-100 text-green-800' :
//                                   condition.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                                   'bg-red-100 text-red-800'
//                                 }`}>
//                                   {condition.severity}
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <div className="flex-1 bg-gray-200 rounded-full h-2">
//                                   <div 
//                                     className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
//                                     style={{ width: `${condition.confidence}%` }}
//                                   ></div>
//                                 </div>
//                                 <span className="text-sm text-gray-600">{condition.confidence}%</span>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <div>
//                         <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
//                         <div className="bg-white rounded-lg p-4 shadow-sm">
//                           <ul className="space-y-2">
//                             {results.recommendations.map((rec, index) => (
//                               <li key={index} className="flex items-start space-x-2">
//                                 <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
//                                 <span className="text-sm text-gray-700">{rec}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>

//                         <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
//                           <div className="flex items-start space-x-2">
//                             <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
//                             <div>
//                               <p className="text-sm text-amber-800 font-medium">Medical Disclaimer</p>
//                               <p className="text-xs text-amber-700 mt-1">
//                                 This AI analysis is for informational purposes only and should not replace professional medical advice.
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Reports Tab */}
//             {activeTab === 'reports' && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <FileText className="w-16 h-16 text-purple-500 mx-auto mb-4" />
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Medical Reports</h2>
//                   <p className="text-gray-600 max-w-2xl mx-auto">
//                     Upload your medical reports, lab results, or prescriptions. Our AI will analyze and summarize the content.
//                   </p>
//                 </div>

//                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors duration-200">
//                   <input
//                     type="file"
//                     id="report-upload"
//                     multiple
//                     accept=".pdf,.doc,.docx,.txt"
//                     onChange={(e) => handleFileUpload(e, 'report')}
//                     className="hidden"
//                   />
//                   <label htmlFor="report-upload" className="cursor-pointer">
//                     <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-lg font-medium text-gray-900 mb-2">Upload Medical Reports</p>
//                     <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX, TXT files up to 10MB</p>
//                     <span className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
//                       Choose Files
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* Imaging Tab */}
//             {activeTab === 'imaging' && (
//               <div className="space-y-6">
//                 <div className="text-center mb-8">
//                   <Camera className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2">Medical Imaging Analysis</h2>
//                   <p className="text-gray-600 max-w-2xl mx-auto">
//                     Upload X-rays, CT scans, or MRI images for AI-powered analysis and anomaly detection.
//                   </p>
//                 </div>

//                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-indigo-400 transition-colors duration-200">
//                   <input
//                     type="file"
//                     id="imaging-upload"
//                     multiple
//                     accept=".jpg,.jpeg,.png,.dicom"
//                     onChange={(e) => handleFileUpload(e, 'imaging')}
//                     className="hidden"
//                   />
//                   <label htmlFor="imaging-upload" className="cursor-pointer">
//                     <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-lg font-medium text-gray-900 mb-2">Upload Medical Images</p>
//                     <p className="text-sm text-gray-500 mb-4">JPG, PNG, DICOM files up to 50MB</p>
//                     <span className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
//                       Choose Images
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* Uploaded Files Display */}
//             {uploadedFiles.length > 0 && (
//               <div className="mt-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h3>
//                 <div className="space-y-3">
//                   {uploadedFiles.map((file) => (
//                     <div key={file.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="bg-blue-100 p-2 rounded-lg">
//                           {file.type === 'imaging' ? (
//                             <Camera className="w-5 h-5 text-blue-600" />
//                           ) : (
//                             <FileText className="w-5 h-5 text-blue-600" />
//                           )}
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900">{file.name}</p>
//                           <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => removeFile(file.id)}
//                         className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <button className="mt-4 w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2">
//                   <Brain className="w-5 h-5" />
//                   <span>Analyze Uploaded Files</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SymptomChecker;

import React, { useState, useEffect } from 'react';
import { Upload, FileText, Activity, Brain, Stethoscope, AlertCircle, CheckCircle, X, Camera, FileUp, Sparkles, Zap, Heart, Shield, Clock, Users, TrendingUp, Calendar } from 'lucide-react';

const SymptomChecker = () => {
  const [activeTab, setActiveTab] = useState('symptoms');
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSymptomSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Enhanced simulation with more realistic progression
    setTimeout(() => {
      setResults({
        conditions: [
          { name: 'Common Cold', confidence: 85, severity: 'Low', description: 'Viral upper respiratory tract infection' },
          { name: 'Seasonal Allergies', confidence: 72, severity: 'Low', description: 'Allergic rhinitis caused by environmental allergens' },
          { name: 'Viral Upper Respiratory Infection', confidence: 68, severity: 'Medium', description: 'Inflammation of upper respiratory tract' }
        ],
        explanation: 'Based on your symptoms, these are the most likely conditions. The AI analysis considers symptom patterns and medical literature.',
        recommendations: [
          'Rest and stay hydrated',
          'Consider over-the-counter medications',
          'Monitor symptoms for 3-5 days',
          'Consult a doctor if symptoms worsen'
        ],
        aiInsights: {
          keyWords: ['cough', 'runny nose', 'fever'],
          riskLevel: 'low',
          urgency: 'routine'
        }
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
      file: file,
      status: 'uploaded'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Header */}
      <div className="relative backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-3 rounded-2xl shadow-2xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                  AI Medical Diagnosis
                </h1>
                <p className="text-cyan-200/80 font-medium">Next-generation intelligent healthcare platform</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98.5%</div>
                <div className="text-xs text-cyan-200/80">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2.1M+</div>
                <div className="text-xs text-cyan-200/80">Diagnoses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-cyan-200/80">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Tab Navigation */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="border-b border-white/20">
            <nav className="flex" aria-label="Tabs">
              {[
                { id: 'symptoms', name: 'AI Symptom Analysis', icon: Stethoscope, gradient: 'from-emerald-400 to-teal-600' },
                { id: 'reports', name: 'Smart Report Analysis', icon: FileText, gradient: 'from-purple-400 to-pink-600' },
                { id: 'imaging', name: 'Medical Imaging AI', icon: Camera, gradient: 'from-orange-400 to-red-600' }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl transform scale-105`
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    } group flex-1 flex items-center justify-center py-6 px-4 font-semibold text-lg rounded-t-3xl transition-all duration-300 relative overflow-hidden`}
                  >
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                    )}
                    <Icon className="mr-3 h-6 w-6 relative z-10" />
                    <span className="relative z-10">{tab.name}</span>
                    {activeTab === tab.id && (
                      <Sparkles className="ml-2 h-5 w-5 animate-pulse relative z-10" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Enhanced Tab Content */}
          <div className="p-8">
            {/* Symptoms Tab */}
            {activeTab === 'symptoms' && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <div className="relative inline-block mb-6">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-600 p-6 rounded-3xl shadow-2xl">
                      <Activity className="w-20 h-20 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-yellow-900" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Describe Your <span className="bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">Symptoms</span>
                  </h2>
                  <p className="text-cyan-200/80 text-lg max-w-3xl mx-auto leading-relaxed">
                    Our advanced AI analyzes your symptoms using natural language processing and medical knowledge graphs 
                    to provide accurate diagnostic insights with explainable reasoning.
                  </p>
                </div>

                <form onSubmit={handleSymptomSubmit} className="space-y-8">
                  <div className="relative">
                    <label htmlFor="symptoms" className="block text-lg font-semibold text-white mb-4">
                      What symptoms are you experiencing?
                    </label>
                    <div className="relative">
                      <textarea
                        id="symptoms"
                        rows={8}
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl focus:ring-4 focus:ring-emerald-500/50 focus:border-emerald-400 text-white placeholder-white/50 resize-none transition-all duration-300 text-lg"
                        placeholder="Describe your symptoms in detail... (e.g., I've been experiencing a persistent cough for 3 days, along with a runny nose and mild fever of 100.2°F)"
                        required
                      />
                      <div className="absolute bottom-4 right-4 text-white/40 text-sm">
                        {symptoms.length}/1000
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!symptoms.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-emerald-600 hover:via-teal-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-2xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white relative z-10"></div>
                        <span className="relative z-10">AI is analyzing your symptoms...</span>
                        <div className="flex space-x-1 relative z-10">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Brain className="w-6 h-6 relative z-10" />
                        <span className="relative z-10">Analyze with Advanced AI</span>
                        <Sparkles className="w-6 h-6 relative z-10" />
                      </>
                    )}
                  </button>
                </form>

                {/* Enhanced Results */}
                {results && (
                  <div className="mt-12 backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl p-8 border border-green-400/30 shadow-2xl">
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="bg-green-500 p-3 rounded-2xl shadow-xl">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">AI Analysis Complete</h3>
                        <p className="text-green-200">Processed using advanced machine learning algorithms</p>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                          <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
                          Probable Conditions
                        </h4>
                        <div className="space-y-4">
                          {results.conditions.map((condition, index) => (
                            <div key={index} className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h5 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                                    {condition.name}
                                  </h5>
                                  <p className="text-sm text-white/70 mt-1">{condition.description}</p>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                                  condition.severity === 'Low' ? 'bg-green-500/80 text-white' :
                                  condition.severity === 'Medium' ? 'bg-yellow-500/80 text-white' :
                                  'bg-red-500/80 text-white'
                                }`}>
                                  {condition.severity} Risk
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="flex-1 bg-white/20 rounded-full h-3 overflow-hidden">
                                  <div 
                                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-1000 shadow-lg" 
                                    style={{ width: `${condition.confidence}%` }}
                                  ></div>
                                </div>
                                <span className="text-lg font-bold text-white min-w-[60px]">{condition.confidence}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Heart className="w-6 h-6 mr-2 text-red-400" />
                            AI Recommendations
                          </h4>
                          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
                            <ul className="space-y-4">
                              {results.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start space-x-3 group">
                                  <div className="bg-green-500 p-1 rounded-full mt-1 group-hover:scale-110 transition-transform">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-white/90 group-hover:text-white transition-colors">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="backdrop-blur-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-6 border border-amber-400/30">
                          <div className="flex items-start space-x-3">
                            <div className="bg-amber-500 p-2 rounded-xl shadow-lg">
                              <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-lg font-bold text-white mb-2">Medical Disclaimer</p>
                              <p className="text-amber-100 text-sm leading-relaxed">
                                This AI analysis is for informational purposes only and should not replace professional medical advice. 
                                Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <div className="relative inline-block mb-6">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-6 rounded-3xl shadow-2xl">
                      <FileText className="w-20 h-20 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-400 w-8 h-8 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Smart <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Report Analysis</span>
                  </h2>
                  <p className="text-cyan-200/80 text-lg max-w-3xl mx-auto leading-relaxed">
                    Upload medical reports, lab results, or prescriptions. Our AI extracts key insights, 
                    summarizes findings, and identifies important patterns in your medical data.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative backdrop-blur-xl bg-white/10 border-2 border-dashed border-purple-400/50 rounded-3xl p-12 text-center hover:border-purple-400 hover:bg-white/15 transition-all duration-300">
                    <input
                      type="file"
                      id="report-upload"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => handleFileUpload(e, 'report')}
                      className="hidden"
                    />
                    <label htmlFor="report-upload" className="cursor-pointer block">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-3xl shadow-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <FileUp className="w-16 h-16 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-3">Upload Medical Reports</p>
                      <p className="text-purple-200 mb-6 text-lg">PDF, DOC, DOCX, TXT files up to 10MB</p>
                      <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 font-bold text-lg shadow-2xl">
                        Choose Files
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Imaging Tab */}
            {activeTab === 'imaging' && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <div className="relative inline-block mb-6">
                    <div className="bg-gradient-to-r from-orange-400 to-red-600 p-6 rounded-3xl shadow-2xl">
                      <Camera className="w-20 h-20 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-400 w-8 h-8 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Medical <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">Imaging AI</span>
                  </h2>
                  <p className="text-cyan-200/80 text-lg max-w-3xl mx-auto leading-relaxed">
                    Upload X-rays, CT scans, or MRI images for advanced AI-powered analysis. 
                    Our computer vision models detect anomalies, measure structures, and provide detailed insights.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative backdrop-blur-xl bg-white/10 border-2 border-dashed border-orange-400/50 rounded-3xl p-12 text-center hover:border-orange-400 hover:bg-white/15 transition-all duration-300">
                    <input
                      type="file"
                      id="imaging-upload"
                      multiple
                      accept=".jpg,.jpeg,.png,.dicom"
                      onChange={(e) => handleFileUpload(e, 'imaging')}
                      className="hidden"
                    />
                    <label htmlFor="imaging-upload" className="cursor-pointer block">
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-3xl shadow-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-16 h-16 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-3">Upload Medical Images</p>
                      <p className="text-orange-200 mb-6 text-lg">JPG, PNG, DICOM files up to 50MB</p>
                      <span className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 font-bold text-lg shadow-2xl">
                        Choose Images
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Uploaded Files Display */}
            {uploadedFiles.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-400" />
                  Uploaded Files ({uploadedFiles.length})
                </h3>
                <div className="grid gap-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-2xl shadow-lg ${
                            file.type === 'imaging' ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-purple-500 to-pink-600'
                          }`}>
                            {file.type === 'imaging' ? (
                              <Camera className="w-6 h-6 text-white" />
                            ) : (
                              <FileText className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">{file.name}</p>
                            <div className="flex items-center space-x-4 text-sm text-white/70">
                              <span>{formatFileSize(file.size)}</span>
                              <span className="px-2 py-1 bg-green-500/80 text-white rounded-full text-xs font-bold">
                                ✓ Uploaded
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-xl hover:bg-red-500/20 transition-all duration-200 group"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-8 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Brain className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Analyze with Advanced AI</span>
                  <Sparkles className="w-6 h-6 relative z-10" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Book Appointment</h3>
            </div>
            <p className="text-white/70 group-hover:text-white/90 transition-colors">Schedule a consultation with healthcare professionals</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Find Specialists</h3>
            </div>
                       <p className="text-white/70 group-hover:text-white/90 transition-colors">
              Schedule a consultation with healthcare professionals
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Health History</h3>
            </div>
            <p className="text-white/70 group-hover:text-white/90 transition-colors">
              Access and track your medical history and past reports
            </p>
          </div>
</div>
</div>
</div>
  )}
  export default SymptomChecker