const Vendor = require('../models/Vendor');

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ isActive: true }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: vendors,
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error('Error fetching vendor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create vendor
exports.createVendor = async (req, res) => {
  try {
    const { name, email, phone, website, category, contactPerson, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const vendor = new Vendor({
      name,
      email,
      phone,
      website,
      category,
      contactPerson,
      notes,
    });

    await vendor.save();

    res.status(201).json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error('Error creating vendor:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Vendor with this email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update vendor
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete vendor (soft delete)
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json({
      success: true,
      message: 'Vendor deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;
