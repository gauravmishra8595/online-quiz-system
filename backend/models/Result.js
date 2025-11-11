const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  answers: [{ questionId: String, selectedIndex: Number, correctIndex: Number }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
