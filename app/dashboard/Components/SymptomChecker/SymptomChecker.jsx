"use client";

import { FileText, Activity, Brain, Stethoscope, Camera } from "lucide-react";
import Header from "./Header";
import Report from "./Report";
import ImagineFile from "./ImagineFile";
import UploadFiles from "./UploadFiles";
import Result from "./Result";
import { useEffect, useState } from "react";
import SyndromParagrph from "./SyndromParagrph";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const SymptomChecker = () => {
  const session=useSession()
  const [isAnalyzingFiles, setIsAnalyzingFiles] = useState(false);
  const [activeTab, setActiveTab] = useState("symptoms");
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResults] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // ✅ FORMAT FILE SIZE
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // ✅ HELPER FUNCTION TO DETECT FILE TYPE
  const getFileType = (file) => {
    const fileType = file.type.toLowerCase();
    if (fileType.startsWith('image/')) return 'image';
    if (fileType === 'application/pdf') return 'pdf';
    if (fileType.includes('document') || fileType.includes('word')) return 'document';
    return 'other';
  };

  // ✅ SYMPTOM SUBMIT HANDLER
  const handleSymptomSubmit = async () => {
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    setResults(null);

    const structuredPrompt = `
You are a caring and professional medical AI assistant.

A patient reports the following symptoms:
${symptoms}

Please respond with a clear, stepwise explanation that includes:

1. A short empathetic introduction acknowledging the symptoms.
2. A bulleted list of common possible causes, with key terms in **bold**.
3. A bulleted list of practical at-home care tips under the heading "**While you wait to see a doctor, you can try:**".
4. A bulleted list of serious warning signs under the heading "**However, please seek immediate medical attention if you experience:**".
5. A polite conclusion advising the patient to consult a healthcare professional.

Use bullet points for lists, and bold key terms for emphasis.
`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: structuredPrompt }),
      });

      const data = await res.json();

      if (data?.reply || data?.response) {
        setResults({ raw: data.reply || data.response });
      } else {
        setResults({ raw: "AI failed to respond properly." });
      }
    } catch (err) {
      setResults({ raw: "Something went wrong. Please try again." });
    }

    setIsAnalyzing(false);
  };

  // ✅ UNIFIED FILE UPLOAD HANDLER
  const handleFileUpload = async (event, tabType) => {
    const files = Array.from(event.target.files);

    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: getFileType(file), // Use actual file type detection
      tabType: tabType, // Keep track of which tab uploaded it
      size: file.size,
      file: file,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Auto-analyze if it's an image upload
    if (tabType === "imaging") {
      await handleAnalyzeImages(newFiles);
    }
  };

  // ✅ IMAGE ANALYSIS HANDLER
  const handleAnalyzeImages = async (imagesToAnalyze = null) => {
    const imageFiles = imagesToAnalyze || uploadedFiles.filter((file) => file.type === "image");
    
    if (imageFiles.length === 0) return;

    setIsAnalyzingFiles(true);
    if (!imagesToAnalyze) setResults(null); // Only clear results if analyzing existing files

    const structuredPrompt = `
You are a medical imaging expert AI.

Analyze the uploaded medical image and describe:

1. The visible anatomical features.
2. Any abnormal findings or areas of concern (e.g. fractures, tumors, inflammation).
3. The possible medical implications.
4. A disclaimer that the analysis is not a substitute for professional diagnosis.
`;

    for (const file of imageFiles) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Data = reader.result?.split(",")[1];

        if (!base64Data || base64Data.length < 50) {
          setResults((prev) => ({
            raw: (prev?.raw || "") + `\n🖼️ ${file.name}: Invalid or empty image file.`,
          }));
          return;
        }

        try {
          const res = await fetch("/api/x-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: structuredPrompt,
              base64: base64Data,
              fileName: file.name,
            }),
          });

          const data = await res.json();

          if (data?.response) {
            setResults((prev) => ({
              raw: (prev?.raw || "") + `\n🖼️ ${file.name}:\n${data.response}`,
            }));
          } else {
            setResults((prev) => ({
              raw: (prev?.raw || "") + `\n🖼️ ${file.name}: No response from AI.`,
            }));
          }
        } catch (err) {
          console.error("❌ Image analysis error:", err);
          setResults((prev) => ({
            raw: (prev?.raw || "") + `\n🖼️ ${file.name}: Something went wrong.`,
          }));
        }
      };

      reader.readAsDataURL(file.file);
    }

    setIsAnalyzingFiles(false);
  };

  // ✅ REMOVE FILE HANDLER
  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  // ✅ PDF/DOCUMENT ANALYSIS
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAnalyzeFiles = async () => {
    const documentFiles = uploadedFiles.filter((file) => 
      file.type === "pdf" || file.type === "document"
    );
    
    if (documentFiles.length === 0) return;

    setIsAnalyzingFiles(true);
    setResults(null);

    const structuredPrompt = `
You are a caring and professional medical AI assistant.

Analyze this medical document and provide:

1. A summary of the key findings
2. Any diagnoses or conditions mentioned
3. Recommended treatments or medications
4. Important dates or follow-up requirements
5. Any concerning findings that need attention

Please format your response clearly with sections and bullet points.
`;

    for (const file of documentFiles) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Data = reader.result?.split(",")[1];

        if (!base64Data || base64Data.length < 50) {
          setResults((prev) => ({
            raw: (prev?.raw || "") + `\n📄 ${file.name}: File is empty or corrupted.`,
          }));
          return;
        }

        try {
          await delay(1000); // Small delay to prevent overwhelming the API

          const res = await fetch("/api/pdf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: structuredPrompt,
              base64: base64Data,
              fileName: file.name,
            }),
          });

          const data = await res.json();

          if (data?.response) {
            setResults((prev) => ({
              raw: (prev?.raw || "") + `\n📄 ${file.name}:\n${data.response}`,
            }));
          } else {
            setResults((prev) => ({
              raw: (prev?.raw || "") + `\n📄 ${file.name}: No response from AI.`,
            }));
          }
        } catch (err) {
          console.error("❌ Document analysis error:", err);
          setResults((prev) => ({
            raw: (prev?.raw || "") + `\n📄 ${file.name}: Something went wrong.`,
          }));
        }
      };

      reader.readAsDataURL(file.file);
    }

    setIsAnalyzingFiles(false);
  };

