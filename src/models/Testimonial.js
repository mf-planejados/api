const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestimonialSchema = new Schema({
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

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial;

