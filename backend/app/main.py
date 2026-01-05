from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Smart Resume Analyzer API",
    version="1.0.0"
)

# Allow frontend to talk to backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is running successfully"
    }

@app.post("/analyze")
async def analyze_resume(resume: UploadFile = File(...)):
    return {
        "filename": resume.filename,
        "content_type": resume.content_type,
        "message": "Resume received successfully (analysis coming next)"
    }
