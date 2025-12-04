const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

// Email routes
router.post('/fetch', emailController.fetchNewEmails);
router.get('/:id', emailController.getEmailById);
router.get('/rfp/:rfpId', emailController.getRFPEmails);
router.get('/inbound/all', emailController.getInboundEmails);

module.exports = router;
