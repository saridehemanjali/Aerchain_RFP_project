# Testing API with Thunder Client (No MongoDB Needed)

## ✅ What You Can Do Right Now

**Good news!** You can test the API **without MongoDB**. The API will still work - it just won't persist data to a database. It's perfect for testing!

## 🚀 Setup

### Step 1: Backend is Already Running
Your backend is running on `http://localhost:5000`

Check the terminal - you should see:
```
Server is running on port 5000
Environment: development
```

### Step 2: Open Thunder Client in VS Code
1. Click the **Thunder Client** icon in the left sidebar (looks like a lightning bolt)
2. Click **Collections** tab
3. You'll see **Aerchain RFP API** collection already loaded

## 📝 Available Test Requests

### 1. ✅ Health Check
**Purpose:** Verify backend is running

```
GET http://localhost:5000/api/health
```

**Expected Response:**
```json
{ "status": "Server is running" }
```

---

### 2. 🏢 Get All Vendors
**Purpose:** List all vendors (empty at first)

```
GET http://localhost:5000/api/vendors
```

**Expected Response:**
```json
{
  "success": true,
  "data": []
}
```

---

### 3. ➕ Create a Vendor
**Purpose:** Add a new vendor

```
POST http://localhost:5000/api/vendors
Content-Type: application/json

{
  "name": "TechCorp Solutions",
  "email": "contact@techcorp.com",
  "phone": "+1-555-0123",
  "website": "https://techcorp.com",
  "category": "Hardware",
  "contactPerson": "John Smith",
  "notes": "Reliable vendor"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "TechCorp Solutions",
    "email": "contact@techcorp.com",
    ...
  }
}
```

---

### 4. 📋 Create RFP from Natural Language
**Purpose:** Test AI parsing (requires OpenAI key in .env)

```
POST http://localhost:5000/api/rfps/create
Content-Type: application/json

{
  "naturalLanguageInput": "I need 20 laptops with 16GB RAM, 500GB SSD. Budget $30,000. Delivery in 30 days. Net 30 terms, 1 year warranty."
}
```

**Expected Response:**
```json
{
  "success": true,
  "rfp": {
    "_id": "...",
    "title": "...",
    "requirements": [...],
    "status": "Draft"
  },
  "structuredData": {
    "title": "...",
    "requirements": [...],
    "budget": { "amount": 30000, "currency": "USD" }
  }
}
```

---

### 5. 📧 Get All Emails
**Purpose:** View all received emails (empty without IMAP setup)

```
GET http://localhost:5000/api/emails/inbound/all
```

**Expected Response:**
```json
{
  "success": true,
  "data": []
}
```

---

## 🧪 How to Use Thunder Client

### To Run a Request:
1. Click on a request name in the collection
2. Review the URL, method, and body
3. Click the **Send** button (or press Ctrl+Enter)
4. See the response on the right panel

### To Create Your Own Request:
1. Click **+** to create new request
2. Enter URL: `http://localhost:5000/api/...`
3. Select method (GET, POST, etc.)
4. Add body (for POST requests)
5. Click Send

---

## 📊 Test Workflow

Try this sequence:

1. **Health Check** → Verify server is running
2. **Create Vendor** → Add a vendor
3. **Get All Vendors** → See the vendor you created
4. **Create RFP** → Create an RFP (if OpenAI key is set)
5. **Get All RFPs** → See the RFP you created

---

## ⚙️ Optional: Set Up MongoDB Later

When you want to **persist data permanently**, you can:

### Option A: Local MongoDB
```bash
# Install MongoDB
# https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod

# Update backend/.env
MONGODB_URI=mongodb://localhost:27017/aerchain
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Paste in `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/aerchain
   ```

---

## 🔑 Optional: Add OpenAI for AI Features

To test RFP creation from natural language:

1. Get API key from https://platform.openai.com/api-keys
2. Add to `backend/.env`:
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Restart backend: `node src/server.js`
4. Try "Create RFP from Natural Language" request

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Make sure backend is running (`node src/server.js`) |
| 404 error | Check the URL spelling and method (GET/POST) |
| Database error | MongoDB isn't needed - API still works! |
| AI error | Add OPENAI_API_KEY to `.env` or remove that field |

---

## 💡 Tips

- **Data is temporary** - Without MongoDB, data resets when backend restarts
- **No email needed** - IMAP/SMTP require Gmail setup, can skip for now
- **API works fine** - Test all endpoints without external services
- **Perfect for development** - This is exactly how you should start!

---

## 📚 Next Steps

1. ✅ Test all endpoints in Thunder Client
2. ✅ Create some vendors and RFPs
3. ✅ Try the frontend at http://localhost:5173
4. ⏭️ When ready, set up MongoDB for persistence
5. ⏭️ Add OpenAI for AI features
6. ⏭️ Configure Gmail for email features

**You're all set!** Start testing in Thunder Client now! 🚀
