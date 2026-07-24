const compareResumeWithJob = (

    parsedResume,

    parsedJob

) => {

    const comparison = {

        overallMatch: 0,

        skillMatch: 0,

        educationMatch: false,

        experienceMatch: false,

        matchedSkills: [],

        missingSkills: [],

        recommendations: []

    }

    const resumeSkills = parsedResume.skills || []

    const requiredSkills = parsedJob.requiredSkills || []

    let matchedSkillCount = 0

    requiredSkills.forEach(skill => {

        const found = resumeSkills.some(

            resumeSkill =>

                resumeSkill.toLowerCase() === skill.toLowerCase()

        )

        if(found){

            comparison.matchedSkills.push(skill)

            matchedSkillCount++

        }

        else{

            comparison.missingSkills.push(skill)

        }

    })

    comparison.skillMatch = requiredSkills.length

        ? Math.round((matchedSkillCount / requiredSkills.length) * 100)

        : 100

    comparison.educationMatch =

        parsedJob.education.length === 0 ||

        !!parsedResume.education.degree

    comparison.experienceMatch =

        parsedJob.experience === null ||

        !!parsedResume.experience.jobTitle

    let overall = comparison.skillMatch * 0.7

    if(comparison.educationMatch){

        overall += 15

    }

    if(comparison.experienceMatch){

        overall += 15

    }

    comparison.overallMatch = Math.min(

        Math.round(overall),

        100

    )

    if(comparison.missingSkills.length){

        comparison.recommendations.push(

            `Add skills like ${comparison.missingSkills.join(", ")}`

        )

    }

    if(!comparison.educationMatch){

        comparison.recommendations.push(

            "Educational qualification does not fully match the job description."

        )

    }

    if(!comparison.experienceMatch){

        comparison.recommendations.push(

            "Relevant work experience is missing."

        )

    }

    return comparison

}

export default compareResumeWithJob