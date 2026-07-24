import parseResume from "../helpers/resumeParser.js"

import checkContactInformation from "../helpers/contactChecker.js"
import checkEducation from "../helpers/educationChecker.js"
import checkSkills from "../helpers/skillsChecker.js"
import checkExperience from "../helpers/experienceChecker.js"
import checkProjects from "../helpers/projectChecker.js"

const calculateATSScore = (

    resumeText,

    requiredSkills = []

) => {

    const parsedResume = parseResume(resumeText)

    const contact = checkContactInformation(parsedResume)

    const education = checkEducation(parsedResume)

    const skills = checkSkills(

        parsedResume,

        requiredSkills

    )

    const experience = checkExperience(parsedResume)

    const projects = checkProjects(parsedResume)

    const totalScore =

        contact.score +

        education.score +

        skills.score +

        experience.score +

        projects.score

    let grade = ""

    if(totalScore >= 90){

        grade = "Outstanding"

    }
    else if(totalScore >= 80){

        grade = "Excellent"

    }
    else if(totalScore >= 65){

        grade = "Good"

    }
    else if(totalScore >= 45){

        grade = "Average"

    }
    else{

        grade = "Poor"

    }

    const strengths = []

    const improvements = []

    if(contact.score >= 18){

        strengths.push("Complete contact information")

    }
    else{

        improvements.push(...contact.missingFields)

    }

    if(education.score >= 15){

        strengths.push("Strong education section")

    }
    else{

        improvements.push(...education.missingFields)

    }

    if(skills.score >= 15){

        strengths.push("Relevant technical skills")

    }

    if(skills.missingSkills.length){

        improvements.push(

            `Missing skills: ${skills.missingSkills.join(", ")}`

        )

    }

    if(experience.score >= 15){

        strengths.push("Good work experience")

    }
    else{

        improvements.push(...experience.missingFields)

    }

    if(projects.score >= 15){

        strengths.push("Strong projects")

    }
    else{

        improvements.push(...projects.missingFields)

    }

    return {

        score : totalScore,

        grade,

        breakdown : {

            contact : contact.score,

            education : education.score,

            skills : skills.score,

            experience : experience.score,

            projects : projects.score

        },

        strengths,

        improvements,

        parsedResume

    }

}

export default calculateATSScore