const TECH_ROLE_KEYWORDS = [
    "developer", "engineer", "architect", "programmer", "analyst",
    "administrator", "specialist", "consultant", "lead", "manager"
];

const checkExperience = (parsedResume, targetRole = "", requiredSkills = []) => {
    let roleRelevanceScore = 0; // Max 10 points (50%)
    let techContextScore = 0;   // Max 10 points (50%)

    const missingFields = [];
    const experience = parsedResume?.experience || {};
    const candidateJobTitle = (experience.jobTitle || "").toLowerCase().trim();

    // ----------------------------------------------------
    // 1. Target Role Relevance (50% = 10 pts max)
    // ----------------------------------------------------
    const targetLower = targetRole.toLowerCase().trim();

    if (candidateJobTitle && targetLower) {
        // Extract domain terms from targetRole (excluding generic terms like developer/engineer)
        const targetTokens = targetLower
            .replace(/[\(\)\/\-]/g, " ")
            .split(/\s+/)
            .filter(t => t.length > 2 && !["developer", "engineer", "manager", "lead", "custom", "job", "description"].includes(t));

        const hasDomainMatch = targetTokens.some(token => candidateJobTitle.includes(token));
        const isGenericTechRole = TECH_ROLE_KEYWORDS.some(k => candidateJobTitle.includes(k));

        if (hasDomainMatch || candidateJobTitle === targetLower) {
            // Full points for direct/strongly relevant role match
            roleRelevanceScore = 10;
        } else if (isGenericTechRole) {
            // Partial points for related/adjacent tech roles
            roleRelevanceScore = 5;
        } else {
            // Unrelated role
            roleRelevanceScore = 0;
            missingFields.push("Target Role Relevance in Experience");
        }
    } else if (candidateJobTitle) {
        const isTechRole = TECH_ROLE_KEYWORDS.some(k => candidateJobTitle.includes(k));
        roleRelevanceScore = isTechRole ? 8 : 2;
    } else {
        roleRelevanceScore = 0;
        missingFields.push("Relevant Job Title in Experience");
    }

    // ----------------------------------------------------
    // 2. Tools & Tech Stack Context (50% = 10 pts max)
    // ----------------------------------------------------
    const candidateTechs = (experience.technologies || []).map(t => t.toLowerCase());
    const candidateSkills = (parsedResume?.skills || []).map(s => s.toLowerCase());

    const allCandidateTech = Array.from(new Set([...candidateTechs, ...candidateSkills]));

    if (requiredSkills.length > 0) {
        const matchedTechInContext = requiredSkills.filter(reqSkill => {
            const reqLower = reqSkill.toLowerCase().trim();
            return allCandidateTech.some(candTech => candTech.includes(reqLower) || reqLower.includes(candTech));
        });

        const matchCount = matchedTechInContext.length;

        if (matchCount >= 4) {
            techContextScore = 10;
        } else if (matchCount === 3) {
            techContextScore = 8;
        } else if (matchCount === 2) {
            techContextScore = 5;
        } else if (matchCount === 1) {
            techContextScore = 3;
        } else {
            techContextScore = 0;
            missingFields.push("Target Tech Stack in Experience");
        }
    } else {
        if (candidateTechs.length >= 6) {
            techContextScore = 10;
        } else if (candidateTechs.length >= 4) {
            techContextScore = 7;
        } else if (candidateTechs.length >= 2) {
            techContextScore = 4;
        } else if (candidateTechs.length >= 1) {
            techContextScore = 2;
        } else {
            techContextScore = 0;
            missingFields.push("Technology Stack in Experience");
        }
    }

    // ----------------------------------------------------
    // Total Experience Score (Max 20)
    // ----------------------------------------------------
    const totalScore = Math.min(roleRelevanceScore + techContextScore, 20);

    const details = {
        jobTitleFound: !!candidateJobTitle,
        companyFound: !!experience.company,
        durationFound: !!experience.duration,
        roleRelevanceScore,
        techContextScore,
        technologiesFound: experience.technologies || [],
        actionWordsFound: (experience.actionWords || []).length,
        quantifiedAchievements: experience.quantifiedAchievements || 0
    };

    return {
        score: totalScore,
        details,
        missingFields
    };
};

export default checkExperience;