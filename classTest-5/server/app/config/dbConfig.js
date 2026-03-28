require('dotenv').config();

const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const DbConnect = async () => {
    try {
        const response = mongoose.connect(MONGO_URL);

        if (response) {
            console.log('DB connection established');
        }
        else {
            console.log('DB connection failed');
        }
    }
    catch (err) {
        console.log('DB connection failed');
    }
}

module.exports = DbConnect;