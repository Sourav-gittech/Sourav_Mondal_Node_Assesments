const multer = require("multer");

const TYPE_CHECKER = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/jpg": "jpg"
}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        const isValid = TYPE_CHECKER[file.mimetype];
        let errMsg = new Error("Invalid file type");

        if (isValid) {
            errMsg = null;
        }

        if (file.size > 1024) {
            errMsg = "Invalid file size"
        }

        cb(errMsg, "uploads");
    },

    filename: function (req, file, cb) {

        const fileName = file.originalname.split(" ").join("-");
        const extension = TYPE_CHECKER[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const Upload = multer({ storage: storage });

module.exports = Upload;