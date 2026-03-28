require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkUserValidation = require("../utils/checkUserValidation");
const STATUS_CODE = require("../utils/statusCode");
const userModel = require("./../model/userModel");

const userRole = ['admin', 'manager', 'employee'];
class AuthController {

    async authRegister(req, res) {
        try {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({
                    success: false,
                    message: "All fields are required"
                })
            }

            if (role && !userRole.includes(role)) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({
                    success: false,
                    message: "User role not match"
                })
            }

            const existUser = await userModel.findOne({ email });
            if (existUser) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({
                    success: false,
                    message: "User already exist"
                })
            }
            else {
                const { error, data } = checkUserValidation.validate({ name, email, password });
                if (error) {
                    return res.status(STATUS_CODE.BAD_REQUEST).json({
                        success: false,
                        message: error?.details[0]?.message
                    })
                }
                else {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = bcrypt.hashSync(password, salt);

                    let userObj;
                    if (role) {
                        userObj = new userModel({ name, email, password: hashPassword, role });
                    }
                    else {
                        userObj = new userModel({ name, email, password: hashPassword });
                    }

                    const user = await userObj.save();
                    return res.status(STATUS_CODE.CREATED).json({
                        success: true,
                        message: "User added successfully",
                        data: user
                    })
                }
            }
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            })
        }
    }

    async authLogin(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({
                    success: false,
                    message: "All fields are required"
                })
            }

            const existUser = await userModel.findOne({ email });
            if (!existUser) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "User not found"
                })
            }
            else {
                const checkPassword = await bcrypt.compare(password, existUser.password);
                if (!checkPassword) {
                    return res.status(STATUS_CODE.NOT_FOUND).json({
                        success: false,
                        message: "Password doesn't match"
                    })
                }
                else {
                    const token = jwt.sign({
                        id: existUser._id,
                        name: existUser.name,
                        email: existUser.email,
                        role: existUser.role
                    }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                    return res.status(STATUS_CODE.OK).json({
                        success: true,
                        message: "Login successfull",
                        data: {
                            name: existUser.name,
                            email: existUser.email,
                            role: existUser.role
                        },
                        token
                    })
                }
            }

        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = new AuthController();