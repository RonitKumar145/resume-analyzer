const checkExperience = (parsedResume) => {

    let score = 0

    const details = {

        jobTitleFound: false,
        companyFound: false,
        durationFound: false,
        technologiesFound: [],
        actionWordsFound: 0,
        quantifiedAchievements: 0

    }

    const missingFields = []

    const experience = parsedResume.experience

    if (experience.jobTitle) {

        score += 4
        details.jobTitleFound = true

    } else {

        missingFields.push("Job Title")

    }

    if (experience.company) {

        score += 3
        details.companyFound = true

    } else {

        missingFields.push("Company Name")

    }

    if (experience.duration) {

        score += 3
        details.durationFound = true

    } else {

        missingFields.push("Employment Duration")

    }

    details.technologiesFound = experience.technologies

    if (experience.technologies.length >= 4) {

        score += 4

    } else if (experience.technologies.length >= 2) {

        score += 3

    } else if (experience.technologies.length >= 1) {

        score += 2

    } else {

        missingFields.push("Technology Stack")

    }

    details.actionWordsFound = experience.actionWords.length

    if (experience.actionWords.length >= 5) {

        score += 3

    } else if (experience.actionWords.length >= 3) {

        score += 2

    } else if (experience.actionWords.length >= 1) {

        score += 1

    } else {

        missingFields.push("Action Verbs")

    }

    details.quantifiedAchievements = experience.quantifiedAchievements

    if (experience.quantifiedAchievements >= 2) {

        score += 3

    } else if (experience.quantifiedAchievements === 1) {

        score += 2

    } else {

        missingFields.push("Quantified Achievements")

    }

    return {

        score: Math.min(score, 20),

        details,

        missingFields

    }

}

export default checkExperience