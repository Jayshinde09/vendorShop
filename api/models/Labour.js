const mongoose = require('mongoose');

const labourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    vehicleNo : {
        type: String,
        required: true
    }
    ,
    password : {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin", "Labour"]
    },
    orders: {
        type: Array
    }
})

module.exports = mongoose.model("Labour", labourSchema);