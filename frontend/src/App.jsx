import { motion } from "framer-motion";
import ResumeUpload from "./components/ResumeUpload";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Smart Resume Analyzer</h1>
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center mt-24 px-6"
      >
        <h2 className="text-5xl font-extrabold mb-6">
          Analyze Resumes <br /> Like a Pro
        </h2>

        <p className="text-gray-400 max-w-xl mb-8">
          Upload your resume, match it with job descriptions, and get instant
          insights powered by AI.
        </p>

        <div className="mt-10 w-full max-w-lg">
          <ResumeUpload />
        </div>
      </motion.section>
    </div>
  );
}

export default App;
