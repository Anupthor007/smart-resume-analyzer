import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4">
          Smart Resume Analyzer
        </h1>
        <p className="text-lg text-gray-300">
          Analyze resumes. Match jobs. Get hired smarter.
        </p>
      </motion.div>
    </div>
  );
}
