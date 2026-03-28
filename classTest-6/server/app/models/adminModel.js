const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        default: 'admin'
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now()
    },
});

const adminModel = mongoose.model('auth-admin', adminSchema);

module.exports = adminModel;