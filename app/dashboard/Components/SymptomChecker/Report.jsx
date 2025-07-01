import { FileText, FileUp } from 'lucide-react';
import React from 'react';

const Report = ({handleFileUpload,FileText}) => {
    return (
        <div>
             <div className="space-y-6">
                <div className="text-center mb-8">
                  <FileText className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Medical Reports</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Upload your medical reports, lab results, or prescriptions. Our AI will analyze and summarize the content.
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors duration-200">
                  <input
                    type="file"
                    id="report-upload"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => handleFileUpload(e, 'report')}
                    className="hidden"
                  />
                  <label htmlFor="report-upload" className="cursor-pointer">
                    <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">Upload Medical Reports</p>
                    <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX, TXT files up to 10MB</p>
                    <span className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                      Choose Files
                    </span>
                  </label>
                </div>
              </div>
        </div>
    );
};

export default Report;