const express = require('express');
const router = express.Router();
const CPU = require('../models/CPU');
const GPU = require('../models/Gpu');

router.post('/configuracoes', async (req, res) => {
    const { kit, placavideo } = req.body;

    try {
        const cpuConfig = await CPU.findOne({ categoria: kit });
        if (!cpuConfig) {
            return res.status(404).json({ error: 'Configuração de CPU não encontrada.' });
        }

        const gpuConfig = await GPU.findOne({ categoria: placavideo });
        if (!gpuConfig) {
            return res.status(404).json({ error: 'Configuração de GPU não encontrada.' });
        }

        res.json({
            cpu: {
                processador: cpuConfig.processador,
                placaMae: cpuConfig.placaMae,
                memoria: cpuConfig.memoria,
                cooler: cpuConfig.cooler,
            },
            gpu: {
                placaVideo: gpuConfig.placaVideo,
                fonte: gpuConfig.fonte,
            },
        });
    } catch (error) {
        console.error('Erro ao buscar configurações:', error);
        res.status(500).json({ error: 'Erro no servidor.' });
    }
});

module.exports = router;
