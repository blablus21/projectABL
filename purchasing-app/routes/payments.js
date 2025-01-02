const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /payments - Melihat status pembayaran ke vendor
router.get('/', (req, res) => {
  const query = 'SELECT * FROM payments';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// POST /payments - Mengirimkan data pembayaran ke divisi Finance
router.post('/', (req, res) => {
  const { vendor_id, amount, payment_date, status } = req.body;

  if (!vendor_id || !amount || !payment_date || !status) {
    return res.status(400).json({ message: 'vendor_id, amount, payment_date, and status are required' });
  }

  const query = 'INSERT INTO payments (vendor_id, amount, payment_date, status) VALUES (?, ?, ?, ?)';
  db.query(query, [vendor_id, amount, payment_date, status], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Payment data sent successfully', id: results.insertId });
  });
});

module.exports = router;
