const express = require('express');
const GPU = require('../models/Gpu');
const router = express.Router();

router.post('/videocard', async (req, res) => {
  const { categoria, placaVideo, fonte} = req.body;


  const categoriasPermitidas = ['Low', 'Medium', 'High', 'Highend', 'Enthusiastic'];
  if (!categoriasPermitidas.includes(categoria)) {
    return res.status(400).send('Categoria inválida');
  }

  try {
    const gpuConfig = new GPU({
      categoria,
      placaVideo,
      fonte
    });
    await gpuConfig.save();

    res.status(201).send('Placa de video inserida com sucesso!');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send('Já existe uma configuração com essa categoria.');
    }
    res.status(400).send('Erro ao inserir placa de video: ' + error.message);
  }
});

router.put('/videocard/:id', async (req, res) => {
  const { id } = req.params;
  const { categoria, placaVideo, fonte} = req.body;

  const categoriasPermitidas = ['Low', 'Medium', 'High', 'Highend', 'Enthusiastic'];
  if (!categoriasPermitidas.includes(categoria)) {
    return res.status(400).send('Categoria inválida');
  }

  try {
    const categoriaExistente = await GPU.findOne({ categoria });
    if (categoriaExistente && categoriaExistente._id.toString() !== id) {
      return res.status(400).send('Já existe uma configuração com essa categoria.');
    }

    const updatedGpu = await GPU.findByIdAndUpdate(id, {
      placaVideo,
      fonte
    }, { new: true });

    if (!updatedGpu) {
      return res.status(404).send('Placa de video não encontrada');
    }

    res.status(200).json(updatedGpu);
  } catch (error) {
    res.status(400).send('Erro ao modificar Placa de video: ' + error.message);
  }
});

router.get('/videocard', async (req, res) => {
  try {
    const videocards = await GPU.find(); 
    res.status(200).json(videocards); 
  } catch (error) {
    res.status(400).send('Erro ao buscar Placa de video: ' + error.message);
  }
});

router.get('/videocard/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const videocard = await GPU.findById(id); 
    if (!videocard) {
      return res.status(404).send('Placa de video não encontrada');
    }
    res.status(200).json(videocard); 
  } catch (error) {
    res.status(400).send('Erro ao buscar Placa de video: ' + error.message);
  }
});

router.delete('/videocard/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGpu = await GPU.findByIdAndDelete(id);
    if (!deletedGpu) {
      return res.status(404).send('Placa de video não encontrada para exclusão');
    }
    res.status(200).send('Placa de video excluída com sucesso');
  } catch (error) {
    res.status(400).send('Erro ao excluir Placa de video: ' + error.message);
  }
});

router.get('/videocard/categoria/:categoria', async (req, res) => {
  const { categoria } = req.params; 

  try {
    const videocards = await GPU.find({ categoria }); 
    if (!videocards.length) {
      return res.status(404).send('Nenhuma Placa de video encontrada para esta categoria');
    }
    res.status(200).json(videocards); 
  } catch (error) {
    res.status(400).send('Erro ao buscar Placa de video por categoria: ' + error.message);
  }
});

router.put('/videocard/categoria/:categoria', async (req, res) => {
  const { categoria } = req.params; 
  const { placaVideo, fonte} = req.body; 

  try {
    const updatedGpu = await GPU.findOneAndUpdate({ categoria }, { 
      placaVideo,
      fonte
    }, { new: true });

    if (!updatedGpu) {
      return res.status(404).send('Placa de video não encontrada para a categoria especificada');
    }

    res.status(200).json(updatedGpu);
  } catch (error) {
    res.status(400).send('Erro ao modificar Placa de video por categoria: ' + error.message);
  }
});

module.exports = router;
