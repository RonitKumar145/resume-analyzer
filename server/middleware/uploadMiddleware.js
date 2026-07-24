import multer from "multer"

const storage = multer.diskStorage({

    destination : (req,file,cb) => {

        cb(null,"uploads/")

    },

    filename : (req,file,cb) => {

        const uploadedFileName = `${Date.now()}-${file.originalname}`

        cb(null,uploadedFileName)

    }

})

const upload = multer({

    storage,

    fileFilter : (req,file,cb) => {

        if(file.mimetype === "application/pdf"){

            return cb(null,true)

        }

        cb(new Error("Only PDF resume files are allowed."))

    },

    limits : {

        fileSize : 40 * 1024 * 1024     // 40 MB

    }

})

export default upload