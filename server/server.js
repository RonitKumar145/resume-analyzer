import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import resumeRoutes from "./routes/resumeRoutes.js"
import jobTemplateRoutes from "./routes/jobTemplateRoutes.js";

dotenv.config()

connectDB()

const app = express()

const allowedOrigins = [
    "https://resume-analyzer-ronit-three.vercel.app",
    "https://resume-analyzer-coral-three.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const cleanOrigin = origin.trim().replace(/\/$/, "");
        const isAllowed = allowedOrigins.some(o => o.trim().replace(/\/$/, "") === cleanOrigin);

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    optionsSuccessStatus: 200,
};

// Enable CORS middleware for all routes (automatically handles preflight OPTIONS requests)
app.use(cors(corsOptions));

app.use(express.json())

// Support both /api/* routes and direct root path aliases (/job-roles, /resume)
app.use("/api/resume", resumeRoutes)
app.use("/resume", resumeRoutes)

app.use("/api/job-roles", jobTemplateRoutes);
app.use("/job-roles", jobTemplateRoutes);

app.get("/", (req, res) => {
    res.send("Resume Analyzer API Running...")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})