const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await db.query('SELECT * FROM categories');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories' });
    }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
        if (category.length > 0) {
            res.json(category[0]);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving category' });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const result = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category' });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
        if (result.affectedRows > 0) {
            res.json({ id, name });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating category' });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM categories WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category' });
    }
});

module.exports = router;