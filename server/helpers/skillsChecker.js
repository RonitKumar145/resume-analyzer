import { skillLibrary } from "../config/atsConfig.js"

const checkSkills = (

    parsedResume,

    requiredSkills = []

) => {

    let score = 0

    const matchedSkills = parsedResume.skills || []

    const missingSkills = []

    matchedSkills.forEach(skill => {

        const currentSkill = skillLibrary.find(

            item => item.name === skill

        )

        if(currentSkill){

            score += currentSkill.weight

        }

    })

    score = Math.min(score,20)

    requiredSkills.forEach(skill => {

        if(

            !matchedSkills.some(

                resumeSkill =>

                    resumeSkill.toLowerCase() === skill.toLowerCase()

            )

        ){

            missingSkills.push(skill)

        }

    })

    const jobMatch = requiredSkills.length

        ? Math.round(

            (

                (requiredSkills.length - missingSkills.length)

                /

                requiredSkills.length

            ) * 100

        )

        : null

    return{

        score,

        details : {

            matchedSkills,

            totalSkills : matchedSkills.length

        },

        missingSkills,

        jobMatch

    }

}

export default checkSkills