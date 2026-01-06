from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
import io
import re
from typing import List

app = FastAPI(title="Smart Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

def extract_text_from_pdf(file_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        if page.extract_text():
            text += page.extract_text()
    return text.lower()

def extract_skills(text: str) -> List[str]:
    found = set()
    for skill in SKILL_SET:
        if re.search(rf"\b{re.escape(skill)}\b", text):
            found.add(skill)
    return sorted(found)

def match_skills(resume_skills: List[str], jd_skills: List[str]):
    matched = list(set(resume_skills) & set(jd_skills))
    missing = list(set(jd_skills) - set(resume_skills))
    score = round((len(matched) / len(jd_skills)) * 100, 2) if jd_skills else 0

    return matched, missing, score

@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = ""
):
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF resumes supported")

    file_bytes = await resume.read()
    resume_text = extract_text_from_pdf(file_bytes)

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description.lower())

    matched, missing, score = match_skills(resume_skills, jd_skills)

    return {
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "matched_skills": matched,
        "missing_skills": missing,
        "match_score": score
    }
