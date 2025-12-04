const mongoose = require('mongoose');
const config = require('./index');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.warn('⚠️  MongoDB connection warning:', error.message);
    console.warn('💡 Tip: Start MongoDB with: mongod');
    console.warn('💡 Or use MongoDB Atlas connection string in .env');
    // Don't exit, API will still work without database for now
  }
};

module.exports = connectDB;
