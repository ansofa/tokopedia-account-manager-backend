const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        const error = new Error('Maaf, hanya file gambar yang diizinkan.');
        error.statusCode = 400;
        cb(error, false);
    }
};

const uploader = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('file');

const verifyUpload = (req, res, next) => {
    uploader(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ status: 'FAILED', message: err.message });
        } else if (err) {
            return res.status(400).json({ status: 'FAILED', message: err.message });
        }
        next();
    });
};

module.exports = verifyUpload