const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteCompleteSchema = new Schema({
    // Dados do cliente
    client: {
        name: {
            type: String,
            required: "O campo 'nome' é obrigatório"
        },
        email: {
            type: String,
            required: "O campo 'email' é obrigatório"
        },
        phone: {
            type: String,
            required: "O campo 'telefone' é obrigatório"
        },
        preferredContact: {
            type: String,
            enum: ['email', 'phone', 'whatsapp'],
            default: 'whatsapp'
        }
    },

    // Ambientes selecionados
    environments: [{
        type: {
            type: String,
            required: true,
            enum: ['cozinha', 'quarto', 'sala', 'banheiro', 'escritorio', 'area_externa', 'outro']
        },
        name: String, // Nome personalizado se for "outro"
        measurements: {
            width: Number,
            height: Number,
            depth: Number,
            area: Number // Calculado automaticamente
        },
        description: String,
        woodType: {
            type: String,
            enum: ['branca', 'madeirada', 'laminada', 'mdf', 'outro']
        },
        thickness: {
            type: String,
            enum: ['15mm', '18mm', '25mm']
        },
        estimatedValue: Number // Valor estimado para este ambiente
    }],

    // Informações adicionais
    projectDetails: {
        description: String,
        budget: {
            type: String,
            enum: ['ate_10k', '10k_25k', '25k_50k', '50k_100k', 'acima_100k', 'nao_definido']
        },
        timeline: {
            type: String,
            enum: ['urgente', '1_mes', '2_3_meses', '3_6_meses', 'sem_pressa']
        },
        specialRequirements: String
    },

    // Imagens de referência
    referenceImages: [{
        url: String,
        description: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],

    // Cálculos
    calculations: {
        totalArea: Number,
        estimatedTotalValue: Number,
        averagePricePerM2: Number,
        breakdown: [{
            environment: String,
            area: Number,
            pricePerM2: Number,
            totalValue: Number
        }]
    },

    // Status do orçamento
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'sent', 'approved', 'rejected'],
        default: 'pending'
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
    reviewedAt: Date,
    sentAt: Date,
    notes: String // Notas internas do admin
});

// Middleware para atualizar updatedAt
quoteCompleteSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Middleware para calcular área automaticamente
quoteCompleteSchema.pre('save', function(next) {
    this.environments.forEach(env => {
        if (env.measurements.width && env.measurements.height) {
            env.measurements.area = env.measurements.width * env.measurements.height;
        }
    });
    next();
});

const QuoteComplete = mongoose.model("QuoteComplete", quoteCompleteSchema);

module.exports = QuoteComplete;

