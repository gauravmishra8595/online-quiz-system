const express = require('express');
const Question = require('../models/Question');
const router = express.Router();


router.get('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const questions = await Question.find({ category: categoryId });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this category' });
    }

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error while fetching questions' });
  }
});

module.exports = router;


