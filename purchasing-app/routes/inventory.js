const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /inventory - Mendapatkan data persediaan barang dari Warehouse
router.get('/', (req, res) => {
  const query = 'SELECT * FROM inventory';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// POST /inventory - Memperbarui status barang yang diterima
router.post('/', (req, res) => {
  const { item_name, quantity, status } = req.body;

  if (!item_name || !quantity || !status) {
    return res.status(400).json({ message: 'item_name, quantity, and status are required' });
  }

  const query = 'INSERT INTO inventory (item_name, quantity, status) VALUES (?, ?, ?)';
  db.query(query, [item_name, quantity, status], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Inventory item updated successfully', id: results.insertId });
  });
});

module.exports = router;
