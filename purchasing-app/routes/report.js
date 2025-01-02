const express = require('express');
const router = express.Router();
const db = require('../db');
// Generate purchase reports
router.get('/', async (req, res) => {
    try {
        // Query untuk mendapatkan semua data pembelian
        const [results] = await db.query(`
            SELECT 
                id, 
                item_name, 
                quantity, 
                status
            FROM purchase_requests
        `);

        // Jika tidak ada data pembelian
        if (!results.length) {
            return res.status(404).json({ message: 'No purchase requests found for the report' });
        }

        // Kirim data laporan
        res.status(200).json({
            message: 'Purchase report generated successfully',
            report: results
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
