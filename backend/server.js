require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();


const allowedOrigins = [
  "https://online-quiz-system-7tsj.vercel.app", 
  "http://localhost:5173"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;


  if (
    allowedOrigins.includes(origin) ||
    /\.vercel\.app$/.test(origin)
  ) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


app.use(express.json());


app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url, req.body);
  next();
});


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/results', require('./routes/results'));

app.get('/', (req, res) => {
  res.send("Quiz API running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


