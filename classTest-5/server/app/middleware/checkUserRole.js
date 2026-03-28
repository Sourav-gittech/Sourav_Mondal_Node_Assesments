const jwt = require("jsonwebtoken");
const STATUS_CODE = require("../utils/statusCode");

const checkUserRole = (allowedRoles = []) => {
    return (req, res, next) => {
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

                if (!allowedRoles.includes(verifyToken.role)) {
                    return res.status(STATUS_CODE.BAD_GATEWAY).json({
                        success: false,
                        message: "Invalid credentials"
                    });
                }
                else {
                    req.user = verifyToken;
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
}

module.exports = checkUserRole;