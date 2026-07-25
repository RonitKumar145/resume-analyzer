import {
    skillLibrary,
    degreeKeywords,
    techKeywords,
    actionWords
} from "../config/atsConfig.js";

// ==========================================
// PRE-COMPILED STATIC REGEX PATTERNS & DATA
// ==========================================
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const PHONE_REGEX = /(\+?\d{1,3}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/;
const LINKEDIN_REGEX = /linkedin\.com\/in\/[A-Za-z0-9_-]+/i;
const GITHUB_REGEX = /github\.com\/[A-Za-z0-9_-]+/i;
const PORTFOLIO_REGEX = /(portfolio|behance|dribbble|medium\.com|dev\.to)/i;

const CGPA_REGEX = /\b(cgpa|gpa)\s*[:\-]?\s*\d+(\.\d+)?/i;
const UNIVERSITY_REGEX = /([A-Z][A-Za-z.& ]+?(?:University|College|Institute|School))/i;

const JOB_REGEX = /\b(software engineer|software developer|frontend developer|backend developer|full stack developer|full-stack developer|web developer|mobile developer|android developer|ios developer|ai engineer|machine learning engineer|data scientist|data analyst|devops engineer|cloud engineer|qa engineer|associate software engineer|senior software engineer|lead developer|technical lead|intern|internship)\b/i;
const INTERN_REGEX = /intern/i;
const EXP_ENTRIES_REGEX = /(intern|developer|engineer|analyst|consultant)/gi;
const COMPANY_REGEX = /(?:at|@|\|)\s*([A-Z][A-Za-z0-9&().,\- ]+)/i;
const DURATION_REGEX = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}\b.*?(present|\d{4}|current|till date|today)?/i;
const METRIC_REGEX = /\b\d+%|\b\d+\+|\b\d+\s*(users|clients|projects|applications|days|months|years)\b/gi;

const LIVE_DEMO_REGEX = /(vercel|netlify|render|github\.io|firebaseapp|https:\/\/)/i;
const PROJECT_COUNT_REGEX = /(projects?|personal projects?|academic projects?)/gi;

// Pre-compile Skill Library patterns once at module load
const PRECOMPILED_SKILLS = skillLibrary.map(skill => ({
    name: skill.name,
    regexes: skill.patterns.map(pattern => {
        const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return new RegExp(`\\b${escaped}\\b`, "i");
    })
}));

// Pre-compiled lowercase keyword lookup lists
const LOWER_DEGREE_KEYWORDS = degreeKeywords.map(d => ({ raw: d, lower: d.toLowerCase() }));
const LOWER_TECH_KEYWORDS = techKeywords.map(t => ({ raw: t, lower: t.toLowerCase() }));
const LOWER_ACTION_WORDS = actionWords.map(w => ({ raw: w, lower: w.toLowerCase() }));

const CERTIFICATION_KEYWORDS = [
    "aws", "azure", "google cloud", "oracle", "ccna", "comptia", "kubernetes", "docker", "terraform", "tensorflow"
];

const ACHIEVEMENT_WORDS = [
    "award", "winner", "hackathon", "scholarship", "recognition", "certified", "finalist", "rank"
];

const SOFT_SKILLS = [
    "leadership", "communication", "teamwork", "problem solving", "critical thinking", "adaptability", "time management"
];

const LANGUAGE_KEYWORDS = [
    "english", "hindi", "telugu", "tamil", "kannada", "french", "german", "spanish"
];

