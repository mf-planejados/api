const mongoose = require("mongoose");
const { Schema } = mongoose;

const priceConfigSchema = new Schema({
    // Tipo de ambiente
    environment: {
        type: String,
        required: true,
        enum: ['cozinha', 'quarto', 'sala', 'banheiro', 'escritorio', 'area_externa', 'outro']
    },

    // Tipo de madeira
    woodType: {
        type: String,
        required: true,
        enum: ['branca', 'madeirada', 'laminada', 'mdf', 'outro']
    },

    // Espessura
    thickness: {
        type: String,
        required: true,
        enum: ['15mm', '18mm', '25mm']
    },

    // Preço por metro quadrado
    pricePerM2: {
        type: Number,
        required: true,
        min: 0
    },

    // Multiplicadores por complexidade
    complexityMultipliers: {
        basic: { type: Number, default: 1.0 },
        medium: { type: Number, default: 1.2 },
        complex: { type: Number, default: 1.5 }
    },

    // Configurações adicionais
    isActive: {
        type: Boolean,
        default: true
    },

    // Metadados
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: String, // ID do admin que criou
    notes: String
});

// Middleware para atualizar updatedAt
priceConfigSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Índice composto para busca eficiente
priceConfigSchema.index({ environment: 1, woodType: 1, thickness: 1 }, { unique: true });

const PriceConfig = mongoose.model("PriceConfig", priceConfigSchema);

module.exports = PriceConfig;

