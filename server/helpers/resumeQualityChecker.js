const checkResumeQuality = (parsedResume) => {

    let score = 0;

    const details = {
        certifications: parsedResume.certifications.length,
        achievements: parsedResume.achievements.length,
        softSkills: parsedResume.softSkills.length,
        languages: parsedResume.languages.length,
        portfolio: parsedResume.contact.portfolio
    };

    const improvements = [];

    // Certifications (5)
    if (details.certifications >= 2) {

        score += 5;

    } else if (details.certifications === 1) {

        score += 3;

    } else {

        improvements.push("Add relevant certifications.");

    }

    // Achievements (5)
    if (details.achievements >= 2) {

        score += 5;

    } else if (details.achievements === 1) {

        score += 3;

    } else {

        improvements.push("Mention awards, hackathons or achievements.");

    }

    // Soft Skills (4)
    if (details.softSkills >= 5) {

        score += 4;

    } else if (details.softSkills >= 3) {

        score += 3;

    } else if (details.softSkills >= 1) {

        score += 2;

    } else {

        improvements.push("Include relevant soft skills.");

    }

    // Languages (3)
    if (details.languages >= 2) {

        score += 3;

    } else if (details.languages === 1) {

        score += 2;

    }

    // Portfolio (3)
    if (details.portfolio) {

        score += 3;

    } else {

        improvements.push("Add a portfolio website.");

    }

    return {

        score: Math.min(score,20),

        details,

        improvements

    };

};

export default checkResumeQuality;