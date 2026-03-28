const JOI = require("joi");

const checkProductValidation = JOI.object({
    name: JOI.string().required(),
    description: JOI.string().required(),
    category: JOI.string().required(),
    price: JOI.string().required()
})

module.exports = checkProductValidation;