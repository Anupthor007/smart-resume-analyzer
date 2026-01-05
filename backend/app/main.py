from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
import io

app = FastAPI(
    title="Smart Resume Analyzer API",
    version="1.0.0"
)

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

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return text.strip()

@app.post("/analyze")
async def analyze_resume(resume: UploadFile = File(...)):
    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF resumes are supported for now"
        )

    file_bytes = await resume.read()
    extracted_text = extract_text_from_pdf(file_bytes)

    return {
        "filename": resume.filename,
        "text_length": len(extracted_text),
        "preview": extracted_text[:500],
        "message": "Resume text extracted successfully"
    }
