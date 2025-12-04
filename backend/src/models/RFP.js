const mongoose = require('mongoose');

const rfpSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    requirements: {
      type: [String],
      default: [],
    },
    budget: {
      amount: Number,
      currency: {
        type: String,
        default: 'USD',
      },
    },
    deadline: Date,
    deliveryDate: Date,
    paymentTerms: String,
    warranty: String,
    status: {
      type: String,
      enum: ['Draft', 'Sent', 'In Review', 'Closed', 'Awarded'],
      default: 'Draft',
    },
    selectedVendors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
      },
    ],
    createdBy: String,
    rawInput: String, // Original natural language input from user
    structuredData: mongoose.Schema.Types.Mixed, // Structured RFP data from AI parsing
  },
  { timestamps: true }
);

module.exports = mongoose.model('RFP', rfpSchema);
