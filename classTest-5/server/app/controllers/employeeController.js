const bcrypt = require("bcryptjs");

const userModel = require("../models/userModel");
const STATUS_CODE = require("../utils/statusCode");

class EmployeeController {

    async fetchEmployeeProfile(req, res) {
        try {
            const employeeProfile = req.employee;

            if (!employeeProfile) {
                return res.status(STATUS_CODE.UNAUTHORIZED).json({
                    success: false,
                    message: "Employee data unavailable"
                });
            }

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Employee profile details",
                data: employeeProfile
            });
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }

    async changeProfileStatus(req, res) {
        try {
            const employeeId = req.query.employeeId;
            const is_active = req.body.changeStatus;

            const updateEmployee = await userModel.findByIdAndUpdate(employeeId, { is_active }, { new: true });

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Profile status updated"
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }

    async changeProfilePassword(req, res) {
        try {
            const employeeId = req.employee.id;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            const employee = await userModel.findById(employeeId);

            const checkPassword = await bcrypt.compare(oldPassword, employee.password);
            if (!checkPassword) {
                return res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "Old password doesn't match"
                })
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(newPassword, salt);

                const updateEmployee = await userModel.findByIdAndUpdate(employeeId, { password: hashPassword }, { new: true });

                return res.status(STATUS_CODE.OK).json({
                    success: true,
                    message: "Password updated successfully"
                })
            }
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }
}

module.exports = new EmployeeController();