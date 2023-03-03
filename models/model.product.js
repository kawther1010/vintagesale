const number = require('@hapi/joi/lib/types/number');
const mongoose = require('mongoose');

var productschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: false,
        max: 255,
        min: 6,
    },
    /*
    image: {
        type: Image,
        required: true,
        max: 255,
        min: 3,
    },*/
    name: {
        type: String,
        required: true,
        max: 255,
        min: 3,
    },
    description: {
        type: String,
        required: true,
        unique: false,
    },
    bides: {
        type: number,
        required: false,
        unique: false,
        default: 0,
    }
}, {timestamps: true});


module.exports = mongoose.model('Product',productschema);