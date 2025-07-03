import { Brain, Camera, FileText, X } from "lucide-react";
import React from "react";
import Result from "./Result";

const UploadFiles = ({
  uploadedFiles,
  removeFile,
  formatFileSize,
  onAnalyzeFiles,
  isAnalyzingFiles,
   handleAnalyzeFiles,
  result = { result }
}) => {
  return (
    <div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Uploaded Files
        </h3>
        <div className="space-y-3">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  {file.type === "imaging" ? (
                    <Camera className="w-5 h-5 text-blue-600" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* <button
  onClick={handleSymptomSubmit}
  disabled={!symptoms.trim() || isAnalyzing}
  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
</button> */}
        <button
          onClick={handleAnalyzeFiles}
          disabled={isAnalyzingFiles}
          className="mt-4 w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzingFiles ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-50"></div>
              <span>Analyzing Files...</span>
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              <span>Analyze Uploaded File</span>
              <h1 className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></h1>
            </>
          )}
        </button>
      </div>
      <Result result={result} ></Result>
    </div>
  
  );
};

export default UploadFiles;
