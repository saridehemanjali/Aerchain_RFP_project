const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: String,
    website: String,
    address: String,
    category: {
      type: String,
      enum: ['Hardware', 'Software', 'Services', 'Other'],
      default: 'Other',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notes: String,
    contactPerson: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', vendorSchema);
