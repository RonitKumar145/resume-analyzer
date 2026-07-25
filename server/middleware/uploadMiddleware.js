import multer from "multer"

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf" || (file.originalname && file.originalname.toLowerCase().endsWith(".pdf"))) {
            return cb(null, true)
        }
        cb(new Error("Only PDF resume files are allowed."))
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB Limit
    }
})

export const handleResumeUpload = (req, res, next) => {
    upload.single("resume")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    success: false,
                    message: "File size exceeds maximum limit of 5MB."
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message || "File upload error."
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message || "Only PDF resume files are allowed."
            });
        }
        next();
    });
};

export default upload