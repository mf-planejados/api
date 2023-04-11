const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryHomeSchema = new Schema({
    name: {
        type: String,
        required: "O campo 'nome' é obrigatório"
    },
    createdAt: {
        type: Date,
        default: new Date(),
        select: false
    },
    url: {
        type: String,
        default: null
    },
    files:
      [{
         type: mongoose.Schema.ObjectId,
         ref: "File",
         default: null,
      }]
});

const CategoryHome = mongoose.model("CategoryHome", categoryHomeSchema);

module.exports = CategoryHome;

