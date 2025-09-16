const PriceConfig = require("../models/PriceConfig");

// Buscar todas as configurações de preço
const getAllPriceConfigs = async (req, res) => {
    try {
        const configs = await PriceConfig.find({ isActive: true }).sort({ 
            environment: 1, 
            woodType: 1, 
            thickness: 1 
        });

        res.status(200).json({
            success: true,
            data: configs
        });
    } catch (error) {
        console.error("Erro ao buscar configurações de preço:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Buscar configuração específica
const getPriceConfig = async (req, res) => {
    try {
        const { environment, woodType, thickness } = req.query;

        if (!environment || !woodType || !thickness) {
            return res.status(400).json({
                success: false,
                message: "Parâmetros environment, woodType e thickness são obrigatórios"
            });
        }

        const config = await PriceConfig.findOne({
            environment,
            woodType,
            thickness,
            isActive: true
        });

        if (!config) {
            return res.status(404).json({
                success: false,
                message: "Configuração de preço não encontrada"
            });
        }

        res.status(200).json({
            success: true,
            data: config
        });
    } catch (error) {
        console.error("Erro ao buscar configuração de preço:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Criar nova configuração de preço
const createPriceConfig = async (req, res) => {
    try {
        const configData = req.body;

        // Verificar se já existe uma configuração com os mesmos parâmetros
        const existingConfig = await PriceConfig.findOne({
            environment: configData.environment,
            woodType: configData.woodType,
            thickness: configData.thickness
        });

        if (existingConfig) {
            return res.status(400).json({
                success: false,
                message: "Já existe uma configuração para estes parâmetros"
            });
        }

        const config = new PriceConfig(configData);
        await config.save();

        res.status(201).json({
            success: true,
            message: "Configuração de preço criada com sucesso!",
            data: config
        });
    } catch (error) {
        console.error("Erro ao criar configuração de preço:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Atualizar configuração de preço
const updatePriceConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const config = await PriceConfig.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!config) {
            return res.status(404).json({
                success: false,
                message: "Configuração de preço não encontrada"
            });
        }

        res.status(200).json({
            success: true,
            message: "Configuração atualizada com sucesso!",
            data: config
        });
    } catch (error) {
        console.error("Erro ao atualizar configuração de preço:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Deletar configuração de preço (soft delete)
const deletePriceConfig = async (req, res) => {
    try {
        const { id } = req.params;

        const config = await PriceConfig.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!config) {
            return res.status(404).json({
                success: false,
                message: "Configuração de preço não encontrada"
            });
        }

        res.status(200).json({
            success: true,
            message: "Configuração desativada com sucesso!"
        });
    } catch (error) {
        console.error("Erro ao deletar configuração de preço:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Buscar configurações por ambiente
const getConfigsByEnvironment = async (req, res) => {
    try {
        const { environment } = req.params;

        const configs = await PriceConfig.find({
            environment,
            isActive: true
        }).sort({ woodType: 1, thickness: 1 });

        res.status(200).json({
            success: true,
            data: configs
        });
    } catch (error) {
        console.error("Erro ao buscar configurações por ambiente:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

// Calcular preço estimado
const calculateEstimatedPrice = async (req, res) => {
    try {
        const { environments } = req.body;

        if (!environments || !Array.isArray(environments)) {
            return res.status(400).json({
                success: false,
                message: "Array de ambientes é obrigatório"
            });
        }

        let totalArea = 0;
        let estimatedTotalValue = 0;
        const breakdown = [];

        for (const env of environments) {
            const area = env.measurements?.area || 0;
            totalArea += area;

            if (area > 0) {
                const config = await PriceConfig.findOne({
                    environment: env.type,
                    woodType: env.woodType,
                    thickness: env.thickness,
                    isActive: true
                });

                if (config) {
                    const complexityMultiplier = config.complexityMultipliers.medium;
                    const adjustedPrice = config.pricePerM2 * complexityMultiplier;
                    const environmentValue = area * adjustedPrice;

                    estimatedTotalValue += environmentValue;

                    breakdown.push({
                        environment: env.type,
                        area: area,
                        pricePerM2: adjustedPrice,
                        totalValue: environmentValue
                    });
                }
            }
        }

        const averagePricePerM2 = totalArea > 0 ? estimatedTotalValue / totalArea : 0;

        res.status(200).json({
            success: true,
            data: {
                totalArea,
                estimatedTotalValue,
                averagePricePerM2,
                breakdown
            }
        });
    } catch (error) {
        console.error("Erro ao calcular preço estimado:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            error: error.message
        });
    }
};

module.exports = {
    getAllPriceConfigs,
    getPriceConfig,
    createPriceConfig,
    updatePriceConfig,
    deletePriceConfig,
    getConfigsByEnvironment,
    calculateEstimatedPrice
};

