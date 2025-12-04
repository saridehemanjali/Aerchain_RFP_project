# Backend Architecture Summary

## What Was Built

A complete, production-ready backend for the Aerchain RFP Management System with the following components:

### 1. Database Layer (MongoDB)

**Models:**
- **Vendor** - Stores vendor information, contact details, ratings
- **RFP** - Stores Request for Proposal documents with structured and raw data
- **Proposal** - Stores vendor proposals with parsed data and AI scoring
- **Email** - Stores all email communications for audit trail

**Key Features:**
- Relationships between models (RFP → Vendors, RFP → Proposals)
- Soft deletes for vendors (isActive flag)
- Timestamps on all records
- Flexible schema for AI-parsed data

### 2. API Layer (Express Routes)

**RFP Endpoints:**
- Create RFP from natural language input
- List and retrieve RFPs
- Update RFP details
- Send RFPs to selected vendors
- Get proposals for RFP
- Compare proposals with AI recommendation

**Vendor Endpoints:**
- CRUD operations for vendors
- List active vendors
- Soft delete support

**Email Endpoints:**
- Fetch new emails from IMAP
- Get email details
- Query emails by RFP
- Get all inbound emails

### 3. Business Logic Layer (Controllers)

**RFP Controller:**
- Handles RFP creation workflow
- Manages vendor selection and sending
- Implements proposal comparison

**Vendor Controller:**
- Full vendor management
- Validation and error handling
- Soft delete implementation

**Email Controller:**
- Email fetching from IMAP
- Email querying and filtering
- Integration with AI parsing

### 4. Service Layer

**AI Service (aiService.js):**
- `parseNaturalLanguageRFP()` - Converts text to structured RFP
- `parseVendorResponse()` - Extracts data from proposal emails
- `generateProposalComparison()` - Scores and recommends vendors

Uses OpenAI GPT-4 for:
- Intent extraction
- Data parsing
- Recommendation generation

**Email Service (emailService.js):**
- `sendRFPEmail()` - Sends RFP to vendor via SMTP
- `sendProposalNotification()` - Notifies team of new proposals
- `verifyEmailConfig()` - Validates email setup

Uses Nodemailer with Gmail SMTP

**IMAP Service (imapService.js):**
- `fetchNewEmails()` - Retrieves unseen emails from Gmail IMAP
- Automatic vendor and RFP matching
- AI parsing integration
- Mark-as-read after processing

### 5. Configuration & Middleware

**Config Files:**
- `config/index.js` - Centralized environment configuration
- `config/database.js` - MongoDB connection setup
- `.env` - Environment variables template

**Middleware:**
- CORS configuration for frontend communication
- JSON body parser
- Error handling middleware

### 6. Frontend Integration

**API Service (src/services/apiService.js):**
- All API methods wrapped in a service class
- Error handling and JSON serialization
- Base URL configuration from `.env`
- Ready for Redux/Zustand integration

## Technology Stack

```
Frontend:
├── React 18
├── Vite (build tool)
├── Tailwind CSS
├── React Router
└── Custom API Service

Backend:
├── Node.js + Express
├── MongoDB + Mongoose
├── OpenAI API
├── Nodemailer (SMTP)
├── IMAP-Simple (email receiving)
└── Dotenv (config management)

Infrastructure:
├── Local: MongoDB + Node.js
└── Cloud: MongoDB Atlas + Heroku/AWS/DigitalOcean
```

## Data Flow

### RFP Creation Flow
```
User Input (Natural Language)
    ↓
API: POST /api/rfps/create
    ↓
AI Service: parseNaturalLanguageRFP()
    ↓
OpenAI GPT-4 processes text
    ↓
Structured RFP saved to MongoDB
    ↓
Response: Structured RFP + Original Input
```

### Email Sending Flow
```
Select Vendors + RFP
    ↓
API: POST /api/rfps/:id/send
    ↓
Email Service: sendRFPEmail()
    ↓
Nodemailer sends via Gmail SMTP
    ↓
Email record saved to MongoDB
    ↓
RFP status updated to "Sent"
```

### Email Receiving Flow
```
Vendor replies to email
    ↓
API: POST /api/emails/fetch
    ↓
IMAP Service: fetchNewEmails()
    ↓
Email retrieved from Gmail IMAP
    ↓
AI Service: parseVendorResponse()
    ↓
OpenAI extracts proposal data
    ↓
Email + Parsed data saved to MongoDB
    ↓
Proposal record created
```

