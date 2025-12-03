require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// -----------------------------
// CORS setup for Vercel frontend
// -----------------------------
const allowedOrigins = [
  'https://online-quiz-system-7tsj.vercel.app', // your Vercel frontend
  'http://localhost:5173',                       // local Vite frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// -----------------------------
// Body parser
// -----------------------------
app.use(express.json());

// -----------------------------
// Logging requests (optional, debug)
app.use((req, res, next) => {
  console.log('Incoming:', req.method, req.url, req.body);
  next();
});

// -----------------------------
// Connect to MongoDB
// -----------------------------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/online_quiz_db';
connectDB(MONGO_URI);

// -----------------------------
// Routes
// -----------------------------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/results', require('./routes/results'));

// -----------------------------
// Test route
// -----------------------------
app.get('/', (req, res) => res.send('Quiz API running'));

// -----------------------------
// Start server
// -----------------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');


// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Incoming:", req.method, req.url, req.body);
//   next();
// });


// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/online_quiz_db';
// connectDB(MONGO_URI);

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/categories', require('./routes/categories'));
// app.use('/api/questions', require('./routes/questions'));
// app.use('/api/results', require('./routes/results'));

// app.get('/', (req, res) => res.send('Quiz API running'));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
