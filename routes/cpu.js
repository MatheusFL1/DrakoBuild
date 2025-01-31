const express = require('express');
const CPU = require('../models/CPU');
const router = express.Router();

router.post('/configuracao', async (req, res) => {
  const { categoria, processador, placaMae, memoria, cooler } = req.body;

  const categoriasPermitidas = ['Low', 'Medium', 'High', 'Enthusiastic'];
  if (!categoriasPermitidas.includes(categoria)) {
    return res.status(400).send('Categoria inválida');
  }

  try {
    const cpuConfig = new CPU({
      categoria,
      processador,
      placaMae,
      memoria,
      cooler
    });
    await cpuConfig.save();

    res.status(201).send('Configuração de hardware inserida com sucesso!');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send('Já existe uma configuração com essa categoria.');
    }
    res.status(400).send('Erro ao inserir configuração: ' + error.message);
  }
});

router.put('/configuracao/:id', async (req, res) => {
  const { id } = req.params;
  const { categoria, processador, placaMae, memoria, cooler } = req.body;

  const categoriasPermitidas = ['Low', 'Medium', 'High', 'Enthusiastic'];
  if (!categoriasPermitidas.includes(categoria)) {
    return res.status(400).send('Categoria inválida');
  }

  try {
    const categoriaExistente = await CPU.findOne({ categoria });
    if (categoriaExistente && categoriaExistente._id.toString() !== id) {
      return res.status(400).send('Já existe uma configuração com essa categoria.');
    }

    const updatedConfig = await CPU.findByIdAndUpdate(id, {
      categoria,
      processador,
      placaMae,
      memoria,
      cooler
    }, { new: true });

    if (!updatedConfig) {
      return res.status(404).send('Configuração não encontrada');
    }

    res.status(200).json(updatedConfig);
  } catch (error) {
    res.status(400).send('Erro ao modificar configuração: ' + error.message);
  }
});

router.get('/configuracao', async (req, res) => {
  try {
    const configuracoes = await CPU.find(); 
    res.status(200).json(configuracoes); 
  } catch (error) {
    res.status(400).send('Erro ao buscar configurações: ' + error.message);
  }
});

router.get('/configuracao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const configuracao = await CPU.findById(id); 
    if (!configuracao) {
      return res.status(404).send('Configuração não encontrada');
    }
    res.status(200).json(configuracao); 
  } catch (error) {
    res.status(400).send('Erro ao buscar configuração: ' + error.message);
  }
});

router.delete('/configuracao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedConfig = await CPU.findByIdAndDelete(id);
    if (!deletedConfig) {
      return res.status(404).send('Configuração não encontrada para exclusão');
    }
    res.status(200).send('Configuração excluída com sucesso');
  } catch (error) {
    res.status(400).send('Erro ao excluir configuração: ' + error.message);
  }
});

router.get('/configuracao/categoria/:categoria', async (req, res) => {
  const { categoria } = req.params; 

  try {
    const configuracoes = await CPU.find({ categoria }); 
    if (!configuracoes.length) {
      return res.status(404).send('Nenhuma configuração encontrada para esta categoria');
    }
    res.status(200).json(configuracoes); 
  } catch (error) {
    res.status(400).send('Erro ao buscar configurações por categoria: ' + error.message);
  }
});

router.put('/configuracao/categoria/:categoria', async (req, res) => {
  const { categoria } = req.params; 
  const { processador, placaMae, memoria, cooler } = req.body; 

  try {
    const updatedConfig = await CPU.findOneAndUpdate({ categoria }, { 
      processador,
      placaMae,
      memoria,
      cooler
    }, { new: true });

    if (!updatedConfig) {
      return res.status(404).send('Configuração não encontrada para a categoria especificada');
    }

    res.status(200).json(updatedConfig); 
  } catch (error) {
    res.status(400).send('Erro ao modificar configuração por categoria: ' + error.message);
  }
});

module.exports = router;
