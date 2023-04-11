const mongoose = require("mongoose");
const { Schema } = mongoose;

const budgetSchema = new Schema({
    name: {
        type: String,
        required: "O campo 'nome' é obrigatório"
    },
    email: {
        type: String,
        default: null
    },
    telephone: {
        type: String,
        default: null
    },
    subject: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;