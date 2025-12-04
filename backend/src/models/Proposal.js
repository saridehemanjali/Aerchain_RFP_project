const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema(
  {
    rfpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RFP',
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Received', 'Reviewed', 'Rejected', 'Selected'],
      default: 'Pending',
    },
    submissionDate: Date,
    pricing: {
      totalPrice: Number,
      currency: String,
      breakdown: mongoose.Schema.Types.Mixed,
    },
    deliveryTerms: String,
    paymentTerms: String,
    warranty: String,
    additionalTerms: String,
    rawEmailContent: String, // Original email content from vendor
    parsedData: mongoose.Schema.Types.Mixed, // AI-extracted structured data
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    evaluation: String, // AI-generated evaluation
    attachments: [
      {
        filename: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Proposal', proposalSchema);
