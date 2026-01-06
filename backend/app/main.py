from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
import io
import re

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

SKILL_SET = [
    "python", "java", "c++", "javascript", "react", "node",
    "fastapi", "flask", "django",
    "machine learning", "deep learning", "nlp",
    "sql", "mysql", "postgresql",
    "mongodb", "git", "github",
    "docker", "aws", "linux"
]

@app.get("/health")
def health_check():
    return {"status": "ok"}

def extract_text_from_pdf(file_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text
    return text.lower()

def extract_skills(text: str):
    found_skills = set()
    for skill in SKILL_SET:
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text):
            found_skills.add(skill)
    return sorted(found_skills)

@app.post("/analyze")
async def analyze_resume(resume: UploadFile = File(...)):
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files supported")

    file_bytes = await resume.read()
    text = extract_text_from_pdf(file_bytes)
    skills = extract_skills(text)

    return {
        "filename": resume.filename,
        "skills": skills,
        "skills_count": len(skills),
        "preview": text[:500]
    }
