const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require("../../models/userModel");
const STATUS_CODE = require('../../utils/statusCode');
const userValidation = require('../../utils/checkUserValidation');

class ManagerAuthController {

    async registerManager(req, res) {
        try {
            const { name, email, password, role } = req.body;

            const existUser = await userModel.findOne({ email });
            if (existUser) {
                return res.status(STATUS_CODE.BAD_GATEWAY).json({
                    success: false,
                    message: "User already exists"
                });
            }

            const { data, error } = await userValidation.validate({ name, email, password });
            if (error) {
                return res.status(STATUS_CODE.BAD_GATEWAY).json({
                    success: false,
                    message: error.details[0].message
                });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            const managerObj = new userModel({ name, email, password: hashPassword, role });

            const manager = await managerObj.save();

            return res.status(STATUS_CODE.CREATED).json({
                success: true,
                message: "Manager registered successfully",
                data: manager
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }

    async loginManager(req, res) {
        try {
            const { email, password } = req.body;

            const existUser = await userModel.findOne({ email });
            if (!existUser) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "Manager not found"
                });
            }

            const verifyPassword = await bcrypt.compare(password, existUser.password);
            if (!verifyPassword) {
                return res.status(STATUS_CODE.BAD_GATEWAY).json({
                    success: false,
                    message: "Password doesn't match"
                });
            }

            if (existUser.role === 'manager') {
                const token = jwt.sign({
                    name: existUser.name,
                    email: existUser.email,
                    role: existUser.role
                }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                return res.status(STATUS_CODE.OK).json({
                    success: true,
                    message: "Manager logged in successfully",
                    data: {
                        name: existUser.name,
                        email: existUser.email,
                        role: existUser.role
                    },
                    token
                });
            }
            else {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "Manager not found"
                });
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

module.exports = new ManagerAuthController();