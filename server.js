const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const scrapeProducts = require('./scraping'); 

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const cpuRoutes = require('./routes/cpu');
app.use('/api', cpuRoutes);  

const gpuRoutes = require('./routes/gpu');
app.use('/', gpuRoutes);

const configuracoesRoutes = require('./routes/configuracoes'); 
app.use('/', configuracoesRoutes); 

app.post('/scrape', async (req, res) => {
  const { configArray } = req.body;
  try {
    const produtosEncontrados = await scrapeProducts(configArray);
    res.json(produtosEncontrados);
  } catch (error) {
    console.error('Erro ao realizar o scraping:', error);
    res.status(500).send('Erro ao realizar o scraping');
  }
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
