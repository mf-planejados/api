const mongoose = require('mongoose');
const PriceConfig = require('../models/PriceConfig');

// Configurações de preço iniciais
const initialPriceConfigs = [
  // Cozinha
  { environment: 'cozinha', woodType: 'branca', thickness: '15mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'cozinha', woodType: 'branca', thickness: '18mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'cozinha', woodType: 'branca', thickness: '25mm', pricePerM2: 800, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'cozinha', woodType: 'madeirada', thickness: '15mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'cozinha', woodType: 'madeirada', thickness: '18mm', pricePerM2: 800, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'cozinha', woodType: 'madeirada', thickness: '25mm', pricePerM2: 900, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'cozinha', woodType: 'laminada', thickness: '15mm', pricePerM2: 500, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'cozinha', woodType: 'laminada', thickness: '18mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'cozinha', woodType: 'laminada', thickness: '25mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },

  // Quarto
  { environment: 'quarto', woodType: 'branca', thickness: '15mm', pricePerM2: 500, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'quarto', woodType: 'branca', thickness: '18mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'quarto', woodType: 'branca', thickness: '25mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'quarto', woodType: 'madeirada', thickness: '15mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'quarto', woodType: 'madeirada', thickness: '18mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'quarto', woodType: 'madeirada', thickness: '25mm', pricePerM2: 800, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'quarto', woodType: 'laminada', thickness: '15mm', pricePerM2: 400, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'quarto', woodType: 'laminada', thickness: '18mm', pricePerM2: 500, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'quarto', woodType: 'laminada', thickness: '25mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },

  // Sala
  { environment: 'sala', woodType: 'branca', thickness: '15mm', pricePerM2: 550, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'sala', woodType: 'branca', thickness: '18mm', pricePerM2: 650, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'sala', woodType: 'branca', thickness: '25mm', pricePerM2: 750, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'sala', woodType: 'madeirada', thickness: '15mm', pricePerM2: 650, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'sala', woodType: 'madeirada', thickness: '18mm', pricePerM2: 750, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'sala', woodType: 'madeirada', thickness: '25mm', pricePerM2: 850, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'sala', woodType: 'laminada', thickness: '15mm', pricePerM2: 450, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'sala', woodType: 'laminada', thickness: '18mm', pricePerM2: 550, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'sala', woodType: 'laminada', thickness: '25mm', pricePerM2: 650, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },

  // Banheiro
  { environment: 'banheiro', woodType: 'branca', thickness: '15mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'banheiro', woodType: 'branca', thickness: '18mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'banheiro', woodType: 'branca', thickness: '25mm', pricePerM2: 800, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'banheiro', woodType: 'madeirada', thickness: '15mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'banheiro', woodType: 'madeirada', thickness: '18mm', pricePerM2: 800, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'banheiro', woodType: 'madeirada', thickness: '25mm', pricePerM2: 900, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'banheiro', woodType: 'laminada', thickness: '15mm', pricePerM2: 500, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'banheiro', woodType: 'laminada', thickness: '18mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'banheiro', woodType: 'laminada', thickness: '25mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },

  // Escritório
  { environment: 'escritorio', woodType: 'branca', thickness: '15mm', pricePerM2: 500, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'escritorio', woodType: 'branca', thickness: '18mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'escritorio', woodType: 'branca', thickness: '25mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'escritorio', woodType: 'madeirada', thickness: '15mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'escritorio', woodType: 'madeirada', thickness: '18mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'escritorio', woodType: 'madeirada', thickness: '25mm', pricePerM2: 800, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'escritorio', woodType: 'laminada', thickness: '15mm', pricePerM2: 400, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'escritorio', woodType: 'laminada', thickness: '18mm', pricePerM2: 500, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'escritorio', woodType: 'laminada', thickness: '25mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },

  // Área Externa
  { environment: 'area_externa', woodType: 'branca', thickness: '15mm', pricePerM2: 400, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'area_externa', woodType: 'branca', thickness: '18mm', pricePerM2: 500, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'area_externa', woodType: 'branca', thickness: '25mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'area_externa', woodType: 'madeirada', thickness: '15mm', pricePerM2: 500, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'area_externa', woodType: 'madeirada', thickness: '18mm', pricePerM2: 600, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'area_externa', woodType: 'madeirada', thickness: '25mm', pricePerM2: 700, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'area_externa', woodType: 'laminada', thickness: '15mm', pricePerM2: 300, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'area_externa', woodType: 'laminada', thickness: '18mm', pricePerM2: 400, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
  { environment: 'area_externa', woodType: 'laminada', thickness: '25mm', pricePerM2: 500, complexityMultipliers: { basic: 1.0, medium: 1.2, complex: 1.5 } },
];

async function seedPriceConfigs() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mf-planejados');
    console.log('Conectado ao MongoDB');

    // Limpar configurações existentes
    await PriceConfig.deleteMany({});
    console.log('Configurações existentes removidas');

    // Inserir novas configurações
    await PriceConfig.insertMany(initialPriceConfigs);
    console.log(`${initialPriceConfigs.length} configurações de preço inseridas com sucesso!`);

    // Fechar conexão
    await mongoose.connection.close();
    console.log('Conexão fechada');
  } catch (error) {
    console.error('Erro ao popular configurações de preço:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  seedPriceConfigs();
}

module.exports = seedPriceConfigs;

