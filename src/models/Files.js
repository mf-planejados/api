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
    default: null
  },
  section: {
    type: String,
    default: "O campo 'Seção' é obrigatório"
  },
  namePerfil: {
    type: String,
    default: null
  },
  level: {
    type: String,
    default: null
  }
});

const File = mongoose.model("File", fileSchema);

module.exports = File;