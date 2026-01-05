import { motion } from "framer-motion";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
            accept=".pdf,.doc,.docx"
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

          <h3 className="text-lg font-semibold mb-2">
            {file.name}
          </h3>

          <p className="text-gray-400 mb-6">
            {(file.size / 1024).toFixed(2)} KB
          </p>

          <button
            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition"
          >
            Analyze Resume
          </button>
        </>
      )}
    </motion.div>
  );
}

export default ResumeUpload;
