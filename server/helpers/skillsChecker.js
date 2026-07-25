const checkSkills = (parsedResume, requiredSkills = []) => {

    let score = 0;

    const matchedSkills = parsedResume.skills || [];

    const missingSkills = [];

    requiredSkills.forEach(skill => {

        const found = matchedSkills.some(
            resumeSkill =>
                resumeSkill.toLowerCase() === skill.toLowerCase()
        );

        if (!found) {
            missingSkills.push(skill);
        }

    });

    const matchedRequired =
        requiredSkills.length - missingSkills.length;

    const jobMatch = requiredSkills.length
        ? Math.round((matchedRequired / requiredSkills.length) * 100)
        : 100;

    // Job Match (12 points)
    score += Math.round((jobMatch / 100) * 12);

    // Resume Skill Count (5 points)
    if (matchedSkills.length >= 15) {
        score += 5;
    } else if (matchedSkills.length >= 10) {
        score += 4;
    } else if (matchedSkills.length >= 7) {
        score += 3;
    } else if (matchedSkills.length >= 4) {
        score += 2;
    } else if (matchedSkills.length >= 2) {
        score += 1;
    }

    // Perfect Match Bonus (3 points)
    if (requiredSkills.length && missingSkills.length === 0) {
        score += 3;
    }

    score = Math.min(score, 20);

    return {
        score,

        details: {
            matchedSkills,
            totalSkills: matchedSkills.length,
            matchedRequired,
            requiredSkills: requiredSkills.length,
        },

        missingSkills,
        jobMatch,
    };

};

export default checkSkills;