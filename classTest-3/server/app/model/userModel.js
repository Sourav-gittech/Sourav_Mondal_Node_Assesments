const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        enum: ["admin", "manager", "employee"],
        default: "employee"
    },
    is_approved: {
        type: Boolean,
        require: true,
        default: false
    },
    is_active: {
        type: Boolean,
        require: true,
        default: true
    }
});

const userModel = mongoose.model('role_based_user', userSchema);

module.exports = userModel;