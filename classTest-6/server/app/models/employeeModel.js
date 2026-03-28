const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
        default: 'employee'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFirstLogin: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now()
    },
});

const employeeModel = mongoose.model('auth-employee', employeeSchema);

module.exports = employeeModel;