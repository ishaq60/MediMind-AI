// import React, { useState } from "react";
"use client"
import {
  FileText,
  Activity,
  Brain,
  Stethoscope,
  Camera,
} from "lucide-react";
import Header from "./Header";
import Report from "./Report";
import ImagineFile from "./ImagineFile";
import UploadFiles from "./UploadFiles";
import Result from "./Result";
import { useState } from "react";

const SymptomChecker = () => {
  const [activeTab, setActiveTab] = useState("symptoms");
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResults] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSymptomSubmit = async () => {
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    setResults(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: symptoms }),
      });

      const data = await res.json();

      if (data?.reply) {
        setResults({ raw: data.reply });
      } else {
        setResults({ raw: "AI failed to respond properly." });
      }
    } catch (err) {
      setResults({ raw: "Something went wrong. Please try again." });
    }

    setIsAnalyzing(false);
  };

  const handleFileUpload = (event, type) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: type,
      size: file.size,
      file: file,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
console.log(result)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <Header />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: "symptoms", name: "Symptom Analysis", icon: Stethoscope },
                { id: "reports", name: "Medical Reports", icon: FileText },
                { id: "imaging", name: "Medical Imaging", icon: Camera },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                      group inline-flex items-center py-4 px-3 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200`}
                  >
                    <Icon
                      className={`${
                        activeTab === tab.id
                          ? "text-blue-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      } -ml-0.5 mr-2 h-5 w-5`}
                    />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "symptoms" && (
              <div className="space-y-2">
                <div className="text-center mb-8">
                  <Activity className="w-16 h-12 text-blue-500 mx-auto mb-2" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Describe Your Symptoms
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Tell us about what you're experiencing. Our AI will analyze
                    your symptoms and provide insights into possible conditions.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="symptoms"
                      className="block text-sm font-medium text-gray-700 mb-2"
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

             <Result result={result} />


              </div>
            )}

            {activeTab === "reports" && (
              <Report
                handleFileUpload={handleFileUpload}
                formatFileSize={formatFileSize}
              />
            )}

            {activeTab === "imaging" && (
              <ImagineFile handleFileUpload={handleFileUpload} />
            )}

            {uploadedFiles.length > 0 && (
              <UploadFiles
                uploadedFiles={uploadedFiles}
                formatFileSize={formatFileSize}
                removeFile={removeFile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
