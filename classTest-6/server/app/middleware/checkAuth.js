const jwt = require("jsonwebtoken");

const STATUS_CODE = require("./../utils/statusCode");

const checkAuth = (allowed_type) => {

    return async (req, res, next) => {
        try {
            const token = req.body?.token || req.query?.token || req.headers['authorization'] || req.headers['x-access-token'];

            if (!token) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    success: false,
                    message: "Token not available"
                });
            }

            const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            if (!verifyToken) {
                return res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "Invalid token"
                });
            }
            else if (!allowed_type.includes(verifyToken.role)) {
                return res.status(STATUS_CODE.FORBIDDEN).json({
                    success: false,
                    message: "Invalid token"
                });
            }
            else {
                req.user = verifyToken;
            }
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: err.message
            });
        }

        next();
    }
}

module.exports = checkAuth;