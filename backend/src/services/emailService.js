const nodemailer = require('nodemailer');
const config = require('../config');

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: config.EMAIL.SMTP_HOST,
  port: config.EMAIL.SMTP_PORT,
  secure: false,
  auth: {
    user: config.EMAIL.SMTP_USER,
    pass: config.EMAIL.SMTP_PASS,
  },
});

// Send RFP email to vendor
const sendRFPEmail = async (vendorEmail, vendorName, rfpTitle, rfpContent) => {
  try {
    const mailOptions = {
      from: `${config.EMAIL.SMTP_FROM_NAME} <${config.EMAIL.SMTP_FROM_EMAIL}>`,
      to: vendorEmail,
      subject: `RFP: ${rfpTitle}`,
      html: `
        <h2>Request for Proposal (RFP)</h2>
        <p>Dear ${vendorName},</p>
        <p>We are requesting your proposal for the following requirement:</p>
        <h3>${rfpTitle}</h3>
        <div>${rfpContent}</div>
        <p>Please reply to this email with your proposal.</p>
        <p>Best regards,<br/>Aerchain RFP Management System</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Send proposal to internal team
const sendProposalNotification = async (toEmail, rfpTitle, vendorName) => {
  try {
    const mailOptions = {
      from: `${config.EMAIL.SMTP_FROM_NAME} <${config.EMAIL.SMTP_FROM_EMAIL}>`,
      to: toEmail,
      subject: `New Proposal Received: ${rfpTitle} from ${vendorName}`,
      html: `
        <h2>New Proposal Received</h2>
        <p>A new proposal has been received for RFP: <strong>${rfpTitle}</strong></p>
        <p>Vendor: <strong>${vendorName}</strong></p>
        <p>Please log in to the system to review the proposal.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};

module.exports = {
  sendRFPEmail,
  sendProposalNotification,
  verifyEmailConfig,
  transporter,
};
