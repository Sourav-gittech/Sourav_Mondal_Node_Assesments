const JOI = require("joi");

const userValidation = JOI.object({
    name: JOI.string().min(3).max(30).required(),
    email: JOI.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: JOI.string().min(6).required()
});

module.exports = userValidation;