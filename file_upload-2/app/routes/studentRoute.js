const express = require("express");
const studentController = require("./../controllers/studentController");
const Upload = require("../utils/cloudinaryFileUpload");

const route = express.Router();

route.post('/add',Upload.single('image'),studentController.addStudent);
route.get('/all',studentController.fetchAllStudent);
route.patch('/update/:id',Upload.single('image'),studentController.updateStudentData);
route.delete('/delete/:id',studentController.deleteStudentData);

module.exports = route;