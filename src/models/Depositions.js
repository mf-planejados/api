const mongoose = require("mongoose");
const { Schema } = mongoose;

const DepositionsSchema = new Schema({
    message: {
        type: String,
        required: "O campo 'nome' é obrigatório"
    },
    createdAt: {
        type: Date,
        default: new Date(),
        select: false
    },
    clientName: {
        type: String,
        default: null
    },
});

const Depositions = mongoose.model("Depositions", DepositionsSchema);

module.exports = Depositions;

