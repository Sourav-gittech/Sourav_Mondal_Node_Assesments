require("dotenv").config();

const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const DbConnection = async () => {
    try {
        const status = mongoose.connect(MONGO_URL);
        if (status) {
            console.log("Connection established");
        }
        else {
            console.log("Connection failed");
        }
    }
    catch (err) {
        console.log("Connection failed");
    }
}

module.exports = DbConnection;