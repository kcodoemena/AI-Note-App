# AI-Powered Notes App

## Description
A local full-stack notes app with NLP sentiment analysis.

## Features
- Create and view notes
- Analyze note sentiment (positive, neutral, negative)
- SQLite storage
- API Key authentication
- Docker support

## How to Run

### Locally
```bash
pip install -r requirements.txt
python -m textblob.download_corpora
uvicorn app.main:app --reload
```

### With Docker
```bash
docker build -t notes-app .
docker run -d -p 8000:8000 notes-app
```

## Endpoints
- POST /notes
- GET /notes
- GET /notes/{id}/analyze

Include header: `x-api-key: mysecretkey`
