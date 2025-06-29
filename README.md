# Resume Editor Web App

A modern, web-based Resume Editor with a React (Vite) frontend and a FastAPI backend. Users can upload, edit, enhance (mock AI), save, and download resumes in a beautiful, user-friendly interface.

---

## Features

- **Upload**: Upload your resume (PDF/DOCX, parsing is mocked for demo).
- **Edit**: Modify all resume fields (name, summary, experience, education, skills, etc.) in a unified, card-based UI.
- **AI Enhancement**: Enhance summary, experience, education, and skills with a mock AI (calls backend for professionalization).
- **Save**: Save your resume (to backend, in-memory for demo).
- **Download**: Download your resume as a JSON file.
- **Modern UI**: Responsive, attractive design with gradients, icons, and smooth navigation.

---

## Project Structure

```
resume-editor-assignment/
  backend/      # FastAPI backend (Python)
    main.py
    README.md
    venv/       # Python virtual environment (optional)
  frontend/     # React + Vite frontend (JavaScript)
    src/
      components/  # React components (ResumeEditor, Stepper, etc.)
      styles/      # CSS Modules and global styles
      assets/      # Static assets (SVGs, etc.)
    public/        # Public assets
    package.json   # Frontend dependencies and scripts
    vite.config.js # Vite config
    README.md
```

---

## Setup Instructions

### 1. Backend (FastAPI)

#### Prerequisites
- Python 3.8+
- (Recommended) Create and activate a virtual environment:
  ```sh
  python -m venv venv
  venv\Scripts\activate  # On Windows
  # source venv/bin/activate  # On Mac/Linux
  ```

#### Install dependencies
```sh
pip install fastapi uvicorn python-multipart
```

#### Run the backend server
```sh
uvicorn main:app --reload
```
- API: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

#### Main Endpoints
- `POST /ai-enhance`: Enhance a resume section (mocked, professionalizes text)
- `POST /save-resume`: Save the resume JSON (in-memory)

---

### 2. Frontend (React + Vite)

#### Prerequisites
- Node.js (v18+ recommended)

#### Install dependencies
```sh
npm install
```

#### Run the frontend dev server
```sh
npm run dev
```
- App: [http://localhost:5173](http://localhost:5173)

---

## How It Works

- **Upload**: Select a PDF or DOCX file (parsing is mocked; loads a sample resume).
- **Edit**: All resume sections are editable in a single, unified interface.
- **Enhance**: Click "Enhance with AI" on summary, experience, education, or skills to get a more professional version (mocked by backend).
- **Save**: Saves the current resume to backend (in-memory).
- **Download**: Downloads the resume as a JSON file.

---

## Customization & Code

- **Backend**: See `backend/main.py` for FastAPI endpoints and mock AI logic.
- **Frontend**: See `frontend/src/components/ResumeEditor.jsx` for the main editor logic and UI.
- **Styling**: All styles are in `frontend/src/styles/` (CSS Modules and global CSS).

---

## Development Notes

- CORS is enabled for local frontend-backend communication.
- No persistent storage: resumes are stored in memory (for demo).
- AI enhancement is a mock (uses synonyms and adjectives for professionalization).

---
