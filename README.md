# Resume Analyzer

A Resume Analyzer web application that evaluates resumes using an ATS-inspired scoring system and provides actionable feedback to improve employability.

## Features

- Upload resumes in PDF format
- ATS score (0–100)
- Resume strengths
- Areas for improvement
- AI-generated recommendations
- Clean and responsive user interface

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### AI
- Google Gemini API

## Project Structure

```
resume-analyzer/
│
├── client/        # React frontend
├── server/        # Express backend
└── README.md
```

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd resume-analyzer
```

### Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

## Current Progress

- [x] Project setup
- [x] React + Vite setup
- [x] Express server setup
- [x] MongoDB configuration
- [ ] Resume upload
- [ ] PDF parsing
- [ ] ATS scoring
- [ ] Gemini AI integration
- [ ] Frontend UI
- [ ] Deployment

## Future Improvements

- Job Description matching
- Resume history
- Downloadable analysis report
- Authentication
- Dashboard

## License

This project is developed as part of a technical assignment for Solvrex Pvt. Ltd.