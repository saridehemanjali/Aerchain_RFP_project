const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const config = require('../config');
const Email = require('../models/Email');
const aiService = require('./aiService');
const Proposal = require('../models/Proposal');
const Vendor = require('../models/Vendor');

const imapConfig = {
  imap: {
    user: config.EMAIL.IMAP_USER,
    password: config.EMAIL.IMAP_PASSWORD,
    host: config.EMAIL.IMAP_HOST,
    port: config.EMAIL.IMAP_PORT,
    tls: true,
    authTimeout: 3000,
  },
};

// Connect to IMAP and fetch new emails
const fetchNewEmails = async () => {
  try {
    const connection = await imaps.connect(imapConfig);
    await connection.openBox('INBOX', false);

    const searchCriteria = ['UNSEEN'];
    const fetchOptions = { bodies: '' };

    const messages = await connection.search(searchCriteria, fetchOptions);

    if (messages.length === 0) {
      console.log('No new emails');
      await connection.end();
      return [];
    }

    const processedEmails = [];

    for (let message of messages) {
      const msg = await simpleParser(message.parts);

      const emailData = {
        messageId: msg.messageId,
        fromEmail: msg.from.text.match(/[^\s<]+@[^\s>]+/)?.[0],
        fromName: msg.from.text.split('<')[0].trim(),
        toEmail: msg.to.text,
        subject: msg.subject,
        body: msg.text,
        htmlBody: msg.html,
        type: 'Inbound',
        status: 'Received',
        processingStatus: 'Pending',
        attachments: msg.attachments?.map((att) => ({
          filename: att.filename,
          mimeType: att.contentType,
        })) || [],
      };

      // Try to match vendor and RFP
      const vendor = await Vendor.findOne({ email: emailData.fromEmail });
      if (vendor) {
        emailData.vendorId = vendor._id;

        // Save email to database
        const savedEmail = await Email.create(emailData);

        // Parse vendor response with AI
        try {
          const parsedData = await aiService.parseVendorResponse(
            emailData.body,
            emailData.subject,
            vendor.name
          );

          // Update email with parsed data
          savedEmail.aiParsedData = parsedData;
          savedEmail.processingStatus = 'Completed';
          await savedEmail.save();

          processedEmails.push(savedEmail);
        } catch (aiError) {
          console.error('AI parsing error:', aiError);
          savedEmail.processingStatus = 'Failed';
          await savedEmail.save();
        }
      }

      // Mark as read
      await connection.addFlags(message.attributes.uid, ['\\Seen']);
    }

    await connection.end();
    return processedEmails;
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
};

module.exports = {
  fetchNewEmails,
};
