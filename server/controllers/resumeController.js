import fs from "fs/promises";

import extractResumeText from "../utils/extractResumeText.js";
import calculateATSScore from "../services/atsScore.js";
import parseJobDescription from "../helpers/jobDescriptionParser.js";
import compareResumeWithJob from "../helpers/resumeComparator.js";
import loadJobTemplate from "../helpers/loadJobTemplate.js";

const uploadResume = async (req, res) => {

    // Debug logs
    console.log("========== NEW REQUEST ==========");
    console.log("req.file:", req.file);

    try {

        if (!req.file) {

            console.log("No file received.");

            return res.status(400).json({
                success: false,
                message: "No resume was uploaded."
            });

        }

        const {
            jobDescription = "",
            selectedRole = ""
        } = req.body;

        console.log("Request Body:", req.body);
        console.log("Selected Role:", selectedRole);

        // Extract Resume Text
        const resumeText = await extractResumeText(req.file.path);

        let parsedJob;

        // Load predefined template or parse custom JD
        if (selectedRole) {

            console.log("Using predefined job template.");

            parsedJob = loadJobTemplate(selectedRole);

        } else {

            console.log("Using custom job description.");

            parsedJob = parseJobDescription(jobDescription);

        }

        console.log("Parsed Job:");
        console.log(parsedJob);

        // Calculate ATS Score
        const atsResult = calculateATSScore(
            resumeText,
            parsedJob.requiredSkills || []
        );

        // Compare Resume with Job
        const comparison = compareResumeWithJob(
            atsResult.parsedResume,
            parsedJob
        );

        // Delete uploaded resume
        await fs.unlink(req.file.path);

        // Remove parsedResume before sending response
        const { parsedResume, ...finalATS } = atsResult;

        console.log("Sending Success Response");

        return res.status(200).json({
            success: true,
            message: "Resume uploaded and processed successfully.",
            selectedRole: parsedJob.title || "Custom Job Description",
            atsResult: finalATS,
            comparison
        });

    } catch (error) {

        console.error("========== ERROR ==========");
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