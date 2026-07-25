const compareResumeWithJob = (parsedResume, parsedJob, atsResult = null) => {
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
        !!parsedResume.education?.degree;

    const expDetails = atsResult?.experienceDetails || parsedResume?.experienceDetails || {};
    const expScore = atsResult?.rawExperienceScore ?? (expDetails.score ?? 0);
    const roleRelevanceScore = expDetails.roleRelevanceScore ?? 0;
    const techContextScore = expDetails.techContextScore ?? 0;
    const targetRole = parsedJob.title || "the target role";
    const isCustom = !!parsedJob.isCustom;

    comparison.experienceMatch =
        parsedJob.experience === null ||
        (!!parsedResume.experience?.jobTitle && roleRelevanceScore >= 5);

    /*
        Overall Match:
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
        comparison.strengths.push("Excellent technical skill match.");
    } else if (comparison.skillMatch >= 60) {
        comparison.strengths.push("Good technical skill coverage.");
    }

    if (comparison.educationMatch) {
        comparison.strengths.push("Education meets job requirements.");
    }

    if (comparison.experienceMatch) {
        comparison.strengths.push("Relevant work experience found.");
    }

    if (parsedResume.projects?.count >= 2) {
        comparison.strengths.push("Strong project portfolio.");
    }

    if (parsedResume.certifications?.length > 0) {
        comparison.strengths.push("Relevant certifications included.");
    }

    // Weaknesses
    if (comparison.missingSkills.length) {
        comparison.weaknesses.push(
            `Missing ${comparison.missingSkills.length} required skill(s).`
        );
    }

    if (!comparison.educationMatch) {
        comparison.weaknesses.push("Education does not fully match.");
    }

    // Experience Specific Weakness Triggers (< 12/20)
    if (expScore < 12) {
        if (isCustom) {
            comparison.weaknesses.push(
                "Custom JD Alignment Gap: Your work experience lacks direct alignment with the specific role titles or responsibilities described in the provided Job Description."
            );

            if (comparison.missingSkills.length > 0) {
                const topMissing = comparison.missingSkills.slice(0, 3).join(", ");
                comparison.weaknesses.push(
                    `Missing JD Keywords in Experience: Key tools/skills explicitly requested in the Job Description (e.g., ${topMissing}) were not detected within your work history bullet points.`
                );
            }
        } else {
            if (roleRelevanceScore === 0) {
                comparison.weaknesses.push(
                    `Lack of direct target role experience: Your work history does not explicitly mention job titles matching or adjacent to '${targetRole}'.`
                );
            }
            if (techContextScore < 5) {
                comparison.weaknesses.push(
                    `Missing required tech stack in work history: Key tools for ${targetRole} are missing from your project and job bullet points.`
                );
            }
        }
    } else if (!comparison.experienceMatch) {
        comparison.weaknesses.push("Relevant work experience missing.");
    }

    // Recommendations
    if (isCustom && expScore < 12) {
        comparison.recommendations.push(
            "Tailor Experience to JD Keywords: Incorporate specific tools and skills mentioned in the Job Description directly into your work experience bullet points to boost keyword matching."
        );
    }

    if (comparison.missingSkills.length > 0) {
        const topMissing = comparison.missingSkills.slice(0, 3).join(", ");
        comparison.recommendations.push(
            `Integrate key tools into bullet points: Explicitly demonstrate how you used required skills (e.g., ${topMissing}) within your experience descriptions rather than listing them only in a separate skills section.`
        );
    }

    if (roleRelevanceScore < 10) {
        comparison.recommendations.push(
            `Highlight relevant responsibilities: If you held adjacent titles (e.g., Software Developer instead of ${targetRole}), rephrase your experience headers or bullet points to emphasize ${targetRole}-specific tasks.`
        );
    }

    if (!comparison.educationMatch) {
        comparison.recommendations.push(
            "Mention the required degree or relevant education."
        );
    }

    if (!comparison.experienceMatch && roleRelevanceScore === 0) {
        comparison.recommendations.push(
            "Highlight internships, freelance work, or relevant professional experience."
        );
    }

    if (parsedResume.projects?.count < 2) {
        comparison.recommendations.push("Include at least two technical projects.");
    }

    if (parsedResume.experience?.quantifiedAchievements < 2) {
        comparison.recommendations.push(
            "Add measurable achievements using numbers or percentages."
        );
    }

    if (!parsedResume.contact?.github) {
        comparison.recommendations.push("Include your GitHub profile.");
    }

    if (!parsedResume.projects?.liveDemo) {
        comparison.recommendations.push(
            "Include live project links (Vercel, Netlify, Render, etc.)."
        );
    }

    // Ensure unique items
    comparison.weaknesses = Array.from(new Set(comparison.weaknesses));
    comparison.recommendations = Array.from(new Set(comparison.recommendations));

    return comparison;
};

export default compareResumeWithJob;