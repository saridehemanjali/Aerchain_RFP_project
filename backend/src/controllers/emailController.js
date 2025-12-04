const Email = require('../models/Email');
const imapService = require('../services/imapService');
const emailService = require('../services/emailService');

// Fetch new emails from IMAP
exports.fetchNewEmails = async (req, res) => {
  try {
    const emails = await imapService.fetchNewEmails();

    res.json({
      success: true,
      message: `Fetched ${emails.length} new emails`,
      data: emails,
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get email by ID
exports.getEmailById = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id)
      .populate('rfpId')
      .populate('vendorId');

    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }

    res.json({
      success: true,
      data: email,
    });
  } catch (error) {
    console.error('Error fetching email:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get emails for RFP
exports.getRFPEmails = async (req, res) => {
  try {
    const emails = await Email.find({ rfpId: req.params.rfpId })
      .populate('vendorId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: emails,
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all inbound emails
exports.getInboundEmails = async (req, res) => {
  try {
    const emails = await Email.find({ type: 'Inbound' })
      .populate('rfpId')
      .populate('vendorId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: emails,
    });
  } catch (error) {
    console.error('Error fetching inbound emails:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;
