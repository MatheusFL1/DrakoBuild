const mongoose = require('mongoose');

const gpuConfigSchema = new mongoose.Schema({
  categoria: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Highend', 'Enthusiastic'], 
    required: true,
    unique: true  
  },
  placaVideo: {
    type: String,
    required: true
  },
  fonte: {
    type: String,
    required: true
  }
});

const GPU = mongoose.model('GPU', gpuConfigSchema);

module.exports = GPU;
