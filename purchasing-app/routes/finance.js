const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /finance/budget - Mendapatkan data anggaran
router.get('/budget', (req, res) => {
  const query = 'SELECT * FROM payments';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// GET /finance/payment-status - Mendapatkan status pembayaran
router.get('/payment-status', (req, res) => {
  const query = 'SELECT * FROM payments';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
