require("dotenv").config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'test/product',
        allowed_formats: async (req, file) => ['png', 'jpeg', 'jpg'],
        public_id: (req, file) => file.originalname.split(" ").join("-") + Date.now(),
    },
});

const Upload = multer({ storage, limits: { fileSize: 1 * 1024 * 1024 } });

module.exports = Upload;