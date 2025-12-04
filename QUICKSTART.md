# 🚀 Aerchain - Quick Start Guide

## What's Included

Your Aerchain RFP Management System now has:

✅ **Complete Backend API** with Express.js and MongoDB
✅ **AI Integration** with OpenAI for intelligent processing
✅ **Email Services** for sending RFPs and receiving proposals
✅ **Database Models** for RFPs, Vendors, Proposals, and Emails
✅ **API Service Layer** for frontend connectivity
✅ **Comprehensive Documentation**

## Project Layout

```
Aerchain/
├── src/                    # React Frontend
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database schemas
│   │   ├── services/     # AI, Email, IMAP services
│   │   ├── config/       # Configuration
│   │   └── server.js     # Main server
│   └── .env              # Backend config
├── .env                  # Frontend config
├── README.md             # Full documentation
└── backend/README.md     # Backend documentation
```

## Setup Instructions

### 1️⃣ Prerequisites

- **Node.js 14+** - Download from https://nodejs.org
- **MongoDB** - Either:
  - Local: Install from https://docs.mongodb.com/manual/installation/
  - Cloud: Create free cluster at https://www.mongodb.com/cloud/atlas
- **OpenAI API Key** - Get from https://platform.openai.com/api-keys
- **Gmail Account** - For email functionality

### 2️⃣ Frontend Setup

```bash
# Install frontend dependencies
npm install

# Update .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend dev server
npm run dev

# Frontend will run on http://localhost:5173
```

### 3️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install backend dependencies
npm install

# Create .env file with your credentials
cat > .env << 'EOF'
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/aerchain
OPENAI_API_KEY=sk-your-key-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
IMAP_USER=your-email@gmail.com
IMAP_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
EOF

# Start backend dev server
npm run dev

# Backend will run on http://localhost:5000
```

### 4️⃣ Email Setup (Gmail)

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to https://myaccount.google.com/apppasswords
4. Select: Mail → Windows Computer
5. Copy the 16-character password
6. Paste it in backend `.env` as `SMTP_PASS` and `IMAP_PASSWORD`

### 5️⃣ Database Setup

**Option A: Local MongoDB**
```bash
# Windows: MongoDB should be running as service
# Verify: mongosh
# Use URI: mongodb://localhost:27017/aerchain
```

**Option B: MongoDB Atlas (Recommended)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## 🎯 Testing the System

### Test Endpoints

1. **Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Create Vendor:**
   ```bash
   curl -X POST http://localhost:5000/api/vendors \
     -H "Content-Type: application/json" \
     -d '{"name":"TechCorp","email":"contact@techcorp.com"}'
   ```

3. **Create RFP from Natural Language:**
   ```bash
   curl -X POST http://localhost:5000/api/rfps/create \
     -H "Content-Type: application/json" \
     -d '{"naturalLanguageInput":"I need 10 laptops with 16GB RAM and delivery in 30 days. Budget is $20,000"}'
   ```

## 📱 Using the Application

### Frontend Features

1. **RFP Creation Workspace** (`/rfp-creation-workspace`)
   - Describe procurement needs
   - System converts to structured RFP
   - Send to vendors

2. **Vendor Management Console** (`/vendor-management-console`)
   - Add/edit vendors
   - View vendor history
   - Rate vendors

3. **Email Processing Center** (`/email-processing-center`)
   - View vendor responses
   - Auto-parsed proposal data
   - Review extracted information

4. **RFP Status Tracking Hub** (`/rfp-status-tracking-hub`)
   - Track RFP status
   - View proposals
   - Compare with AI recommendation

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (backend/.env)
```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/aerchain
# Or: mongodb+srv://user:pass@cluster.mongodb.net/aerchain

# AI
OPENAI_API_KEY=sk-...

# Email SMTP (Sending)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Aerchain RFP System

# Email IMAP (Receiving)
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=your-email@gmail.com
IMAP_PASSWORD=your-app-password
```

## 📚 API Reference

### RFP Endpoints
- `POST /api/rfps/create` - Create RFP from text
- `GET /api/rfps` - List all RFPs
- `GET /api/rfps/:id` - Get RFP details
- `PUT /api/rfps/:id` - Update RFP
- `POST /api/rfps/:id/send` - Send to vendors
- `GET /api/rfps/:id/proposals` - Get proposals
- `GET /api/rfps/:rfpId/compare` - Compare proposals

### Vendor Endpoints
- `GET /api/vendors` - List vendors
- `POST /api/vendors` - Create vendor
- `GET /api/vendors/:id` - Get vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Email Endpoints
- `POST /api/emails/fetch` - Fetch new emails
- `GET /api/emails/:id` - Get email
- `GET /api/emails/rfp/:rfpId` - Get RFP emails
- `GET /api/emails/inbound/all` - All inbound

## 🤖 AI Features

The system uses OpenAI GPT-4 for:

1. **RFP Creation** - Convert natural language to structured RFP
2. **Email Parsing** - Extract proposal data from vendor emails
3. **Proposal Comparison** - Score vendors and recommend best fit

Example:
```
User: "I need 20 laptops with 16GB RAM, 500GB SSD for $50k"
↓
AI parses to:
{
  title: "Laptop Procurement",
  requirements: ["16GB RAM", "500GB SSD", "20 units"],
  budget: { amount: 50000, currency: "USD" }
}
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| API not connecting | Check `VITE_API_URL` in frontend `.env` |
| MongoDB error | Start MongoDB service or use Atlas URI |
| Email not sending | Verify Gmail app password and 2FA enabled |
| AI errors | Check OpenAI API key and account balance |
| CORS errors | Verify `FRONTEND_URL` in backend `.env` |

## 📖 More Information

- Full README: See `README.md`
- Backend docs: See `backend/README.md`
- Database schema: See `backend/README.md#database-schema`

## ✨ Next Steps

1. Customize the UI colors in `tailwind.config.js`
2. Add authentication (JWT tokens)
3. Deploy frontend to Vercel/Netlify
4. Deploy backend to Heroku/AWS
5. Set up automated email fetching with cron jobs
6. Add user roles and permissions

## 🎉 You're All Set!

Your Aerchain RFP Management System is ready to use. Start with:

1. Terminal 1 (Frontend):
   ```bash
   npm run dev
   ```

2. Terminal 2 (Backend):
   ```bash
   cd backend
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

Happy coding! 🚀
