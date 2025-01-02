const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all purchase requests
router.get('/', (req, res) => {
  db.query('SELECT * FROM purchase_requests', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Get a single purchase request by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM purchase_requests WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Purchase request not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Create a new purchase request
router.post('/', (req, res) => {
  const { item_name, quantity, status } = req.body;
  const query = 'INSERT INTO purchase_requests (item_name, quantity, status) VALUES (?, ?, ?)';
  db.query(query, [item_name, quantity, status], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Purchase request created successfully', id: results.insertId });
  });
});

module.exports = router;
