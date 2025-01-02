const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /sales/item-requests - Mendapatkan data permintaan barang
router.get('/item-requests', (req, res) => {
  const query = 'SELECT * FROM item_requests';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
