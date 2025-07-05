import { Camera, Upload } from "lucide-react";
import React from "react";
import Result from "./Result";

const ImagineFile = ({ handleFileUpload,hanadleimage, result }) => {
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
            accept=".jpg,.jpeg,.png,.dicom"
            onChange={(e) => handleFileUpload(e, "image")}
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
      </div>

      <Result result={result} />
    </div>
  );
};

export default ImagineFile;
