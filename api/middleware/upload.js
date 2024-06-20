const multer = require('multer');

const imgUpload = (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8');
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
    ];;
    if (!allowedTypes.includes(file.mimetype)) {
        req.fileValidationError = "INCORRECT_FILETYPE";
        return cb(new Error(("Incorrect image type")));
    } else {
        cb(null, true)
    }
}

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads')
//     },
//     filename: (req, file, cb) => {
    
//         cb(null, file.originalname);
//       },
// })

const uploadImg = multer({
    storage: multer.memoryStorage(),
    fileFilter: imgUpload,
    limits: {fileSize: 15000000},
})

module.exports = uploadImg;