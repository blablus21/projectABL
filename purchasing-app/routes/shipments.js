const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /shipments - Melacak status pengiriman barang
router.get('/', (req, res) => {
  const query = 'SELECT * FROM shipments';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
