#  Resume Analyzer

A full-stack **Resume Analyzer** developed as part of the **Solvrex Pvt. Ltd. Technical Assignment**. The application evaluates resumes using a **rule-based Applicant Tracking System (ATS)** by extracting text from PDF resumes, parsing key sections, calculating a weighted ATS score, and comparing the resume against either a **custom job description** or **predefined Software & IT job roles**. It generates a comprehensive ATS report with score breakdown, strengths, weaknesses, skill analysis, and personalized recommendations through an interactive dashboard.

---

## Live Demo & Links

- 🌐 **Live Web Application:** [https://resume-analyzer-coral-three.vercel.app/](https://resume-analyzer-coral-three.vercel.app/)
- ⚡ **Backend REST API:** [https://resume-analyzer-api-c2vm.onrender.com/](https://resume-analyzer-api-c2vm.onrender.com/)

---

## 📸 Application Preview

<p align="center">
  <img src="./assets/Screenshot%20(216).png" alt="Resume Analyzer Interface" width="100%" style="border-radius: 8px;">
</p>

---

##  Table of Contents

- [Live Demo & Links](#-live-demo--links)
- [Application Preview](#-application-preview)
- [Features](#-features)

- [Supported Job Roles](#-supported-job-roles)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [My Approach](#-my-approach)
- [Engineering Decisions](#-engineering-decisions--thought-process)
- [Scoring Methodology](#-scoring-methodology)

- [Assumptions Made](#-assumptions-made)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---


#  Features

##  Resume Analysis

- Upload resumes in PDF format
- Automatic PDF text extraction
- Resume parsing into structured sections
- Contact information extraction
- Education extraction
- Skills extraction
- Work experience extraction
- Projects extraction
- Resume quality analysis

---

##  ATS Evaluation

- ATS Score (0–100)
- Resume Grade
- Weighted Score Breakdown
- Resume Strengths
- Weaknesses
- Actionable Recommendations

---

##  Job Matching

- Compare against predefined Software & IT job roles
- Support for custom Job Descriptions
- Overall Job Match Percentage
- Skill Match Percentage
- Matched Skills
- Missing Skills

---

##  Interactive Dashboard

- Circular ATS Score
- Progress Breakdown
- Strength Cards
- Skills Analysis
- Recommendations Panel
- Responsive UI

---

#  Supported Job Roles

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
- Machine Learning Engineer
- AI Engineer
- UI/UX Designer
- Product Manager

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- Multer (In-Memory Buffer Storage)
- pdfjs-dist / pdf-parse

## Database

- MongoDB Atlas

## Optimization & Performance

- Sub-1.5s Processing Latency (In-Memory Buffer Pipeline)
- Pre-Compiled Static Regex Patterns & Skill Dictionaries
- 3-Page Max Extraction Limit
- Non-Blocking Asynchronous DB Operations
- 5MB Strict Size Limit & PDF Mimetype Enforcement

## Deployment

- **Frontend (Vercel):** [https://resume-analyzer-coral-three.vercel.app/](https://resume-analyzer-coral-three.vercel.app/)
- **Backend (Render):** [https://resume-analyzer-api-c2vm.onrender.com/](https://resume-analyzer-api-c2vm.onrender.com/)
- **Database:** MongoDB Atlas



---

# 🏛 Project Architecture

```text
                 React Frontend
                        │
                        │
                 Upload Resume (PDF)
                        │
                        ▼
               Express.js REST API
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
     PDF Text Extraction        Job Role / JD
        (pdf-parse)               Selection
          │                           │
          └─────────────┬─────────────┘
                        ▼
                 Resume Parser
                        │
                        ▼
               ATS Scoring Engine
                        │
                        ▼
             Resume vs Job Comparison
                        │
                        ▼
              Analysis Response (JSON)
                        │
                        ▼
                React Dashboard
```

---

#  My Approach

The application follows a modular MERN architecture where every stage of resume processing is handled independently.

## Frontend

The React frontend focuses on providing a clean and intuitive user experience.

Users can:

- Upload a PDF resume
- Select a predefined Software & IT job role
- Or enter a custom job description

The resume is uploaded using **multipart/form-data** through Axios and sent to the Express backend.

Once processing is complete, the frontend renders an interactive dashboard displaying:

- ATS Score
- Grade
- Overall Job Match
- Score Breakdown
- Strengths
- Weaknesses
- Matched Skills
- Missing Skills
- Recommendations

The UI is built using reusable React components to improve maintainability and scalability.

---

## Backend

The backend is responsible for all resume processing.

Processing Pipeline

```text
Upload Resume
      │
      ▼
Extract PDF Text
      │
      ▼
Parse Resume
      │
      ▼
Calculate ATS Score
      │
      ▼
Compare Resume with Job Description
      │
      ▼
Generate Analysis Report
```

The uploaded resume is processed in RAM using **in-memory buffers (`multer.memoryStorage`)** and parsed via high-performance PDF extraction capped to a **maximum of 3 pages**.

### High-Performance Backend Optimizations
- **In-Memory Storage Buffer**: Eliminates ephemeral disk I/O latency completely for cloud platforms (Render/Vercel).
- **Pre-Compiled Regex Engine**: Static patterns (emails, phones, links, degrees, job titles) and skill library dictionaries are pre-compiled at server load time rather than re-instantiated on every request.
- **Non-Blocking Architecture**: HTTP JSON analysis response is returned immediately to the client (<1.5s target execution) while offloading background logging asynchronously.
- **Strict Guardrails**: Enforces a 5MB maximum file limit and `application/pdf` mimetype validation with clean error boundaries.

The extracted content is converted into structured data containing:


- Contact Information
- Education
- Skills
- Experience
- Projects
- Certifications
- Languages
- Achievements

Each module evaluates a specific part of the resume independently, making the application easier to maintain, test, and extend.

This modular architecture also allows additional evaluation criteria to be introduced without affecting existing functionality.

---

##  Engineering Decisions & Thought Process

- **Deterministic Rule-Based Framework over External LLMs:** Rather than wrapping a 3rd-party LLM API (which introduces latency, API cost dependencies, rate limits, and non-deterministic scoring variations), I engineered a deterministic rule-based evaluation framework. This guarantees sub-1.5s execution, predictable and explainable scoring, and complete privacy for candidate resume data.
- **In-Memory Parsing & Performance Optimization:** To optimize the application for serverless and cloud platforms like Render/Vercel, the backend processes PDF buffers directly in memory (`multer.memoryStorage`) with pre-compiled regex dictionaries and 3-page max parsing limits, eliminating ephemeral disk I/O bottlenecks and keeping analysis times under 1.5 seconds.

---

#  Scoring Methodology


The ATS score is generated using a **deterministic rule-based evaluation engine** instead of relying entirely on external AI services.

The total score is calculated out of **100** using weighted evaluation categories.

| Category | Weight |
|----------|--------|
| Skills | 35 |
| Experience | 25 |
| Projects | 15 |
| Education | 10 |
| Resume Quality | 10 |
| Contact Information | 5 |

---

## Skills (35%)

Evaluates:

- Relevant technical skills
- Job-role skill matching
- Number of required skills
- Skill completeness

---

## Experience (25%)

Evaluates:

- Relevant job titles
- Technologies used
- Quantifiable achievements
- Action verbs
- Experience duration

---

## Projects (15%)

Evaluates:

- Technical complexity
- Technologies mentioned
- Project descriptions
- Project completeness

---

## Education (10%)

Evaluates:

- Degree
- Institution
- Academic information

---

## Resume Quality (10%)

Evaluates:

- Certifications
- Achievements
- Languages
- Portfolio links
- Resume completeness

---

## Contact Information (5%)

Checks for:

- Email
- Phone Number
- LinkedIn
- GitHub

---

This rule-based methodology provides consistent, explainable, and transparent ATS scores while avoiding dependence on external AI APIs.

---

#  Assumptions Made

During development, the following assumptions were made:

- Resumes are uploaded in PDF format.
- Uploaded PDFs contain selectable text rather than scanned images.
- Resumes are primarily written in English.
- Standard resume section headings such as **Education**, **Skills**, **Experience**, and **Projects** are used.
- Contact information is available near the beginning of the resume.
- Technical skills are explicitly mentioned within dedicated Skills sections or project descriptions.
- Users are applying for Software & IT related roles.
- ATS scoring is intended as guidance and not as a replacement for human recruiter evaluation.

---

# 📁 Project Structure

```text
resume-analyzer/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
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

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/RonitKumar145/resume-analyzer.git

cd resume-analyzer
```

---

## Install Dependencies

### Frontend

```bash
cd client

npm install
```

### Backend

```bash
cd ../server

npm install
```

---

# 🔐 Environment Variables

## Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Frontend (.env)

```env
VITE_API_URL=your_api_url
```

---

# ▶ Running the Application

## Backend

```bash
cd server

npm run dev
```

---

## Frontend

```bash
cd client

npm run dev
```

---

#  API Endpoints

## Upload Resume

```http
POST /api/resume/upload
```

### Form Data

| Field | Required |
|------|----------|
| resume | ✅ |
| selectedRole | Optional |
| jobDescription | Optional |

Provide either:

- selectedRole

or

- jobDescription

---

## Get Available Job Roles

```http
GET /api/job-roles
```

Returns all supported predefined Software & IT job roles.

---

#  Future Improvements

The project can be extended with several additional features:

- AI-powered resume rewriting suggestions
- Resume history and saved analyses
- User authentication and profiles
- Resume comparison between multiple versions
- Downloadable PDF reports
- OCR support for scanned resumes
- Advanced NLP for contextual resume understanding
- Grammar and readability analysis
- Industry-specific ATS scoring models
- Keyword optimization suggestions
- Resume ranking across multiple applicants
- Analytics dashboard for recruiters

---

# 👨‍💻 Author

**Ronit Kumar**

GitHub: https://github.com/RonitKumar145



---

## ⭐ If you found this project useful, consider giving it a star!