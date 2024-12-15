const express = require('express');
const router = express.Router();

const vendors = [];

// GET all vendors
router.get('/', (req, res) => {
  res.json(vendors);
});

// Add a new vendor
router.post('/', (req, res) => {
  const vendor = req.body;
  vendors.push(vendor);
  res.status(201).json({ message: 'Vendor added successfully', vendor });
});

// Update vendor by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedVendor = req.body;
  vendors[id] = updatedVendor;
  res.json({ message: 'Vendor updated successfully', updatedVendor });
});

// Delete vendor by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  vendors.splice(id, 1);
  res.json({ message: 'Vendor deleted successfully' });
});

module.exports = router;
