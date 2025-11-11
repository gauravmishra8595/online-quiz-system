const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true } 
});

module.exports = mongoose.model('Question', questionSchema);
