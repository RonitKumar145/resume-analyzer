import {
    skillLibrary,
    degreeKeywords,
    techKeywords,
    actionWords
} from "../config/atsConfig.js";

const parseResume = (resumeText) => {

    const lowerCaseResume = resumeText.toLowerCase();

    const parsedResume = {

        contact: {
            email: null,
            phone: null,
            linkedIn: null,
            github: null,
            portfolio: false
        },

        education: {
            degree: null,
            college: null,
            cgpa: null
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
            liveDemo: false,
            technologies: [],
            count: 0
        },

        certifications: [],
        achievements: [],
        softSkills: [],
        languages: []

    };

    // ===========================
    // CONTACT
    // ===========================

    const emailRegex =
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

    const phoneRegex =
        /(\+?\d{1,3}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/;

    const linkedInRegex =
        /linkedin\.com\/in\/[A-Za-z0-9_-]+/i;

    const githubRegex =
        /github\.com\/[A-Za-z0-9_-]+/i;

    parsedResume.contact.email =
        resumeText.match(emailRegex)?.[0] || null;

    parsedResume.contact.phone =
        resumeText.match(phoneRegex)?.[0] || null;

    parsedResume.contact.linkedIn =
        resumeText.match(linkedInRegex)?.[0] || null;

    parsedResume.contact.github =
        resumeText.match(githubRegex)?.[0] || null;

    parsedResume.contact.portfolio =
        /(portfolio|behance|dribbble|medium\.com|dev\.to)/i.test(resumeText);

    // ===========================
    // EDUCATION
    // ===========================

    degreeKeywords.forEach(degree => {

        if (lowerCaseResume.includes(degree.toLowerCase())) {

            parsedResume.education.degree = degree;

        }

    });

    const cgpaRegex =
        /\b(cgpa|gpa)\s*[:\-]?\s*\d+(\.\d+)?/i;

    parsedResume.education.cgpa =
        resumeText.match(cgpaRegex)?.[0] || null;

    const universityRegex =
        /([A-Z][A-Za-z.& ]+?(University|College|Institute|School))/g;

    parsedResume.education.college =
        resumeText.match(universityRegex)?.[0] || null;

    // ===========================
    // SKILLS
    // ===========================

    skillLibrary.forEach(skill => {

        const found = skill.patterns.some(pattern => {

            const escaped = pattern.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            const regex =
                new RegExp(`\\b${escaped}\\b`, "i");

            return regex.test(lowerCaseResume);

        });

        if (found) {

            parsedResume.skills.push(skill.name);

        }

    });

    // ===========================
    // EXPERIENCE
    // ===========================

    const jobRegex =
        /\b(software engineer|software developer|frontend developer|backend developer|full stack developer|full-stack developer|web developer|mobile developer|android developer|ios developer|ai engineer|machine learning engineer|data scientist|data analyst|devops engineer|cloud engineer|qa engineer|associate software engineer|senior software engineer|lead developer|technical lead|intern|internship)\b/i;

    parsedResume.experience.jobTitle =
        resumeText.match(jobRegex)?.[0] || null;

    parsedResume.experience.hasExperience =
        parsedResume.experience.jobTitle !== null;

    parsedResume.experience.isInternship =
        /intern/i.test(resumeText);

    parsedResume.experience.totalExperienceEntries =
        (
            resumeText.match(
                /(intern|developer|engineer|analyst|consultant)/gi
            ) || []
        ).length;

    const companyRegex =
        /(?:at|@|\|)\s*([A-Z][A-Za-z0-9&().,\- ]+)/i;

    parsedResume.experience.company =
        resumeText.match(companyRegex)?.[1]?.trim() || null;

    const durationRegex =
        /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}\b.*?(present|\d{4}|current|till date|today)?/i;

    parsedResume.experience.duration =
        resumeText.match(durationRegex)?.[0] || null;

    techKeywords.forEach(skill => {

        if (lowerCaseResume.includes(skill.toLowerCase())) {

            parsedResume.experience.technologies.push(skill);

            parsedResume.projects.technologies.push(skill);

        }

    });

    actionWords.forEach(word => {

        if (lowerCaseResume.includes(word.toLowerCase())) {

            parsedResume.experience.actionWords.push(word);

        }

    });

    const metricRegex =
        /\b\d+%|\b\d+\+|\b\d+\s*(users|clients|projects|applications|days|months|years)\b/gi;

    parsedResume.experience.quantifiedAchievements =
        (resumeText.match(metricRegex) || []).length;

    // ===========================
    // PROJECTS
    // ===========================

    parsedResume.projects.github =
        githubRegex.test(resumeText);

    parsedResume.projects.liveDemo =
        /(vercel|netlify|render|github\.io|firebaseapp|https:\/\/)/i.test(resumeText);

    const projectRegex =
        /(projects?|personal projects?|academic projects?)/gi;

    parsedResume.projects.count =
        (resumeText.match(projectRegex) || []).length;

    // ===========================
    // CERTIFICATIONS
    // ===========================

    const certificationKeywords = [
        "aws",
        "azure",
        "google cloud",
        "oracle",
        "ccna",
        "comptia",
        "kubernetes",
        "docker",
        "terraform",
        "tensorflow"
    ];

    certificationKeywords.forEach(cert => {

        if (lowerCaseResume.includes(cert)) {

            parsedResume.certifications.push(cert);

        }

    });

    // ===========================
    // ACHIEVEMENTS
    // ===========================

    const achievementWords = [
        "award",
        "winner",
        "hackathon",
        "scholarship",
        "recognition",
        "certified",
        "finalist",
        "rank"
    ];

    achievementWords.forEach(word => {

        if (lowerCaseResume.includes(word)) {

            parsedResume.achievements.push(word);

        }

    });

    // ===========================
    // SOFT SKILLS
    // ===========================

    const softSkills = [
        "leadership",
        "communication",
        "teamwork",
        "problem solving",
        "critical thinking",
        "adaptability",
        "time management"
    ];

    softSkills.forEach(skill => {

        if (lowerCaseResume.includes(skill)) {

            parsedResume.softSkills.push(skill);

        }

    });

    // ===========================
    // LANGUAGES
    // ===========================

    const languageKeywords = [
        "english",
        "hindi",
        "telugu",
        "tamil",
        "kannada",
        "french",
        "german",
        "spanish"
    ];

    languageKeywords.forEach(language => {

        if (lowerCaseResume.includes(language)) {

            parsedResume.languages.push(language);

        }

    });

    return parsedResume;

};

export default parseResume;