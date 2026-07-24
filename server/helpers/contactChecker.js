const checkContactInformation = (parsedResume) => {

    let score = 0

    const details = {

        email : false,

        phone : false,

        linkedIn : false,

        github : false

    }

    const missingFields = []

    if(parsedResume.contact.email){

        score += 5

        details.email = true

    }
    else{

        missingFields.push("Email")

    }

    if(parsedResume.contact.phone){

        score += 5

        details.phone = true

    }
    else{

        missingFields.push("Phone Number")

    }

    if(parsedResume.contact.linkedIn){

        score += 5

        details.linkedIn = true

    }
    else{

        missingFields.push("LinkedIn")

    }

    if(parsedResume.contact.github){

        score += 5

        details.github = true

    }
    else{

        missingFields.push("GitHub")

    }

    return{

        score,

        details,

        missingFields

    }

}

export default checkContactInformation