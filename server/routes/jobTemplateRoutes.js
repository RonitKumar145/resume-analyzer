import express from "express";
import getJobRoles from "../controllers/jobTemplateController.js";

const router = express.Router();

router.get("/", getJobRoles);

export default router;