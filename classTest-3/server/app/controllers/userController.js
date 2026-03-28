const STATUS_CODE = require("../utils/statusCode");
const userModel = require("./../model/userModel");

class UserController {

    async allAvailableUsers(req, res) {
        try {
            const allUsers = await userModel.find();

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "All available users",
                count: allUsers.length,
                data: allUsers
            })
        }
        catch (error) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async fetchUserProfile(req, res) {
        try {
            const userData = req?.user;

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: 'Logged user profile details',
                data: userData
            })
        }
        catch (error) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async updateUserProfile(req, res) {
        try {

            const userId = req?.user?.id;

            if (!userId) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({
                    success: false,
                    message: "User ID not found"
                })
            }

            const updateProfile = await userModel.findByIdAndUpdate(userId, req.body, { new: true });

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Profile updated successfully"
            })
        }
        catch (error) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async updateUserStatus(req, res) {
        try {

            const { id, is_active } = req.body;

            if (req?.user?.role !== 'admin') {
                return res.status(STATUS_CODE.BAD_REQUEST).json({
                    success: false,
                    message: "Unauthorised access"
                });
            }

            const updateStatus = await userModel.findByIdAndUpdate(id, { is_active }, { new: true });

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "User status updated successfully"
            })
        }
        catch (error) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async giveManagerAccess(req, res) {
        try {

            const { id, is_approved } = req.body;

            if (req?.user?.role !== 'admin') {
                return res.status(STATUS_CODE.BAD_REQUEST).json({
                    success: false,
                    message: "Unauthorised access"
                });
            }

            const approveManager = await userModel.findByIdAndUpdate(id, { is_approved }, { new: true });

            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: "Manager approved successfully"
            })
        }
        catch (error) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = new UserController();