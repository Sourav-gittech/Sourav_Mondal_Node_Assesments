const jwt = require("jsonwebtoken");
const STATUS_CODE = require("../utils/statusCode");

const checkManager = (req, res, next) => {
    try {
        const token = req?.body?.token || req?.query?.token || req.headers['authorization'] || req.headers['x-access-token'];

        if (!token) {
            return res.status(STATUS_CODE.NOT_FOUND).json({
                success: false,
                message: "Token is required"
            });
        }
        else {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (verifyToken.role !== 'manager') {
                return res.status(STATUS_CODE.BAD_GATEWAY).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
            else {
                req.admin = verifyToken;
            }
        }
    }
    catch (err) {
        return res.status(STATUS_CODE.SERVER_ERROR).json({
            success: false,
            message: "Invalid token"
        });
    }

    next();
}

module.exports = checkManager;