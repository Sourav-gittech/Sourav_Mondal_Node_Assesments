const bcrypt = require("bcryptjs");

const userModel = require("../models/userModel");
const STATUS_CODE = require("../utils/statusCode");

class AdminController {

    async fetchAdminProfile(req, res) {
        try {
            const profile = req.admin;

            if (!profile) {
                return res.status(STATUS_CODE.UNAUTHORIZED).json({
                    success: false,
                    message: "Admin data unavailable"
                });
            }

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Admin profile details",
                data: profile
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
            const adminId = req.query.adminId;
            const is_active = req.body.changeStatus;

            const updateAdmin = await userModel.findByIdAndUpdate(adminId, { is_active }, { new: true });

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
            const adminId = req.admin.id;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            const admin = await userModel.findById(adminId);

            const checkPassword = await bcrypt.compare(oldPassword, admin.password);
            if (!checkPassword) {
                return res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "Old password doesn't match"
                })
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(newPassword, salt);

                const updateAdmin = await userModel.findByIdAndUpdate(adminId, { password: hashPassword }, { new: true });

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

module.exports = new AdminController();