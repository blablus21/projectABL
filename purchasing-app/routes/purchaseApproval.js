const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /purchase-approvals - Mendapatkan daftar pembelian yang menunggu persetujuan
router.get('/', (req, res) => {
  const query = 'SELECT * FROM purchase_requests WHERE status = "Pending"';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// PUT /purchase-approvals/:id - Menyetujui atau menolak pembelian
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status must be either "Approved" or "Rejected"' });
  }

  const query = 'UPDATE purchase_requests SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Purchase request not found' });
      return;
    }
    res.json({ message: `Purchase request ${status.toLowerCase()} successfully` });
  });
});

module.exports = router;
