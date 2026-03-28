const generator = require('generate-password');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeModel = require("./../models/employeeModel");
const STATUS_CODE = require("./../utils/statusCode");
const sendEmail = require("./../utils/sendEmail");

class EmployeeAuthController {

    async registerEmployee(req, res) {
        try {
            const { name, email } = req.body;

            if (!name || !email) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const existEmployee = await employeeModel.findOne({ email });

            if (existEmployee) {
                return res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "User already exist"
                });
            }

            const password = generator.generate({ length: 10, numbers: true });

            const salt = await bcrypt.genSalt(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            const employeeObj = new employeeModel({ name, email, password: hashPassword });
            const employeeAuthDetails = { email, password, name };

            const employee = await employeeObj.save();

            await sendEmail(req, employeeAuthDetails);

            return res.status(STATUS_CODE.CREATED).json({
                success: true,
                message: "Employee created successfully",
                data: employee
            })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }
    }

    async loginEmployee(req, res) {

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const existEmployee = await employeeModel.findOne({ email });

            if (!existEmployee) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "User not found"
                });
            }

            const checkPassword = await bcrypt.compare(password, existEmployee.password);

            if (!checkPassword) {
                return res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "Password not match"
                });
            }
            else if (!existEmployee.isActive) {
                return res.status(STATUS_CODE.BAD_GATEWAY).json({
                    success: false,
                    message: "Unauthorised access. It's block"
                });
            }
            else {
                existEmployee.isFirstLogin = false;
                existEmployee.lastLogin = Date.now();
                await existEmployee.save();

                const token = jwt.sign({
                    name: existEmployee.name,
                    email: existEmployee.email,
                    role: existEmployee.role
                }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                res.status(STATUS_CODE.OK).json({
                    success: true,
                    message: "Logged in successfully",
                    data: {
                        name: existEmployee.name,
                        email: existEmployee.email,
                        role: existEmployee.role
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

module.exports = new EmployeeAuthController();