### Proposal Comparison Flow
```
Multiple Proposals Received
    ↓
API: GET /api/rfps/:rfpId/compare
    ↓
AI Service: generateProposalComparison()
    ↓
OpenAI analyzes against RFP requirements
    ↓
Generates scores and recommendation
    ↓
Updates proposal scores in MongoDB
    ↓
Response: Comparison + Scores + Recommendation
```

## Security Considerations

✅ Environment variables for all secrets
✅ CORS configured for frontend domain
✅ Input validation on API endpoints
✅ MongoDB connection pooling
✅ Email credentials never in code
✅ API error messages don't leak sensitive info

⚠️ Before Production:
- Add JWT authentication
- Implement rate limiting
- Add request validation schemas
- Use HTTPS
- Secure MongoDB with authentication
- Add API key management
- Implement audit logging

## File Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── index.js         # Config variables
│   │   └── database.js      # MongoDB setup
│   ├── models/
│   │   ├── Vendor.js        # Vendor schema
│   │   ├── RFP.js           # RFP schema
│   │   ├── Proposal.js      # Proposal schema
│   │   └── Email.js         # Email schema
│   ├── controllers/
│   │   ├── rfpController.js     # RFP logic
│   │   ├── vendorController.js  # Vendor logic
│   │   └── emailController.js   # Email logic
│   ├── routes/
│   │   ├── rfpRoutes.js     # RFP endpoints
│   │   ├── vendorRoutes.js  # Vendor endpoints
│   │   └── emailRoutes.js   # Email endpoints
│   ├── services/
│   │   ├── aiService.js     # OpenAI integration
│   │   ├── emailService.js  # SMTP service
│   │   └── imapService.js   # IMAP service
│   ├── middleware/
│   │   └── errorHandler.js  # Error handling
│   └── server.js            # Main server file
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
└── README.md               # Backend documentation
```

## Key Features

✅ **Fully Functional API** - All CRUD operations implemented
✅ **AI Integration** - OpenAI GPT-4 for intelligent processing
✅ **Email Services** - Both sending (SMTP) and receiving (IMAP)
✅ **Database** - MongoDB with proper schema design
✅ **Error Handling** - Comprehensive error handling
✅ **Documentation** - README and code comments
✅ **Frontend Ready** - API Service layer for React integration
✅ **Configuration** - Environment-based config management
✅ **Security** - Secrets in .env, CORS configured

## Performance Considerations

- **MongoDB Indexes**: Recommended on frequently queried fields
- **Email Polling**: Currently on-demand, can add scheduled jobs
- **AI Rate Limiting**: OpenAI has rate limits, implement caching
- **Database Connection**: Mongoose connection pooling configured
- **Async Operations**: All I/O operations are non-blocking

## Testing the Backend

```bash
# Test server health
curl http://localhost:5000/api/health

# Create a vendor
curl -X POST http://localhost:5000/api/vendors \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Corp","email":"test@example.com"}'

# Create RFP from natural language
curl -X POST http://localhost:5000/api/rfps/create \
  -H "Content-Type: application/json" \
  -d '{"naturalLanguageInput":"I need laptops"}'

# Get all RFPs
curl http://localhost:5000/api/rfps
```

## Future Enhancements

- Add JWT authentication
- Implement user roles and permissions
- Add scheduled email checking (cron jobs)
- Implement proposal versioning
- Add reporting and analytics
- Real-time WebSocket notifications
- File upload support for attachments
- Vendor rating system
- Compliance and audit trails
- Multi-user support
- Custom approval workflows

## Integration with Frontend

The frontend is ready to use the backend via `src/services/apiService.js`:

```javascript
import APIService from './services/apiService';

// Create RFP
const rfpResponse = await APIService.createRFPFromNaturalLanguage(input);

// Get vendors
const vendors = await APIService.getAllVendors();

// Send RFP to vendors
await APIService.sendRFPToVendors(rfpId, vendorIds);

// Compare proposals
const comparison = await APIService.compareProposals(rfpId);
```

All API calls handle errors and return JSON responses.

## Deployment Options

1. **Heroku** (Recommended for beginners)
   ```bash
   heroku create your-app-name
   heroku addons:create mongolab:sandbox
   git push heroku main
   ```

2. **AWS** (Scalable)
   - EC2 for Node.js
   - RDS/DocumentDB for database
   - SES for email

3. **DigitalOcean** (Cost-effective)
   - Droplet for Node.js
   - Managed Database for MongoDB
   - Simple deployment process

4. **Vercel + Serverless** (Experimental)
   - API routes as serverless functions
   - Database on Atlas

## Support Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Nodemailer Documentation](https://nodemailer.com/)

---

**Status**: ✅ Complete and Ready for Development
**Last Updated**: December 4, 2025
**Version**: 1.0.0
