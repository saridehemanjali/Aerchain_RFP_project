const RFP = require('../models/RFP');
const Vendor = require('../models/Vendor');
const Proposal = require('../models/Proposal');
const Email = require('../models/Email');
const aiService = require('../services/aiService');
const emailService = require('../services/emailService');

// Create RFP from natural language input
exports.createRFPFromNaturalLanguage = async (req, res) => {
  try {
    const { naturalLanguageInput, createdBy } = req.body;

    if (!naturalLanguageInput) {
      return res.status(400).json({ error: 'Natural language input is required' });
    }

    // Parse with AI
    const structuredData = await aiService.parseNaturalLanguageRFP(naturalLanguageInput);

    // Create RFP
    const rfp = new RFP({
      title: structuredData.title,
      description: structuredData.requirements?.join('; '),
      requirements: structuredData.requirements,
      budget: structuredData.budget,
      deadline: structuredData.deadline,
      deliveryDate: structuredData.deliveryDate,
      paymentTerms: structuredData.paymentTerms,
      warranty: structuredData.warranty,
      rawInput: naturalLanguageInput,
      structuredData: structuredData,
      createdBy: createdBy || 'system',
      status: 'Draft',
    });

    await rfp.save();

    res.status(201).json({
      success: true,
      rfp,
      structuredData,
    });
  } catch (error) {
    console.error('Error creating RFP:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all RFPs
exports.getAllRFPs = async (req, res) => {
  try {
    const rfps = await RFP.find()
      .populate('selectedVendors')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: rfps,
    });
  } catch (error) {
    console.error('Error fetching RFPs:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get RFP by ID
exports.getRFPById = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.id).populate('selectedVendors');

    if (!rfp) {
      return res.status(404).json({ error: 'RFP not found' });
    }

    res.json({
      success: true,
      data: rfp,
    });
  } catch (error) {
    console.error('Error fetching RFP:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update RFP
exports.updateRFP = async (req, res) => {
  try {
    const rfp = await RFP.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('selectedVendors');

    res.json({
      success: true,
      data: rfp,
    });
  } catch (error) {
    console.error('Error updating RFP:', error);
    res.status(500).json({ error: error.message });
  }
};

// Send RFP to selected vendors
exports.sendRFPToVendors = async (req, res) => {
  try {
    const { rfpId, vendorIds } = req.body;

    if (!rfpId || !vendorIds || vendorIds.length === 0) {
      return res.status(400).json({ error: 'RFP ID and vendor IDs are required' });
    }

    const rfp = await RFP.findById(rfpId);
    if (!rfp) {
      return res.status(404).json({ error: 'RFP not found' });
    }

    const vendors = await Vendor.find({ _id: { $in: vendorIds } });

    const emailResults = [];

    for (const vendor of vendors) {
      try {
        const result = await emailService.sendRFPEmail(
          vendor.email,
          vendor.name,
          rfp.title,
          rfp.description
        );

        // Create email record
        const emailRecord = new Email({
          rfpId: rfp._id,
          vendorId: vendor._id,
          toEmail: vendor.email,
          subject: `RFP: ${rfp.title}`,
          body: rfp.description,
          type: 'Outbound',
          status: 'Sent',
          messageId: result.messageId,
        });

        await emailRecord.save();

        emailResults.push({
          vendorId: vendor._id,
          vendorName: vendor.name,
          success: true,
        });
      } catch (error) {
        emailResults.push({
          vendorId: vendor._id,
          vendorName: vendor.name,
          success: false,
          error: error.message,
        });
      }
    }

    // Update RFP status and selected vendors
    rfp.selectedVendors = vendorIds;
    rfp.status = 'Sent';
    await rfp.save();

    res.json({
      success: true,
      message: 'RFPs sent to vendors',
      results: emailResults,
    });
  } catch (error) {
    console.error('Error sending RFPs:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get RFP proposals
exports.getRFPProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ rfpId: req.params.rfpId })
      .populate('vendorId')
      .sort({ submissionDate: -1 });

    res.json({
      success: true,
      data: proposals,
    });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ error: error.message });
  }
};

// Generate proposal comparison and recommendation
exports.compareProposals = async (req, res) => {
  try {
    const { rfpId } = req.params;

    const rfp = await RFP.findById(rfpId);
    if (!rfp) {
      return res.status(404).json({ error: 'RFP not found' });
    }

    const proposals = await Proposal.find({ rfpId })
      .populate('vendorId')
      .lean();

    if (proposals.length === 0) {
      return res.status(400).json({ error: 'No proposals found for this RFP' });
    }

    // Generate comparison with AI
    const comparison = await aiService.generateProposalComparison(
      rfp.structuredData,
      proposals.map((p) => ({
        vendorName: p.vendorId?.name,
        ...p.parsedData,
        pricing: p.pricing,
        paymentTerms: p.paymentTerms,
        warranty: p.warranty,
      }))
    );

    // Update proposal scores based on comparison
    for (const scoredVendor of comparison.scoredVendors) {
      const proposal = proposals.find((p) => p.vendorId?.name === scoredVendor.vendorName);
      if (proposal) {
        await Proposal.findByIdAndUpdate(proposal._id, {
          score: scoredVendor.score,
          evaluation: scoredVendor.reasoning,
        });
      }
    }

    res.json({
      success: true,
      data: comparison,
    });
  } catch (error) {
    console.error('Error comparing proposals:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;
