// ImagineFile.js
import { Camera, Upload, Brain } from "lucide-react";
import React from "react";

const ImagineFile = ({ 
  uploadedFiles, 
  handleFileUpload, 
  handleAnalyzeImages, 
  result, 
  isAnalyzingFiles 
}) => {
  return (
    <div>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <Camera className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Medical Imaging Analysis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload X-rays, CT scans, or MRI images for AI-powered analysis and anomaly detection.
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-indigo-400 transition-colors duration-200">
          <input
            type="file"
            id="imaging-upload"
            multiple
            accept="image/*,.jpg,.jpeg,.png,.dicom"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label htmlFor="imaging-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Upload Medical Images</p>
            <p className="text-sm text-gray-500 mb-4">JPG, PNG, DICOM files up to 50MB</p>
            <span className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              Choose Images
            </span>
          </label>
        </div>

        {/* Show uploaded image files */}
        {uploadedFiles && uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Uploaded Images
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Camera className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown size'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Manual analyze button for existing images */}
            <button
              onClick={handleAnalyzeImages}
              disabled={isAnalyzingFiles}
              className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzingFiles ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing Images...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>Analyze Images</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagineFile;