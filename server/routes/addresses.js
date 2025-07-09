const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all addresses
router.get('/', async (req, res) => {
    try {
        const addresses = await db.query('SELECT * FROM addresses');
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving addresses' });
    }
});

// Get address by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const address = await db.query('SELECT * FROM addresses WHERE id = ?', [id]);
        if (address.length > 0) {
            res.json(address[0]);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving address' });
    }
});

// Create a new address
router.post('/', async (req, res) => {
    const { userId, street, city, state, zip } = req.body;
    try {
        const result = await db.query('INSERT INTO addresses (user_id, street, city, state, zip) VALUES (?, ?, ?, ?, ?)', [userId, street, city, state, zip]);
        res.status(201).json({ id: result.insertId, userId, street, city, state, zip });
    } catch (error) {
        res.status(500).json({ message: 'Error creating address' });
    }
});

// Update an address
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { street, city, state, zip } = req.body;
    try {
        const result = await db.query('UPDATE addresses SET street = ?, city = ?, state = ?, zip = ? WHERE id = ?', [street, city, state, zip, id]);
        if (result.affectedRows > 0) {
            res.json({ id, street, city, state, zip });
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating address' });
    }
});

// Delete an address
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM addresses WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address' });
    }
});

module.exports = router;