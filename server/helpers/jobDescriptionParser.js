import {
    skillLibrary,
    degreeKeywords
} from "../config/atsConfig.js";

const EXPERIENCE_REGEX = /\b(\d+\+?|\d+\s*-\s*\d+)\s*(years?|yrs?)\b/i;

const PRECOMPILED_JD_SKILLS = skillLibrary.map(skill => ({
    name: skill.name,
    lowerPatterns: skill.patterns.map(p => p.toLowerCase())
}));

const PRECOMPILED_JD_DEGREES = degreeKeywords.map(d => ({
    raw: d,
    lower: d.toLowerCase()
}));

const RESPONSIBILITY_WORDS = [
    "develop", "design", "build", "implement", "optimize",
    "maintain", "deploy", "collaborate", "test", "debug", "integrate"
];

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
    PRECOMPILED_JD_SKILLS.forEach(skill => {
        if (skill.lowerPatterns.some(pattern => jd.includes(pattern))) {
            parsedJob.requiredSkills.push(skill.name);
        }
    });

    // Extract Education
    PRECOMPILED_JD_DEGREES.forEach(({ raw, lower }) => {
        if (jd.includes(lower)) {
            parsedJob.education.push(raw);
        }
    });

    // Extract Experience
    const experienceMatch = jd.match(EXPERIENCE_REGEX);
    if (experienceMatch) {
        parsedJob.experience = experienceMatch[0];
    }

    // Extract Responsibilities
    RESPONSIBILITY_WORDS.forEach(word => {
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