const compareResumeWithJob = (parsedResume, parsedJob) => {

    const comparison = {

        overallMatch: 0,

        skillMatch: 0,

        educationMatch: false,

        experienceMatch: false,

        matchedSkills: [],

        missingSkills: [],

        strengths: [],

        weaknesses: [],

        recommendations: []

    };

    const resumeSkills = parsedResume.skills || [];
    const requiredSkills = parsedJob.requiredSkills || [];

    let matchedSkillCount = 0;

    requiredSkills.forEach(skill => {

        const found = resumeSkills.some(
            resumeSkill =>
                resumeSkill.toLowerCase() === skill.toLowerCase()
        );

        if (found) {

            comparison.matchedSkills.push(skill);
            matchedSkillCount++;

        } else {

            comparison.missingSkills.push(skill);

        }

    });

    comparison.skillMatch = requiredSkills.length
        ? Math.round((matchedSkillCount / requiredSkills.length) * 100)
        : 100;

    comparison.educationMatch =
        parsedJob.education.length === 0 ||
        !!parsedResume.education.degree;

    comparison.experienceMatch =
        parsedJob.experience === null ||
        !!parsedResume.experience.jobTitle;

    /*
        Overall Match

        Skills      70%
        Education   15%
        Experience  15%
    */

    let overall = comparison.skillMatch * 0.70;

    if (comparison.educationMatch) {

        overall += 15;

    }

    if (comparison.experienceMatch) {

        overall += 15;

    }

    comparison.overallMatch = Math.min(
        Math.round(overall),
        100
    );

    // Strengths

    if (comparison.skillMatch >= 80) {

        comparison.strengths.push(
            "Excellent technical skill match."
        );

    } else if (comparison.skillMatch >= 60) {

        comparison.strengths.push(
            "Good technical skill coverage."
        );

    }

    if (comparison.educationMatch) {

        comparison.strengths.push(
            "Education meets job requirements."
        );

    }

    if (comparison.experienceMatch) {

        comparison.strengths.push(
            "Relevant work experience found."
        );

    }

    if (parsedResume.projects.count >= 2) {

        comparison.strengths.push(
            "Strong project portfolio."
        );

    }

    if (parsedResume.certifications?.length > 0) {

        comparison.strengths.push(
            "Relevant certifications included."
        );

    }

    // Weaknesses

    if (comparison.missingSkills.length) {

        comparison.weaknesses.push(
            `Missing ${comparison.missingSkills.length} required skill(s).`
        );

    }

    if (!comparison.educationMatch) {

        comparison.weaknesses.push(
            "Education does not fully match."
        );

    }

    if (!comparison.experienceMatch) {

        comparison.weaknesses.push(
            "Relevant work experience missing."
        );

    }

    // Recommendations

    if (comparison.missingSkills.length) {

        comparison.recommendations.push(
            `Add skills such as ${comparison.missingSkills.join(", ")}.`
        );

    }

    if (!comparison.educationMatch) {

        comparison.recommendations.push(
            "Mention the required degree or relevant education."
        );

    }

    if (!comparison.experienceMatch) {

        comparison.recommendations.push(
            "Highlight internships, freelance work, or relevant professional experience."
        );

    }

    if (parsedResume.projects.count < 2) {

        comparison.recommendations.push(
            "Include at least two technical projects."
        );

    }

    if (parsedResume.experience.quantifiedAchievements < 2) {

        comparison.recommendations.push(
            "Add measurable achievements using numbers or percentages."
        );

    }

    if (!parsedResume.contact.github) {

        comparison.recommendations.push(
            "Include your GitHub profile."
        );

    }

    if (!parsedResume.projects.liveDemo) {

        comparison.recommendations.push(
            "Include live project links (Vercel, Netlify, Render, etc.)."
        );

    }

    return comparison;

};

export default compareResumeWithJob;