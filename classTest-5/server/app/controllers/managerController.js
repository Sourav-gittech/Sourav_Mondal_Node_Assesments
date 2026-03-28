const bcrypt = require("bcryptjs");

const userModel = require("../models/userModel");
const STATUS_CODE = require("../utils/statusCode");

class ManagerController {

    async fetchManagerProfile(req, res) {
        try {
            const profile = req.manager;

            if (!profile) {
                return res.status(STATUS_CODE.UNAUTHORIZED).json({
                    success: false,
                    message: "Manager data unavailable"
                });
            }

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Manager profile details",
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
            const managerId = req.query.managerId;
            const is_active = req.body.changeStatus;

            const updateAdmin = await userModel.findByIdAndUpdate(managerId, { is_active }, { new: true });

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
            const managerId = req.manager.id;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            const manager = await userModel.findById(managerId);

            const checkPassword = await bcrypt.compare(oldPassword, manager.password);
            if (!checkPassword) {
                return res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "Old password doesn't match"
                })
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(newPassword, salt);

                const updateManager = await userModel.findByIdAndUpdate(managerId, { password: hashPassword }, { new: true });

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

module.exports = new ManagerController();