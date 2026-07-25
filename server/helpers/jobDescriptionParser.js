import {
    skillLibrary,
    degreeKeywords
} from "../config/atsConfig.js";

const parseJobDescription = (jobDescription = "") => {

    const jd = jobDescription.toLowerCase();

    const parsedJob = {
        requiredSkills: [],
        preferredSkills: [],
        education: [],
        experience: null,
        responsibilities: [],
        keywords: []
    };

    // Extract Required Skills
    skillLibrary.forEach(skill => {

        const found = skill.patterns.some(pattern =>
            jd.includes(pattern.toLowerCase())
        );

        if (found) {
            parsedJob.requiredSkills.push(skill.name);
        }

    });

    // Extract Education
    degreeKeywords.forEach(degree => {

        if (jd.includes(degree.toLowerCase())) {
            parsedJob.education.push(degree);
        }

    });

    // Extract Experience
    const experienceRegex =
        /\b(\d+\+?|\d+\s*-\s*\d+)\s*(years?|yrs?)\b/i;

    const experienceMatch = jd.match(experienceRegex);

    if (experienceMatch) {
        parsedJob.experience = experienceMatch[0];
    }

    // Extract Responsibilities
    const responsibilityWords = [
        "develop",
        "design",
        "build",
        "implement",
        "optimize",
        "maintain",
        "deploy",
        "collaborate",
        "test",
        "debug",
        "integrate"
    ];

    responsibilityWords.forEach(word => {

        if (jd.includes(word)) {
            parsedJob.responsibilities.push(word);
        }

    });

    // Remove duplicates
    parsedJob.requiredSkills = [...new Set(parsedJob.requiredSkills)];
    parsedJob.education = [...new Set(parsedJob.education)];
    parsedJob.responsibilities = [...new Set(parsedJob.responsibilities)];

    // Create Keywords
    parsedJob.keywords = [
        ...parsedJob.requiredSkills,
        ...parsedJob.education,
        ...parsedJob.responsibilities
    ];

    return parsedJob;
};

export default parseJobDescription;