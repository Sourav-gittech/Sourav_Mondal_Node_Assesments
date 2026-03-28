const JOI = require("joi");

const validateProduct = JOI.object({
    name: JOI.string().required(),
    description: JOI.string().required(),
    category: JOI.string().required(),
    price: JOI.string().required()
});

module.exports = validateProduct;