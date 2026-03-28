const JOI  = require("joi");

const checkUserValidation = JOI.object({
    name:JOI.string().required(),
    email:JOI.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:JOI.string().pattern(new RegExp('^[a-zA-Z0-9]{6,}$')).required()
})

module.exports = checkUserValidation;