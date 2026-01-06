import { useState } from "react";
import { Loader2 } from "lucide-react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleAnalyze() {
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jd);

    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="bg-gray-900 p-8 rounded-2xl space-y-6">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <textarea
        placeholder="Paste Job Description here..."
        className="w-full p-3 rounded-lg bg-gray-800 text-white"
        rows={5}
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="px-6 py-2 bg-green-600 rounded-lg"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Analyze Match"}
      </button>

      {result && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">
            Match Score: {result.match_score}%
          </h3>

          <div>
            <h4 className="font-semibold text-green-400">Matched Skills</h4>
            <div className="flex flex-wrap gap-2">
              {result.matched_skills.map((s) => (
                <span key={s} className="px-3 py-1 bg-green-600/20 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-red-400">Missing Skills</h4>
            <div className="flex flex-wrap gap-2">
              {result.missing_skills.map((s) => (
                <span key={s} className="px-3 py-1 bg-red-600/20 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
