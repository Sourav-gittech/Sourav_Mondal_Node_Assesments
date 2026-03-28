require('dotenv').config();

const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL

const DbConnection = async () => {
    try {
        const response = mongoose.connect(MONGO_URL);
        if (response) {
            console.log('Connection establish');
        }
        else {
            console.log('Connection not establish');
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = DbConnection;