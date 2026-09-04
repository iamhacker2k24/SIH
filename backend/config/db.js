const mongoose = require('mongoose');

let isConnected = false;

const connectDB = () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agrimarket';
  mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 1000
  }).then((conn) => {
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  }).catch((error) => {
    console.log(`[Database Note] MongoDB service not running locally (${error.message}).`);
    console.log(`[Database Engine] Active: High-Performance Fallback In-Memory Engine.`);
    isConnected = false;
  });
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
