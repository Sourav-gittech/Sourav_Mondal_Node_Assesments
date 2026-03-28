const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        full_address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    department: {
        department_name: {
            type: [String],
            required: true
        }
    },
    salary: {
        type: Number,
        required: true
    },
    profile_pic: {
        type: String,
        default: "user1.jpg"
    }
})

const employeeModel = mongoose.model('employee',employeeSchema);

module.exports = employeeModel;