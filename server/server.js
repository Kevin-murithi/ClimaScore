const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes')
const climaRoutes = require('./routes/climaRoutes')
const farmerRoutes = require('./routes/farmerRoutes')
const lenderRoutes = require('./routes/lenderRoutes')
const sensorRoutes = require('./routes/sensorRoutes')
const aiRoutes = require('./routes/ai')
const { connectDB } = require('./config/db.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { checkAuth, requireRole } = require('./middleware/authMiddleware.js');

const app = express();
// Trust reverse proxy (Vercel/NGINX/etc.) so Secure cookies are respected
app.set('trust proxy', 1)
app.use(express.json())
app.use(cookieParser());
const corsOptions = {
  origin: ['http://localhost:5174', 'http://localhost:5173', 'https://clima-score.vercel.app'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

connectDB();
  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })

app.use(authRoutes);
app.use('/api/ai', aiRoutes);
app.use(requireRole());
app.use(climaRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/lender', lenderRoutes);
app.use('/api/sensors', sensorRoutes);
app.get('/check-auth', checkAuth, (req, res) => {
    res.status(200).json({ isAuthenticated: true });
});
