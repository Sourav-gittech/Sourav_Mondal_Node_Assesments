const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact_no: {
        type: Number,
        required: true
    },
    image:{
        type:String,
        default:"sampleDemo.png"
    },
    imageName:{
        type:String
    },
})

const studentModel = mongoose.model('student',studentSchema);

module.exports = studentModel;