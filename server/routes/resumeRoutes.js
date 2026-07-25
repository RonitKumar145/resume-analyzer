import express from "express"

import { handleResumeUpload } from "../middleware/uploadMiddleware.js"
import uploadResume from "../controllers/resumeController.js"

const router = express.Router()

router.post("/upload", handleResumeUpload, uploadResume)

export default router