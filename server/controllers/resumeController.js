import extractResumeText from "../utils/extractResumeText.js";
import calculateATSScore from "../services/atsScore.js";
import parseJobDescription from "../helpers/jobDescriptionParser.js";
import compareResumeWithJob from "../helpers/resumeComparator.js";
import loadJobTemplate from "../helpers/loadJobTemplate.js";

const uploadResume = async (req, res) => {
    console.log("========== NEW RESUME UPLOAD REQUEST ==========");

    try {
        if (!req.file || !req.file.buffer) {
            console.log("No file buffer received.");
            return res.status(400).json({
                success: false,
                message: "No valid PDF resume was uploaded."
            });
        }

        const {
            jobDescription = "",
            selectedRole = ""
        } = req.body;

        console.log("Selected Role:", selectedRole);
        console.log("File Info:", req.file.originalname, `(${req.file.size} bytes)`);

        // Extract Resume Text from Memory Buffer
        const resumeText = await extractResumeText(req.file.buffer);

        let parsedJob;

        // Load predefined template or parse custom JD
        if (selectedRole) {
            console.log("Using predefined job template for:", selectedRole);
            parsedJob = loadJobTemplate(selectedRole);
        } else {
            console.log("Parsing custom job description.");
            parsedJob = parseJobDescription(jobDescription);
        }

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

        // Remove parsedResume before sending response
        const { parsedResume, ...finalATS } = atsResult;

        console.log("Resume processing successful!");

        return res.status(200).json({
            success: true,
            message: "Resume uploaded and processed successfully.",
            selectedRole: parsedJob.title || "Custom Job Description",
            atsResult: finalATS,
            comparison
        });

    } catch (error) {
        console.error("========== ERROR PROCESSING RESUME ==========");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong while processing the resume."
        });
    }
};

export default uploadResume;