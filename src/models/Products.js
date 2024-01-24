const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryHome',
        default: null
    }],
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileProduct",
        default: null,
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
