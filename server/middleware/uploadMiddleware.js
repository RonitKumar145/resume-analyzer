import multer from "multer"

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")) {
            return cb(null, true)
        }
        cb(new Error("Only PDF resume files are allowed."))
    },
    limits: {
        fileSize: 40 * 1024 * 1024     // 40 MB
    }
})

export default upload