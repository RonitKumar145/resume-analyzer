const checkEducation = (parsedResume) => {

    let score = 0

    const details = {

        degreeFound : false,

        collegeFound : false,

        cgpaFound : false

    }

    const missingFields = []

    if(parsedResume.education.degree){

        score += 8

        details.degreeFound = true

    }
    else{

        missingFields.push("Degree")

    }

    if(parsedResume.education.college){

        score += 7

        details.collegeFound = true

    }
    else{

        missingFields.push("College")

    }

    if(parsedResume.education.cgpa){

        score += 5

        details.cgpaFound = true

    }
    else{

        missingFields.push("CGPA / Percentage")

    }

    return{

        score,

        details,

        missingFields

    }

}

export default checkEducation