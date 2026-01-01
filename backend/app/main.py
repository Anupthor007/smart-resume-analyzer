from fastapi import FastAPI

app = FastAPI(
    title="Smart Resume Analyzer API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Smart Resume Analyzer backend is running 🚀"}
