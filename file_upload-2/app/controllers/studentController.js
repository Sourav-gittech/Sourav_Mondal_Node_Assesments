const cloudinary = require("cloudinary").v2;
const studentModel = require("./../models/studentModel");

class StudentController {
    async addStudent(req, res) {
        try {
            // console.log(req.file);

            const { name, email, contact_no } = req.body;
            const studentObj = new studentModel({ name, email, contact_no });

            if (req.file) {
                studentObj.image = req.file.path;
                studentObj.imageName = req.file.filename;
            }

            const student = await studentObj.save();

            return res.status(201).json({
                success: true,
                message: "Data added",
                data: student
            })
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }

    async fetchAllStudent(req, res) {
        try {
            const students = await studentModel.find();

            return res.status(200).json({
                success: true,
                message: "All student data",
                count: students.length,
                data: students
            })
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }

    async updateStudentData(req, res) {
        try {
            const studentId = req.params.id;
            let updatedObj = req.body;

            // console.log(req.file);

            const student = await studentModel.findById(studentId);

            if (req.file) {
                await cloudinary.uploader.destroy(student.imageName);

                updatedObj = { ...updatedObj, image: req.file.path, imageName: req.file.filename };
            }
            const updateStudent = await studentModel.findByIdAndUpdate(studentId, updatedObj, { new: true });

            return res.status(200).json({
                success: true,
                message: "data updated successfully"
            })
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }

    async deleteStudentData(req, res) {
        try {
            const studentId = req.params.id;

            const student = await studentModel.findById(studentId);

            if (student) {
                await cloudinary.uploader.destroy(student.imageName);

            }
            await studentModel.findByIdAndDelete(studentId);

            return res.status(200).json({
                success: true,
                message: "student data deleted"
            })
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = new StudentController();