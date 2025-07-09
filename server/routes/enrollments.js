const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all enrollments
router.get('/', async (req, res) => {
    try {
        const enrollments = await db.query('SELECT * FROM enrollments');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving enrollments' });
    }
});

// Create a new enrollment
router.post('/', async (req, res) => {
    const { userId, courseId } = req.body;
    try {
        const result = await db.query('INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)', [userId, courseId]);
        res.status(201).json({ id: result.insertId, userId, courseId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating enrollment' });
    }
});

// Delete an enrollment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM enrollments WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting enrollment' });
    }
});

module.exports = router;