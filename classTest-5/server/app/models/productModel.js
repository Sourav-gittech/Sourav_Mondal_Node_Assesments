const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    product_img: {
        type: String,
        require: true
    },
    product_img_url: {
        type: String,
        require: true
    }
});

const productModel = mongoose.model('role_based_product', productSchema);

module.exports = productModel;