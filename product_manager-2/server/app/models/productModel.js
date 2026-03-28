const mongoose = require('mongoose');

const schema = mongoose.Schema;

const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: [String],
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
})

const productModel = mongoose.model('item', productSchema);

module.exports = productModel;