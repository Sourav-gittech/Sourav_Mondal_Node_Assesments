const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminModel = require("./../models/adminModel");
const STATUS_CODE = require("./../utils/statusCode");

class AdminController {

    async registerAdmin(req, res) {

        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const existAdmin = await adminModel.findOne({ email });

            if (existAdmin) {
                return res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "User already exist"
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            const adminObj = new adminModel({ name, email, password: hashPassword });

            const admin = await adminObj.save();

            return res.status(STATUS_CODE.CREATED).json({
                success: true,
                message: "Admin registered successfully",
                data: admin
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }

    async loginAdmin(req, res) {

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const existAdmin = await adminModel.findOne({ email });

            if (!existAdmin) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "User not found"
                });
            }

            const checkPassword = await bcrypt.compare(password, existAdmin.password);

            if (!checkPassword) {
                return res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "Password not match"
                })
            }
            else {
                const token = jwt.sign({
                    name: existAdmin.name,
                    email: existAdmin.email,
                    role: existAdmin.role
                }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                res.status(STATUS_CODE.OK).json({
                    success: true,
                    message: "Logged in successfully",
                    data: {
                        name: existAdmin.name,
                        email: existAdmin.email,
                        role: existAdmin.role
                    },
                    token
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

module.exports = new AdminController();