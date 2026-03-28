const generator = require('generate-password');
const bcrypt = require("bcryptjs");

const employeeModel = require("./../models/employeeModel");
const STATUS_CODE = require("./../utils/statusCode");
const sendEmail = require("./../utils/sendEmail");

class EmployeeController {

    async getProfile(req, res) {
        try {
            const email = req.user.email;
            const user = await employeeModel.findOne({ email });

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Fetched profile",
                data: user
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            })
        }
    }

    async updateProfile(req, res) {
        try {
            const user = req.user;

            const userDetails = await employeeModel.findOne({ email: user.email });

            const updateUser = await employeeModel.findByIdAndUpdate(userDetails._id, req.body, { new: true });

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Profile successfully updated"
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            })
        }
    }

    async allEmployeeList(req, res) {
        try {
            const employee = await employeeModel.find();

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Employee List",
                count: employee.length,
                data: employee
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            })
        }
    }

    async changePasswordByUser(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = req.user;

            if(oldPassword===newPassword){
                res.status(STATUS_CODE.BAD_GATEWAY).json({
                    success: false,
                    message: "Previous password and new password can't be same"
                }); 
            }

            const existingEmployee = await employeeModel.findOne({ email: user.email });

            if (!existingEmployee) {
                res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "User details not found"
                });
            }

            const checkOldPassword = await bcrypt.compare(oldPassword, existingEmployee.password);

            if (!checkOldPassword) {
                res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "Previous password doesn't match"
                });
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hashNewPassword = bcrypt.hashSync(newPassword, salt);

                existingEmployee.password = hashNewPassword;
                await existingEmployee.save();

                res.status(STATUS_CODE.OK).json({
                    success: true,
                    message: "Password changes successfully"
                });
            }
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            })
        }
    }

    async changeStatus(req, res) {
        try {
            const employeeId = req.params.id;

            const existingEmployee = await employeeModel.findById(employeeId);
            if (!existingEmployee) {
                res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "User details not found"
                });
            }

            existingEmployee.isActive = !existingEmployee.isActive;
            await existingEmployee.save();

            res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Employee status changes successfully"
            });
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            })
        }
    }

    async changePasswordByAdmin(req, res) {
        try {
            const employeeId = req.params.id;

            const existingEmployee = await employeeModel.findById(employeeId);
            if (!existingEmployee) {
                res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "User details not found"
                });
            }

            const password = generator.generate({ length: 10, numbers: true });

            const salt = await bcrypt.genSalt(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            existingEmployee.password = hashPassword;
            await existingEmployee.save();

            const employeeAuthDetails = { email: existingEmployee.email, password, name: existingEmployee.name };

            await sendEmail(req, employeeAuthDetails);

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Password changes successfully"
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            })
        }
    }

}

module.exports = new EmployeeController();