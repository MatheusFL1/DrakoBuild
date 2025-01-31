const mongoose = require('mongoose');

const cpuConfigSchema = new mongoose.Schema({
  categoria: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Enthusiastic'],  
    required: true,
    unique: true  
  },
  processador: {
    type: String,
    required: true
  },
  placaMae: {
    type: String,
    required: true
  },
  memoria: {
    type: String,
    required: true
  },
  cooler: {
    type: String,
    required: true
  }
});

const CPU = mongoose.model('CPU', cpuConfigSchema);

module.exports = CPU;