//post result







  const [savedReportId, setSavedReportId] = useState(null);

  useEffect(() => {
    if (typeof result?.raw === "string" && result.raw.trim() !== "") {
      // Use a unique identifier for the report you want to save,
      // for example, a hash of the report text or a timestamp.
      // Here, we'll just use the raw text for simplicity.
      const reportId = result.raw;

      // If this report was already saved, skip saving again
      if (savedReportId === reportId) {
        console.log("Report already saved, skipping.");
        return;
      }

      const reportData = {
        user: session?.data?.user?.email || "anonymous",
        report: result.raw,
        createdAt: new Date().toISOString(),
      };

      const saveReport = async () => {
        try {
          const response = await fetch("/api/report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reportData),
          });

          const data = await response.json();

          if (response.ok) {
            toast.success("Report saved successfully!");
            setSavedReportId(reportId); // mark this report as saved
            console.log("Server response:", data);
          } else {
            toast.error("Something went wrong: " + data.error);
          }
        } catch (error) {
          console.error("Report saving error:", error);
          toast.error("Something went wrong while saving report.");
        }
      };

      saveReport();
    } else {
      console.log("No valid report data to save.");
    }
  }, [result, session, savedReportId]);






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
              <SyndromParagrph
                handleSymptomSubmit={handleSymptomSubmit}
                result={result}
                setSymptoms={setSymptoms}
                isAnalyzing={isAnalyzing}
                symptoms={symptoms}
              />
            )}

            {activeTab === "reports" && (
              <Report
                handleFileUpload={(event) => handleFileUpload(event, "reports")}
                formatFileSize={formatFileSize}
              />
            )}

            {activeTab === "imaging" && (
              <ImagineFile
                uploadedFiles={uploadedFiles.filter(f => f.type === "image")}
                handleFileUpload={(event) => handleFileUpload(event, "imaging")}
                handleAnalyzeImages={() => handleAnalyzeImages()}
                result={result}
                isAnalyzingFiles={isAnalyzingFiles}
              />
            )}

            {/* Show uploaded files section for non-image files */}
            {uploadedFiles.filter(f => f.type !== "image").length > 0 && (
              <UploadFiles
                result={result}
                uploadedFiles={uploadedFiles.filter(f => f.type !== "image")}
                removeFile={removeFile}
                formatFileSize={formatFileSize}
                handleAnalyzeFiles={handleAnalyzeFiles}
                isAnalyzingFiles={isAnalyzingFiles}
              />
            )}

            {/* Show results */}
            {result && <Result result={result} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;