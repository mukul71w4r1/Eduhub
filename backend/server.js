const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const platformRoutes = require('./routes/platformRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eduhub';

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/platforms', platformRoutes);

// Fallback legacy endpoints (for existing frontend compat)
// The frontend directly requests POST /api/login and POST /api/register
app.post('/api/login', (req, res, next) => {
  req.url = '/login';
  app._router.handle(req, res, next);
});
app.post('/api/register', (req, res, next) => {
  req.url = '/register';
  app._router.handle(req, res, next);
});

// Database connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully.');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed. Make sure MongoDB is running locally or MONGODB_URI is set.');
    console.error(error.message);
  });
