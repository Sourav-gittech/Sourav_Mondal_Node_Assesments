require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'test-1',
        allowed_formats: async (req, file) => ["jpg", "jpeg", "png"],
        public_id: (req, file) => file.originalname.split(" ").join("-") + "-" + Date.now(),
    },
})

const Upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

module.exports = Upload;