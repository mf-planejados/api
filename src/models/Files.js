const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    alt: String,
    url: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    category: {
      type: String,
      required: "O campo 'Categoria' é obrigatório"
   },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const File = mongoose.model("File", fileSchema);

module.exports = File;