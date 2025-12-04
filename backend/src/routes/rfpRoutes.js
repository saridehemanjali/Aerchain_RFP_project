const express = require('express');
const rfpController = require('../controllers/rfpController');

const router = express.Router();

// RFP routes
router.post('/create', rfpController.createRFPFromNaturalLanguage);
router.get('/', rfpController.getAllRFPs);
router.get('/:id', rfpController.getRFPById);
router.put('/:id', rfpController.updateRFP);
router.post('/:id/send', rfpController.sendRFPToVendors);
router.get('/:id/proposals', rfpController.getRFPProposals);
router.get('/:rfpId/compare', rfpController.compareProposals);

module.exports = router;
