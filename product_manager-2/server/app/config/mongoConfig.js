require("dotenv").config();

const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

const DbConnection = () => {
    try {
        const connection = mongoose.connect(MONGO_URL);

        if (connection) {
            console.log("Database connection successfull");
        }
        else {
            console.log("Database connection failed");
        }
    }
    catch (err) {
        console.log("Database connection failed", err);
    }
}

module.exports = DbConnection;