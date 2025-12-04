# Aerchain RFP Management System - Backend Setup Guide

## Overview

This is the backend API server for the Aerchain RFP (Request for Proposal) Management System. It provides:

- **RFP Management**: Create RFPs from natural language, store, and manage them
- **Vendor Management**: Maintain vendor database and contact information
- **Email Integration**: Send RFPs via email and receive vendor responses
- **AI Processing**: Parse natural language inputs and vendor responses using OpenAI/Claude
- **Proposal Comparison**: Generate AI-powered comparisons and recommendations

## Prerequisites

- Node.js 14+ and npm
- MongoDB (local or Atlas)
- OpenAI API key or Anthropic API key
- Gmail account with app-specific password (for email functionality)

## Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the backend folder with:

   ```env
   # Server
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # Database
   MONGODB_URI=mongodb://localhost:27017/aerchain
   # For MongoDB Atlas: mongodb+srv://user:password@cluster.mongodb.net/aerchain

   # Email (Gmail SMTP/IMAP)
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=your-app-specific-password
   IMAP_HOST=imap.gmail.com
   IMAP_PORT=993
   IMAP_USER=your-email@gmail.com
   IMAP_PASSWORD=your-app-specific-password

   # AI
   OPENAI_API_KEY=sk-...

   # Email Service
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM_EMAIL=your-email@gmail.com
   SMTP_FROM_NAME=Aerchain RFP System
   ```

## Email Setup (Gmail)

1. **Enable 2-Factor Authentication** in Gmail settings
2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password
   - Use this in `GMAIL_PASSWORD` and `SMTP_PASS`

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### RFP Management

- `POST /api/rfps/create` - Create RFP from natural language
- `GET /api/rfps` - Get all RFPs
- `GET /api/rfps/:id` - Get RFP details
- `PUT /api/rfps/:id` - Update RFP
- `POST /api/rfps/:id/send` - Send RFP to vendors
- `GET /api/rfps/:id/proposals` - Get proposals for RFP
- `GET /api/rfps/:rfpId/compare` - Compare proposals with AI

### Vendor Management

- `GET /api/vendors` - Get all vendors
- `POST /api/vendors` - Create vendor
- `GET /api/vendors/:id` - Get vendor details
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Email Management

- `POST /api/emails/fetch` - Fetch new emails from IMAP
- `GET /api/emails/:id` - Get email details
- `GET /api/emails/rfp/:rfpId` - Get emails for RFP
- `GET /api/emails/inbound/all` - Get all inbound emails

## Database Schema

### Vendor
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  website: String,
  category: String,
  rating: Number (0-5),
  isActive: Boolean,
  contactPerson: String,
  notes: String
}
```

### RFP
```javascript
{
  title: String,
  description: String,
  requirements: [String],
  budget: { amount: Number, currency: String },
  deadline: Date,
  deliveryDate: Date,
  paymentTerms: String,
  warranty: String,
  status: String (Draft/Sent/In Review/Closed/Awarded),
  selectedVendors: [ObjectId],
  rawInput: String,
  structuredData: Object
}
```

### Proposal
```javascript
{
  rfpId: ObjectId,
  vendorId: ObjectId,
  status: String,
  submissionDate: Date,
  pricing: { totalPrice, currency, breakdown },
  deliveryTerms: String,
  paymentTerms: String,
  warranty: String,
  score: Number (0-100),
  evaluation: String,
  parsedData: Object
}
```

### Email
```javascript
{
  messageId: String,
  fromEmail: String,
  toEmail: String,
  subject: String,
  body: String,
  htmlBody: String,
  rfpId: ObjectId,
  vendorId: ObjectId,
  type: String (Outbound/Inbound),
  status: String,
  processingStatus: String,
  aiParsedData: Object
}
```

## AI Features

### Natural Language RFP Creation
Converts user description to structured RFP data using OpenAI GPT-4:
- Extracts requirements, budget, deadlines, terms
- Generates structured proposal template

### Vendor Response Parsing
Automatically extracts proposal data from emails:
- Pricing information
- Delivery terms
- Payment conditions
- Warranty details
- Key highlights and concerns

### Proposal Comparison
AI-powered comparison and recommendation:
- Scores each proposal
- Identifies best fit
- Explains decision reasoning
- Flags potential risks

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or use MongoDB Atlas connection string
- Check `MONGODB_URI` in `.env`

**Email Not Sending:**
- Verify Gmail app password is correct
- Enable "Less secure app access" if needed
- Check sender email and SMTP settings

**AI API Errors:**
- Verify OpenAI API key is valid
- Check API account has available credits
- Monitor rate limits

**IMAP Connection Issues:**
- Gmail requires app-specific password, not regular password
- Ensure "Less secure app access" is enabled
- Check if 2FA is enabled

## Development

The backend uses:
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email sending
- **IMAP-Simple** - Email receiving
- **OpenAI** - AI/LLM integration

## Deployment

For production:

1. Use MongoDB Atlas for database
2. Set `NODE_ENV=production`
3. Use environment-specific `.env` file
4. Deploy to Heroku, AWS, or similar
5. Update `FRONTEND_URL` to production domain

Example Heroku deployment:
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your-atlas-uri
heroku config:set OPENAI_API_KEY=your-key
git push heroku main
```

## License

ISC

## Support

For issues, check:
- Backend logs in console
- MongoDB database for data integrity
- SMTP/IMAP configuration
- API response in browser DevTools
