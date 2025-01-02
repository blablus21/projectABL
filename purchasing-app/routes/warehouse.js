const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /warehouse/inventory - Mendapatkan data persediaan barang
router.get('/inventory', (req, res) => {
  const query = 'SELECT * FROM inventory';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// GET /warehouse/storage-capacity - Mendapatkan kapasitas penyimpanan
router.get('/storage-capacity', (req, res) => {
  const query = 'SELECT * FROM storage_capacity';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// GET /warehouse/item-status - Mendapatkan status barang
router.get('/item-status', (req, res) => {
  const query = 'SELECT * FROM item_status';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
