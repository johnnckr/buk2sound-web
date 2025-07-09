const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await db.query('SELECT * FROM courses');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses' });
    }
});

// Get a single course by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const course = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
        if (course.length > 0) {
            res.json(course[0]);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving course' });
    }
});

// Create a new course
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await db.query('INSERT INTO courses (title, description) VALUES (?, ?)', [title, description]);
        res.status(201).json({ id: result.insertId, title, description });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course' });
    }
});

// Update a course by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const result = await db.query('UPDATE courses SET title = ?, description = ? WHERE id = ?', [title, description, id]);
        if (result.affectedRows > 0) {
            res.json({ id, title, description });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating course' });
    }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM courses WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course' });
    }
});

module.exports = router;