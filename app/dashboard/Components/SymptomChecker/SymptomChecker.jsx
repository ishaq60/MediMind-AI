// export default SymptomChecker;
"use client";

import { FileText, Activity, Brain, Stethoscope, Camera } from "lucide-react";
import Header from "./Header";
import Report from "./Report";
import ImagineFile from "./ImagineFile";
import UploadFiles from "./UploadFiles";
import Result from "./Result";
import { useState } from "react";
import SyndromParagrph from "./SyndromParagrph";

const SymptomChecker = () => {
  const [isAnalyzingFiles, setIsAnalyzingFiles] = useState(false);

  const [activeTab, setActiveTab] = useState("symptoms");
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResults] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedFileimage, setUploadedFileimage] = useState([]);

  // ✅ FORMAT FILE SIZE
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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

  // ✅ FILE UPLOAD
  // const handleFileUpload = (event, type) => {
  //   const files = Array.from(event.target.files);
  //   const newFiles = files.map((file) => ({
  //     id: Date.now() + Math.random(),
  //     name: file.name,
  //     type: type,
  //     size: file.size,
  //     file: file,
  //   }));
  //   setUploadedFiles((prev) => [...prev, ...newFiles]);
  // };
const handleFileUpload = async (event, type) => {
  const files = Array.from(event.target.files);

  const newFiles = files.map((file) => ({
    id: Date.now() + Math.random(),
    name: file.name,
    type: type,
    size: file.size,
    file: file,
  }));

  setUploadedFiles((prev) => [...prev, ...newFiles]);
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

  for (const file of newFiles) {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Data = reader.result?.split(",")[1];

      if (!base64Data || base64Data.length < 50) {
        setResults((prev) => ({
          raw: (prev?.raw || "") + `\n\n📄 ${file.name}: File is empty or corrupted.`,
        }));
        return;
      }

      try {
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
            raw: (prev?.raw || "") + `\n\n📄 ${file.name}:\n${data.response}`,
          }));
        } else {
          setResults((prev) => ({
            raw: (prev?.raw || "") + `\n\n📄 ${file.name}: No response from AI.`,
          }));
        }
      } catch (err) {
        console.error("❌ AI analysis error:", err);
        setResults((prev) => ({
          raw: (prev?.raw || "") + `\n\n📄 ${file.name}: Something went wrong.`,
        }));
      }
    };

    reader.readAsDataURL(file.file);
  }

  setIsAnalyzing(false);
};

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  // ✅ PDF ANALYSIS
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAnalyzeFiles = async () => {
    if (uploadedFiles.length === 0) return;

    setIsAnalyzingFiles(true); // 🟡 Start loading
    setResults(null);

    for (const file of uploadedFiles) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];

        try {
          await delay(7000);

          const res = await fetch("/api/pdf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: `Summarize this medical document: ${file.name}`,
              base64: base64Data,
              fileName: file.name,
            }),
          });

          const data = await res.json();
          setResults((prev) => ({
            raw:
              (prev?.raw || "") +
              `\n\n📄 ${file.name}:\n` +
              (data.response || "Failed"),
          }));
        } catch (error) {
          console.error("AI analysis error:", error);
          setResults((prev) => ({
            raw:
              (prev?.raw || "") + `\n\n📄 ${file.name}:\nSomething went wrong.`,
          }));
        }
      };

      reader.readAsDataURL(file.file);
    }

    setIsAnalyzingFiles(false); // 🟢 Stop loading
  };

// const handaleImageFile=async()=>{
//  if (uploadedFiles.length === 0) return;

//     setIsAnalyzingFiles(true); // 🟡 Start loading
//     setResults(null);
// }
const handaleImageFile = async () => {
  if (uploadedFileimage.length === 0) return;

  setIsAnalyzingFiles(true);
  setResults(null);

  const imageFiles = uploadedFileimage.filter((file) =>
    file.type === "image"
  );

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


  console.log(result);
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



{/* chat/Messsage */}
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
                handleFileUpload={handleFileUpload}
                formatFileSize={formatFileSize}
              />
            )}



{/* Image */}


            {activeTab === "imaging" && (
              
              <ImagineFile uploadedFiles={uploadedFiles}
  handleFileUpload={handleFileUpload}
  handaleImageFile={handaleImageFile}
  result={result} />
            )}





{/* pdf/Doc */}
            {uploadedFiles.length > 0 && (
              <UploadFiles
               result={result}
                uploadedFiles={uploadedFiles}
                removeFile={removeFile}
                formatFileSize={formatFileSize}
                handleFileUpload={handleFileUpload}
             handleAnalyzeFiles={handleAnalyzeFiles}
                isAnalyzingFiles={isAnalyzingFiles} // ✅ add this
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
