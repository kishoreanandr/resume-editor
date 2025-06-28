# FastAPI Backend for Resume Editor

## Setup

1. Create and activate a virtual environment (if not already done):
   ```sh
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On Mac/Linux
   ```

2. Install dependencies:
   ```sh
   pip install fastapi uvicorn python-multipart
   ```

## Running the Backend

Start the FastAPI server with:
```sh
uvicorn main:app --reload
```

- The API will be available at: http://127.0.0.1:8000
- Interactive docs: http://127.0.0.1:8000/docs

## Endpoints
- `POST /ai-enhance`: Enhance a resume section (mocked)
- `POST /save-resume`: Save the resume JSON (in memory) 