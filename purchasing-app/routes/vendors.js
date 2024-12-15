const express = require('express');
const router = express.Router();


// GET /vendors - Mendapatkan daftar vendor
router.get('/', (req, res) => {
  db.query('SELECT * FROM vendor', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// POST /vendors - Menambahkan vendor baru
router.post('/', (req, res) => {
  const { name, contact } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ message: 'Name and contact are required' });
  }

  const query = 'INSERT INTO vendor (name, contact) VALUES (?, ?)';
  db.query(query, [name, contact], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Vendor added successfully', id: results.insertId });
  });
});

// PUT /vendors/:id - Memperbarui data vendor
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, contact } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ message: 'Name and contact are required' });
  }

  const query = 'UPDATE vendor SET name = ?, contact = ? WHERE id = ?';
  db.query(query, [name, contact, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Vendor not found' });
      return;
    }
    res.json({ message: 'Vendor updated successfully' });
  });
});

// DELETE /vendors/:id - Menghapus data vendor
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM vendor WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Vendor not found' });
      return;
    }
    res.json({ message: 'Vendor deleted successfully' });
  });
});

module.exports = router;
