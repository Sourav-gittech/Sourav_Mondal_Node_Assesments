require("dotenv").config();

const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL

const DbConnection = async () => {
    try {
        const response = await mongoose.connect(MONGO_URL);

        if (response) {
            console.log("Database connected successfully");
        }
        else {
            console.log("Database connection failed");
        }
    }
    catch (err) {
        console.log("Database connection failed");
    }
}

module.exports = DbConnection;