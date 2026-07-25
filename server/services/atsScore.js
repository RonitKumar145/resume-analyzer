import parseResume from "../helpers/resumeParser.js";

import checkContactInformation from "../helpers/contactChecker.js";
import checkEducation from "../helpers/educationChecker.js";
import checkSkills from "../helpers/skillsChecker.js";
import checkExperience from "../helpers/experienceChecker.js";
import checkProjects from "../helpers/projectChecker.js";
import checkResumeQuality from "../helpers/resumeQualityChecker.js";

const calculateATSScore = (
    resumeText,
    requiredSkills = [],
    targetRole = ""
) => {

    const parsedResume = parseResume(resumeText);

    const contact = checkContactInformation(parsedResume);
    const education = checkEducation(parsedResume);
    const skills = checkSkills(parsedResume, requiredSkills);
    const experience = checkExperience(parsedResume, targetRole, requiredSkills);
    const projects = checkProjects(parsedResume);
    const quality = checkResumeQuality(parsedResume);

    // Attach experience details to parsedResume for comparison helper
    parsedResume.experienceDetails = experience.details;

    /*
        ATS Score Weights
        -----------------
        Skills      : 35%
        Experience  : 25%
        Projects    : 15%
        Education   : 10%
        Contact     : 5%
        Quality     : 10%
    */

    const WEIGHTS = {
        contact: 5,
        education: 10,
        skills: 35,
        experience: 25,
        projects: 15,
        quality: 10,
    };

    const normalize = (score, maxScore, weight) =>
        (score / maxScore) * weight;

    const weightedBreakdown = {
        contact: Math.round(normalize(contact.score, 20, WEIGHTS.contact)),
        education: Math.round(normalize(education.score, 20, WEIGHTS.education)),
        skills: Math.round(normalize(skills.score, 20, WEIGHTS.skills)),
        experience: Math.round(normalize(experience.score, 20, WEIGHTS.experience)),
        projects: Math.round(normalize(projects.score, 20, WEIGHTS.projects)),
        quality: Math.round(normalize(quality.score, 20, WEIGHTS.quality)),
    };

    const totalScore =
        weightedBreakdown.contact +
        weightedBreakdown.education +
        weightedBreakdown.skills +
        weightedBreakdown.experience +
        weightedBreakdown.projects +
        weightedBreakdown.quality;

    let grade = "";

    if (totalScore >= 90) {
        grade = "Outstanding";
    } else if (totalScore >= 80) {
        grade = "Excellent";
    } else if (totalScore >= 65) {
        grade = "Good";
    } else if (totalScore >= 45) {
        grade = "Average";
    } else {
        grade = "Poor";
    }

    const strengths = [];
    const improvements = [];

    // Contact
    if (contact.score >= 18) {
        strengths.push("Complete contact information");
    } else {
        improvements.push(...contact.missingFields);
    }

    // Education
    if (education.score >= 15) {
        strengths.push("Strong education section");
    } else {
        improvements.push(...education.missingFields);
    }

    // Skills
    if (skills.jobMatch >= 80) {
        strengths.push("Excellent skill match for the job");
    } else if (skills.jobMatch >= 60) {
        strengths.push("Relevant technical skills");
    } else {
        improvements.push("Improve technical skills to better match the job description.");
    }

    if (skills.missingSkills.length) {
        improvements.push(
            `Missing skills: ${skills.missingSkills.join(", ")}`
        );
    }

    // Experience
    if (experience.score >= 16) {
        strengths.push("Strong and relevant work experience");
    } else if (experience.score >= 12) {
        strengths.push("Good work experience");
    } else {
        improvements.push(...experience.missingFields);
    }

    // Projects
    if (projects.score >= 15) {
        strengths.push("Strong projects");
    } else {
        improvements.push(...projects.missingFields);
    }

    // Resume Quality
    if (quality.score >= 15) {
        strengths.push("Excellent overall resume quality");
    } else {
        improvements.push(...quality.improvements);
    }

    return {
        score: totalScore,
        grade,
        breakdown: weightedBreakdown,
        strengths,
        improvements,
        parsedResume,
        rawExperienceScore: experience.score,
        experienceDetails: experience.details
    };

};

export default calculateATSScore;