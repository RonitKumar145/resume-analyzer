import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import resumeRoutes from "./routes/resumeRoutes.js"
import jobTemplateRoutes from "./routes/jobTemplateRoutes.js";

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/resume", resumeRoutes)
app.use("/api/job-roles", jobTemplateRoutes);
app.get("/", (req,res) => {

    res.send("Resume Analyzer API Running...")

})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`)

})