const parseResume = (resumeText) => {
    const lowerCaseResume = resumeText.toLowerCase();

    const parsedResume = {
        contact: {
            email: resumeText.match(EMAIL_REGEX)?.[0] || null,
            phone: resumeText.match(PHONE_REGEX)?.[0] || null,
            linkedIn: resumeText.match(LINKEDIN_REGEX)?.[0] || null,
            github: resumeText.match(GITHUB_REGEX)?.[0] || null,
            portfolio: PORTFOLIO_REGEX.test(resumeText)
        },

        education: {
            degree: null,
            college: resumeText.match(UNIVERSITY_REGEX)?.[0] || null,
            cgpa: resumeText.match(CGPA_REGEX)?.[0] || null
        },

        skills: [],

        experience: {
            hasExperience: false,
            isInternship: false,
            totalExperienceEntries: 0,
            jobTitle: null,
            company: null,
            duration: null,
            technologies: [],
            actionWords: [],
            quantifiedAchievements: 0
        },

        projects: {
            github: false,
            liveDemo: LIVE_DEMO_REGEX.test(resumeText),
            technologies: [],
            count: 0
        },

        certifications: [],
        achievements: [],
        softSkills: [],
        languages: []
    };

    // Reset stateful global regex lastIndex for request safety
    EXP_ENTRIES_REGEX.lastIndex = 0;
    METRIC_REGEX.lastIndex = 0;
    PROJECT_COUNT_REGEX.lastIndex = 0;

    // EDUCATION
    LOWER_DEGREE_KEYWORDS.forEach(({ raw, lower }) => {
        if (lowerCaseResume.includes(lower)) {
            parsedResume.education.degree = raw;
        }
    });

    // SKILLS
    PRECOMPILED_SKILLS.forEach(skill => {
        const found = skill.regexes.some(regex => regex.test(lowerCaseResume));
        if (found) {
            parsedResume.skills.push(skill.name);
        }
    });

    // EXPERIENCE
    parsedResume.experience.jobTitle = resumeText.match(JOB_REGEX)?.[0] || null;
    parsedResume.experience.hasExperience = parsedResume.experience.jobTitle !== null;
    parsedResume.experience.isInternship = INTERN_REGEX.test(resumeText);

    const expMatches = resumeText.match(EXP_ENTRIES_REGEX);
    parsedResume.experience.totalExperienceEntries = expMatches ? expMatches.length : 0;

    parsedResume.experience.company = resumeText.match(COMPANY_REGEX)?.[1]?.trim() || null;
    parsedResume.experience.duration = resumeText.match(DURATION_REGEX)?.[0] || null;

    LOWER_TECH_KEYWORDS.forEach(({ raw, lower }) => {
        if (lowerCaseResume.includes(lower)) {
            parsedResume.experience.technologies.push(raw);
            parsedResume.projects.technologies.push(raw);
        }
    });

    LOWER_ACTION_WORDS.forEach(({ raw, lower }) => {
        if (lowerCaseResume.includes(lower)) {
            parsedResume.experience.actionWords.push(raw);
        }
    });

    const metricMatches = resumeText.match(METRIC_REGEX);
    parsedResume.experience.quantifiedAchievements = metricMatches ? metricMatches.length : 0;

    // PROJECTS
    parsedResume.projects.github = GITHUB_REGEX.test(resumeText);
    const projMatches = resumeText.match(PROJECT_COUNT_REGEX);
    parsedResume.projects.count = projMatches ? projMatches.length : 0;

    // CERTIFICATIONS
    CERTIFICATION_KEYWORDS.forEach(cert => {
        if (lowerCaseResume.includes(cert)) {
            parsedResume.certifications.push(cert);
        }
    });

    // ACHIEVEMENTS
    ACHIEVEMENT_WORDS.forEach(word => {
        if (lowerCaseResume.includes(word)) {
            parsedResume.achievements.push(word);
        }
    });

    // SOFT SKILLS
    SOFT_SKILLS.forEach(skill => {
        if (lowerCaseResume.includes(skill)) {
            parsedResume.softSkills.push(skill);
        }
    });

    // LANGUAGES
    LANGUAGE_KEYWORDS.forEach(language => {
        if (lowerCaseResume.includes(language)) {
            parsedResume.languages.push(language);
        }
    });

    return parsedResume;
};

export default parseResume;