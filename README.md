# AI-Powered Notes App

A local full-stack notes app with NLP-based sentiment analysis.

## Features
- Create and list notes
- Analyze sentiment (positive, neutral, negative)
- SQLite for storage
- API key protection
- Docker support

## Running Locally
```bash
docker build -t notes-app .
docker run -d -p 8000:8000 -e API_KEY=mysecretkey notes-app
