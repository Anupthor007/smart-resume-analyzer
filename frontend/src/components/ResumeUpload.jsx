import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
      setExpanded(false);
    }
  }

  async function handleAnalyze() {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center bg-gray-900 hover:border-blue-500 transition"
    >
      {!file ? (
        <>
          <Upload className="mx-auto mb-4 text-blue-500" size={40} />
          <h3 className="text-xl font-semibold mb-2">
            Upload your resume
          </h3>
          <p className="text-gray-400 mb-4">
            Drag & drop your resume here, or click to browse
          </p>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            id="resume-upload"
            onChange={handleFileChange}
          />

          <label
            htmlFor="resume-upload"
            className="inline-block px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 cursor-pointer transition"
          >
            Browse File
          </label>
        </>
      ) : (
        <>
          <FileText className="mx-auto mb-4 text-green-500" size={40} />

          <h3 className="text-lg font-semibold mb-1">
            {file.name}
          </h3>

          <p className="text-gray-400 mb-4">
            {(file.size / 1024).toFixed(2)} KB
          </p>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto transition
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </button>

          {/* RESULT */}
          {result && (
            <div className="mt-6 text-left bg-gray-800 p-5 rounded-xl">
              <div className="flex items-center gap-2 text-green-400 mb-3">
                <CheckCircle size={18} />
                <span className="font-semibold">Extracted Resume Text</span>
              </div>

              <div
                className={`text-sm text-gray-300 whitespace-pre-line overflow-hidden ${
                  expanded ? "max-h-[500px]" : "max-h-40"
                }`}
              >
                {result.preview || "No text extracted from resume."}
              </div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 text-blue-400 flex items-center gap-1 hover:underline"
              >
                {expanded ? (
                  <>
                    Show less <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-red-400 text-sm">
              {error}
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}

export default ResumeUpload;
