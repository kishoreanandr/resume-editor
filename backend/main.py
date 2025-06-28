from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import re

app = FastAPI()

# Allow CORS for frontend (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# In-memory storage for resume data
resume_storage = {}

class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class SaveResumeRequest(BaseModel):
    resume: Dict[str, Any]

# Refined professional replacements
synonyms = {
    'experienced': 'highly experienced',
    'developer': 'software development professional',
    'passion': 'strong passion',
    'building': 'architecting',
    'impactful': 'strategically impactful',
    'company': 'leading organization',
    'role': 'professional role',
    'years': 'extensive years',
    'school': 'reputed academic institution',
    'degree': 'recognized academic qualification',
    'skills': 'core competencies',
    'worked': 'collaborated effectively',
    'created': 'developed and deployed',
    'led': 'successfully led',
    'team': 'cross-functional team',
    'project': 'strategic project',
    'summary': 'executive summary',
    'education': 'educational background',
    'experience': 'career experience',
    'python': 'Python (advanced proficiency)',
    'javascript': 'JavaScript (strong command)',
    'react': 'React.js (production-level experience)',
    'handling': 'managing',
    'designed': 'conceptualized and designed',
    'implemented': 'successfully implemented',
    'tested': 'rigorously tested',
    'solved': 'proactively resolved',
    'certification': 'professional certification',
    'certified': 'professionally certified',
    'language': 'language proficiency',
    'native': 'native fluency',
    'intermediate': 'intermediate proficiency',
    'advanced': 'advanced proficiency',
    'reference': 'professional reference',
    'linkedin': 'LinkedIn profile',
    'github': 'GitHub repository',
    'platform': 'comprehensive platform',
    'solution': 'innovative solution',
    'application': 'enterprise application',
    'website': 'professional website',
    'mobile': 'mobile application',
    'web': 'web application',
    'database': 'database management',
    'api': 'RESTful API',
    'cloud': 'cloud infrastructure',
    'aws': 'Amazon Web Services',
    'azure': 'Microsoft Azure',
    'docker': 'Docker containerization',
    'kubernetes': 'Kubernetes orchestration',
}

# Strong adjectives to add polish
impressive_adjectives = [
    'exceptional', 'outstanding', 'visionary', 'strategic', 'proactive', 'dedicated', 'innovative'
]

def enhance_text(text: str) -> str:
    # Replace words with more professional synonyms
    def replace(match):
        word = match.group(0)
        lower = word.lower()
        if lower in synonyms:
            replacement = synonyms[lower]
            # Preserve capitalization
            if word[0].isupper():
                replacement = replacement[0].upper() + replacement[1:]
            return replacement
        return word

    enhanced = re.sub(r'\b\w+\b', replace, text)

    # Add a professional adjective at the beginning only for short descriptions
    if len(enhanced.split()) < 30 and not any(adj in enhanced.lower() for adj in impressive_adjectives):
        enhanced = f"{impressive_adjectives[0].capitalize()} {enhanced}"

    return enhanced

@app.post("/ai-enhance")
def ai_enhance(request: AIEnhanceRequest):
    improved_content = enhance_text(request.content)
    return {"section": request.section, "improved_content": improved_content}

@app.post("/save-resume")
def save_resume(request: SaveResumeRequest):
    resume_storage['resume'] = request.resume
    return {"status": "success", "message": "Resume saved."}
