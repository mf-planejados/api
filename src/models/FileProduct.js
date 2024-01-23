const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileProductSchema = new Schema({
  name: String,
  size: Number,
  key: String,
  alt: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
},
});

const FileProduct = mongoose.model("FileProduct", fileProductSchema);

module.exports = FileProduct;