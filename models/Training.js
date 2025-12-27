const mongoose = require('mongoose');
const TrainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['Iniciante', 'Intermediário', 'Avançado'], default: 'Iniciante' },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Training', TrainingSchema);
