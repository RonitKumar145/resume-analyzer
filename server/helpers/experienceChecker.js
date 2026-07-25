const checkExperience = (parsedResume) => {

    let score = 0;

    const details = {
        jobTitleFound: false,
        companyFound: false,
        durationFound: false,
        technologiesFound: [],
        actionWordsFound: 0,
        quantifiedAchievements: 0
    };

    const missingFields = [];

    const experience = parsedResume.experience;

    // Job Title (3)
    if (experience.jobTitle) {
        score += 3;
        details.jobTitleFound = true;
    } else {
        missingFields.push("Job Title");
    }

    // Company (2)
    if (experience.company) {
        score += 2;
        details.companyFound = true;
    } else {
        missingFields.push("Company Name");
    }

    // Duration (3)
    if (experience.duration) {
        score += 3;
        details.durationFound = true;
    } else {
        missingFields.push("Employment Duration");
    }

    // Technologies (6)
    details.technologiesFound = experience.technologies;

    const techCount = experience.technologies.length;

    if (techCount >= 8) {
        score += 6;
    } else if (techCount >= 6) {
        score += 5;
    } else if (techCount >= 4) {
        score += 4;
    } else if (techCount >= 2) {
        score += 3;
    } else if (techCount >= 1) {
        score += 2;
    } else {
        missingFields.push("Technology Stack");
    }

    // Action Verbs (3)
    details.actionWordsFound = experience.actionWords.length;

    if (experience.actionWords.length >= 6) {
        score += 3;
    } else if (experience.actionWords.length >= 3) {
        score += 2;
    } else if (experience.actionWords.length >= 1) {
        score += 1;
    } else {
        missingFields.push("Action Verbs");
    }

    // Quantified Achievements (6)
    details.quantifiedAchievements = experience.quantifiedAchievements;

    if (experience.quantifiedAchievements >= 4) {
        score += 6;
    } else if (experience.quantifiedAchievements >= 3) {
        score += 5;
    } else if (experience.quantifiedAchievements >= 2) {
        score += 4;
    } else if (experience.quantifiedAchievements === 1) {
        score += 2;
    } else {
        missingFields.push("Quantified Achievements");
    }

    return {
        score: Math.min(score, 20),
        details,
        missingFields
    };

};

export default checkExperience;