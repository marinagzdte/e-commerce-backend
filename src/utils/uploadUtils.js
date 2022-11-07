import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/imgs");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const uploadFile = (req, res, next) => {
    const file = req.file;
    if (file) {
        next();
    } else {
        res.redirect('/register/error')
    }
};

export { upload, uploadFile }