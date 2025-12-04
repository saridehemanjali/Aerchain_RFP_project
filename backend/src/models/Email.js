const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
  {
    messageId: String,
    fromEmail: String,
    fromName: String,
    toEmail: String,
    subject: String,
    body: String,
    htmlBody: String,
    attachments: [
      {
        filename: String,
        mimeType: String,
        content: Buffer,
      },
    ],
    rfpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RFP',
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    type: {
      type: String,
      enum: ['Outbound', 'Inbound'],
      default: 'Outbound',
    },
    status: {
      type: String,
      enum: ['Draft', 'Sent', 'Received', 'Failed'],
      default: 'Draft',
    },
    processingStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Failed'],
      default: 'Pending',
    },
    aiParsedData: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Email', emailSchema);
