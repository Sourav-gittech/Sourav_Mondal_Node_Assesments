const jwt = require('jsonwebtoken');
const STATUS_CODE = require("../utils/statusCode");

const checkAuth = async (req, res, next) => {
    try {
        const token = req.body?.token || req.query?.token || req.headers['authorization'] || req.headers['x-access-token'];

        if (token) {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log(verifyToken)
            req.user = verifyToken;
        }
        else {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                message: "Token is required"
            })
        }
    }
    catch (err) {
        res.status(STATUS_CODE.BAD_REQUEST).json({
            success: false,
            message: "Invalid Token"
        })
    }
    next();
}

module.exports = checkAuth;