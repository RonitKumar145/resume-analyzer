# Resume Analyzer & ATS Score Checker

A full-stack Resume Analyzer developed as part of the **Solvrex Pvt. Ltd. Technical Assignment**. The application evaluates resumes using a **rule-based Applicant Tracking System (ATS)** by extracting text from PDF resumes, parsing key sections, calculating an ATS score, and comparing the resume against either a custom job description or predefined Software & IT job templates.

---

## Features

- Upload resumes in PDF format
- Automatic PDF text extraction
- Rule-based ATS score (0–100)
- Resume parsing into structured sections
- Resume vs Job Description comparison
- Support for predefined Software & IT job roles
- Support for custom job descriptions
- ATS score breakdown
- Resume strengths and improvement suggestions
- RESTful API built with Express.js

---

## Supported Job Roles

The application currently supports the following predefined roles:

- Software Engineer
- Frontend Engineer
- Backend Engineer
- Full Stack Engineer
- MERN Stack Developer
- React Developer
- Node.js Developer
- Java Developer
- Python Developer
- QA Engineer
- DevOps Engineer
- Cloud Engineer
- Android Developer
- iOS Developer
- Data Analyst
- Data Scientist
- ML Engineer
- AI Engineer
- UI/UX Designer
- Product Manager

---

## Tech Stack

### Frontend *(In Progress)*

- React.js
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Multer
- pdf-parse

### Database

- MongoDB Atlas

---

## Project Structure

```text
resume-analyzer/
│
├── client/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── helpers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/RonitKumar145/resume-analyzer.git
```

```bash
cd resume-analyzer
```

### Install Dependencies

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

---

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## Run the Application

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

## API Endpoints

### Upload Resume

```http
POST /api/resume/upload
```

#### Request Body

| Field | Type | Required |
|-------|------|----------|
| resume | PDF File | Yes |
| selectedRole | String | Optional |
| jobDescription | String | Optional |

Provide either:

- `selectedRole`
- or `jobDescription`

---

### Get Available Job Roles

```http
GET /api/job-roles
```

Returns all supported predefined Software & IT job roles.

---

## ATS Evaluation

The ATS engine evaluates resumes based on:

- Contact Information
- Education
- Technical Skills
- Work Experience
- Projects

The generated report includes:

- ATS Score
- Grade
- Score Breakdown
- Resume Strengths
- Improvement Suggestions
- Resume vs Job Match Percentage

---

## Current Progress

### Backend

- ✅ Resume Upload
- ✅ PDF Text Extraction
- ✅ Resume Parser
- ✅ Rule-Based ATS Scoring
- ✅ Resume vs Job Description Matching
- ✅ Software & IT Job Templates
- ✅ Dynamic Job Role Selection API

### Frontend

- ⏳ Resume Upload Interface
- ⏳ ATS Dashboard
- ⏳ Results Visualization

---

## Future Enhancements

- Role-aware ATS scoring
- Interactive dashboard
- Resume history
- Authentication
- Deployment
- Optional AI-powered resume suggestions

---

## Assignment

This project was developed as part of the **Solvrex Pvt. Ltd. Technical Assignment** to demonstrate backend development, REST API design, resume parsing, and rule-based ATS evaluation using the MERN stack.

---

## Author

**Ronit Kumar**

GitHub: https://github.com/RonitKumar145

---
