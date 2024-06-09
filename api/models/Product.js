const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: [
        {
            type: String,
            required: true
        }
    ],
    slug: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Product", productSchema);