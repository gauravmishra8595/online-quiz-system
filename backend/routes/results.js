const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Result = require('../models/Result');
const Category = require('../models/Category');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';


const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


router.post('/', auth, async (req, res) => {
  try {
    const { categoryId, score, total, answers } = req.body;
    const result = new Result({
      user: req.userId,
      category: categoryId,
      score, total, answers
    });
    await result.save();
    res.json({ message: 'Result saved', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/me', auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.userId }).populate('category', 'title slug color').sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/", async (req, res) => {
  try {
    const { score, total } = req.body;
    const result = new Result({ score, total });
    await result.save();
    res.json({ message: "Result saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving result" });
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results" });
  }
});

module.exports = router;
