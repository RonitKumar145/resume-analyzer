import extractResumeText from "../utils/extractResumeText.js";
import calculateATSScore from "../services/atsScore.js";
import parseJobDescription from "../helpers/jobDescriptionParser.js";
import compareResumeWithJob from "../helpers/resumeComparator.js";
import loadJobTemplate from "../helpers/loadJobTemplate.js";

const uploadResume = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({
                success: false,
                message: "No valid PDF resume was uploaded."
            });
        }

        const {
            jobDescription = "",
            selectedRole = ""
        } = req.body;

        // Extract Resume Text from Memory Buffer (capping to 3 pages)
        const resumeText = await extractResumeText(req.file.buffer);

        let parsedJob;

        // Load predefined template or parse custom JD
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

        // Compare Resume with Job
        const comparison = compareResumeWithJob(
            atsResult.parsedResume,
            parsedJob
        );

        // Remove parsedResume internal structure before sending response
        const { parsedResume, ...finalATS } = atsResult;

        const responsePayload = {
            success: true,
            message: "Resume uploaded and processed successfully.",
            selectedRole: parsedJob.title || "Custom Job Description",
            atsResult: finalATS,
            comparison
        };

        // Send HTTP JSON response immediately to client (sub-1.5s performance)
        res.status(200).json(responsePayload);

        // Fire-and-forget async background logging/analytics if needed:
        // logAnalysisToDatabase(responsePayload).catch(dbErr => {
        //     console.error("Background DB logging failed:", dbErr.message);
        // });

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