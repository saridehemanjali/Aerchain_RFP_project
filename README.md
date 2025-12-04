# Aerchain - AI-Powered RFP Management System

A comprehensive web application for managing Request for Proposals (RFPs) with AI-powered processing, vendor management, and intelligent proposal comparison.

## 🎯 Features

### Core Functionality
- ✅ **Natural Language RFP Creation** - Describe your procurement needs in plain English
- ✅ **Vendor Management** - Maintain and organize vendor database
- ✅ **Email Integration** - Send RFPs via email and receive vendor responses
- ✅ **AI Response Parsing** - Automatically extract data from vendor emails
- ✅ **Smart Comparison** - AI-powered proposal comparison and recommendations
- ✅ **RFP Tracking** - Monitor status of all RFPs and proposals

## 🏗️ Architecture

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation

### Backend
- **Node.js + Express** API server
- **MongoDB** database
- **OpenAI** for AI processing
- **Email Service** for vendor communication

## 📋 Prerequisites

- Node.js 14+ and npm
- MongoDB (local or Atlas)
- OpenAI API key
- Gmail account with app-specific password (for email)

## 🛠️ Installation

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update `.env`:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Create `.env` file:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/aerchain
   OPENAI_API_KEY=sk-...
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   IMAP_USER=your-email@gmail.com
   IMAP_PASSWORD=your-app-password
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start backend:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
Aerchain/
├── src/                          # React frontend
│   ├── components/               # UI components
│   ├── pages/                    # Page components
│   ├── services/                 # API service layer
│   └── styles/                   # Styling
├── backend/                      # Node.js API server
│   ├── src/
│   │   ├── routes/              # API routes
│   │   ├── controllers/         # Request handlers
│   │   ├── models/              # Database schemas
│   │   ├── services/            # Business logic
│   │   └── config/              # Configuration
│   └── .env                     # Backend config
└── README.md
```

## 🚀 Usage

### Creating an RFP
1. Go to **RFP Creation Workspace**
2. Describe your needs in natural language
3. System AI structures the RFP
4. Select vendors and send

### Managing Vendors
1. Go to **Vendor Management Console**
2. Add/edit vendor information
3. Assign categories and ratings

### Processing Proposals
1. Vendors reply via email
2. Go to **Email Processing Center**
3. System auto-parses responses
4. Review extracted data

### Comparing Proposals
1. Go to **RFP Status Tracking Hub**
2. View proposals comparison
3. Get AI recommendation

## 🤖 AI Features

- **Natural Language Processing**: Convert descriptions to structured RFPs
- **Email Parsing**: Auto-extract proposal data from vendor emails
- **Smart Comparison**: Score and recommend best vendor
- **Risk Analysis**: Identify potential issues

## 📊 API Endpoints

### RFP Management
- `POST /api/rfps/create` - Create RFP
- `GET /api/rfps` - List RFPs
- `POST /api/rfps/:id/send` - Send to vendors
- `GET /api/rfps/:rfpId/compare` - Compare proposals

### Vendors
- `GET /api/vendors` - List vendors
- `POST /api/vendors` - Create vendor

### Emails
- `POST /api/emails/fetch` - Fetch responses
- `GET /api/emails/inbound/all` - Get all emails

See [Backend README](./backend/README.md) for complete API documentation.

## 📧 Email Setup (Gmail)

1. Enable 2FA: https://myaccount.google.com
2. Generate app password: https://myaccount.google.com/apppasswords
3. Use the 16-char password in backend `.env`

## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

- Powered by React and Vite
- Styled with Tailwind CSS


