const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database (with fallback)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/mandi', require('./routes/mandiRoutes'));
app.use('/api/lots', require('./routes/lotRoutes'));
app.use('/api/match', require('./routes/matchRoutes'));
app.use('/api/logistics', require('./routes/logisticsRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/grievance', require('./routes/grievanceRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'AgriMarket Price Discovery & Linkage API',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🌾 AgriMarket Backend Running on http://localhost:${PORT}`);
  console.log(`🌾 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
