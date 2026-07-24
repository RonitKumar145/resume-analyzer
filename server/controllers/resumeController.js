import fs from "fs/promises";

import extractResumeText from "../utils/extractResumeText.js";
import calculateATSScore from "../services/atsScore.js";
import parseJobDescription from "../helpers/jobDescriptionParser.js";
import compareResumeWithJob from "../helpers/resumeComparator.js";
import loadJobTemplate from "../helpers/loadJobTemplate.js";

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No resume was uploaded."
            });
        }

        const {
            jobDescription = "",
            selectedRole = ""
        } = req.body;

        // Extract resume text
        const resumeText = await extractResumeText(req.file.path);

        // Load selected role template or parse custom JD
        let parsedJob;

        if (selectedRole) {
            parsedJob = loadJobTemplate(selectedRole);
        } else {
            parsedJob = parseJobDescription(jobDescription);
        }

        // Calculate ATS Score
        const atsResult = calculateATSScore(
            resumeText,
            parsedJob.requiredSkills || []
        );

        // Compare resume with job
        const comparison = compareResumeWithJob(
            atsResult.parsedResume,
            parsedJob
        );

        // Delete uploaded file
        await fs.unlink(req.file.path);

        // Remove parsedResume before sending response
        const { parsedResume, ...finalATS } = atsResult;

        return res.status(200).json({
            success: true,
            message: "Resume uploaded and processed successfully.",
            selectedRole: parsedJob.title || "Custom Job Description",
            atsResult: finalATS,
            comparison
        });

    } catch (error) {

        console.error(error);

        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (err) {
                console.log("Unable to delete uploaded file.");
            }
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong while processing the resume."
        });
    }
};

export default uploadResume;