const checkProjects = (parsedResume) => {

    let score = 0

    const details = {

        githubFound: parsedResume.projects.github,

        liveDemoFound: parsedResume.projects.liveDemo,

        technologiesUsed: parsedResume.projects.technologies,

        projectCount: parsedResume.projects.count || 0

    }

    const missingFields = []

    if (parsedResume.projects.github) {

        score += 5

    } else {

        missingFields.push("GitHub Repository")

    }

    if (parsedResume.projects.liveDemo) {

        score += 5

    } else {

        missingFields.push("Live Demo")

    }

    const techCount = parsedResume.projects.technologies.length

    if (techCount >= 5) {

        score += 5

    }

    else if (techCount >= 3) {

        score += 4

    }

    else if (techCount >= 2) {

        score += 3

    }

    else if (techCount >= 1) {

        score += 2

    }

    else {

        missingFields.push("Project Technologies")

    }

    if (details.projectCount >= 3) {

        score += 5

    }

    else if (details.projectCount >= 2) {

        score += 4

    }

    else if (details.projectCount >= 1) {

        score += 2

    }

    else {

        missingFields.push("Projects")

    }

    return {

        score: Math.min(score, 20),

        details,

        missingFields

    }

}

export default checkProjects