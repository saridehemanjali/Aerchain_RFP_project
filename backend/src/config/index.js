require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/aerchain',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Email Configuration
  EMAIL: {
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: process.env.SMTP_PORT || 587,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
    SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || 'Aerchain RFP System',
    IMAP_HOST: process.env.IMAP_HOST || 'imap.gmail.com',
    IMAP_PORT: process.env.IMAP_PORT || 993,
    IMAP_USER: process.env.IMAP_USER,
    IMAP_PASSWORD: process.env.IMAP_PASSWORD,
  },
  
  // AI Configuration
  AI: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  }
};
