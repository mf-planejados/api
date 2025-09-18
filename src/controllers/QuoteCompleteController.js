const QuoteComplete = require("../models/QuoteComplete");
const PriceConfig = require("../models/PriceConfig");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../uploads/reference-images');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'ref-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas!'));
        }
    }
});

// Função para calcular preços
const calculateQuote = async (environments) => {
    let totalArea = 0;
    let estimatedTotalValue = 0;
    const breakdown = [];

    for (const env of environments) {
        const area = env.measurements.area || 0;
        totalArea += area;

        // Buscar configuração de preço
        const priceConfig = await PriceConfig.findOne({
            environment: env.type,
            woodType: env.woodType,
            thickness: env.thickness,
            isActive: true
        });

        if (priceConfig) {
            const pricePerM2 = priceConfig.pricePerM2;
            const complexityMultiplier = priceConfig.complexityMultipliers.medium; // Padrão médio
            const adjustedPrice = pricePerM2 * complexityMultiplier;
            const environmentValue = area * adjustedPrice;

            estimatedTotalValue += environmentValue;

            breakdown.push({
                environment: env.type,
                area: area,
                pricePerM2: adjustedPrice,
                totalValue: environmentValue
            });

            env.estimatedValue = environmentValue;
        }
    }

    const averagePricePerM2 = totalArea > 0 ? estimatedTotalValue / totalArea : 0;

    return {
        totalArea,
        estimatedTotalValue,
        averagePricePerM2,
        breakdown
    };
};

// Criar novo orçamento
const createQuote = async (req, res) => {
    try {
        const quoteData = req.body;

        // Calcular valores
        const calculations = await calculateQuote(quoteData.environments);

        const quote = new QuoteComplete({
            ...quoteData,
            calculations
        });

        await quote.save();

        res.status(201).json({
            success: true,
            message: "Orçamento criado com sucesso!",
            data: quote
        });
    } catch (error) {
        console.error("Erro ao criar orçamento:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Upload de imagens de referência
const uploadReferenceImages = upload.array('images', 5); // Máximo 5 imagens

const handleImageUpload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Nenhuma imagem foi enviada"
            });
        }

        const uploadedImages = req.files.map(file => ({
            url: `/uploads/reference-images/${file.filename}`,
            description: req.body.description || '',
            uploadedAt: new Date()
        }));

        res.status(200).json({
            success: true,
            message: "Imagens enviadas com sucesso!",
            images: uploadedImages
        });
    } catch (error) {
        console.error("Erro ao fazer upload das imagens:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao fazer upload das imagens",
            error: error.message
        });
    }
};

// Buscar todos os orçamentos (admin)
const getAllQuotes = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        
        const filter = status ? { status } : {};
        
        const quotes = await QuoteComplete.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await QuoteComplete.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: quotes,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        console.error("Erro ao buscar orçamentos:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Buscar orçamento por ID
const getQuoteById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const quote = await QuoteComplete.findById(id);
        
        if (!quote) {
            return res.status(404).json({
                success: false,
                message: "Orçamento não encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: quote
        });
    } catch (error) {
        console.error("Erro ao buscar orçamento:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Atualizar status do orçamento (admin)
const updateQuoteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const updateData = { status };
        
        if (status === 'reviewed') {
            updateData.reviewedAt = new Date();
        } else if (status === 'sent') {
            updateData.sentAt = new Date();
        }
        
        if (notes) {
            updateData.notes = notes;
        }

        const quote = await QuoteComplete.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!quote) {
            return res.status(404).json({
                success: false,
                message: "Orçamento não encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Status atualizado com sucesso!",
            data: quote
        });
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Deletar orçamento
const deleteQuote = async (req, res) => {
    try {
        const { id } = req.params;
        
        const quote = await QuoteComplete.findByIdAndDelete(id);
        
        if (!quote) {
            return res.status(404).json({
                success: false,
                message: "Orçamento não encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Orçamento deletado com sucesso!"
        });
    } catch (error) {
        console.error("Erro ao deletar orçamento:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

module.exports = {
    createQuote,
    uploadReferenceImages,
    handleImageUpload,
    getAllQuotes,
    getQuoteById,
    updateQuoteStatus,
    deleteQuote
};

