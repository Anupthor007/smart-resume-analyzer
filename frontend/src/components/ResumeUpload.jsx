import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  }

  async function handleAnalyze() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div className="border-2 border-dashed border-gray-700 rounded-2xl p-10 bg-gray-900">
      {!file ? (
        <>
          <Upload className="mx-auto mb-4 text-blue-500" size={40} />
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </>
      ) : (
        <>
          <FileText className="mx-auto mb-2 text-green-500" size={36} />
          <p className="text-sm text-gray-300 mb-4">{file.name}</p>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-6 py-2 bg-green-600 rounded-lg"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

          {result && (
            <div className="mt-6">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <CheckCircle size={18} /> Extracted Skills
              </div>

              <div className="flex flex-wrap gap-2">
                {result.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-red-400 mt-4">{error}</p>}
        </>
      )}
    </motion.div>
  );
}

export default ResumeUpload;
