const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all lessons for a specific course
router.get('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    try {
        const lessons = await db.query('SELECT * FROM lessons WHERE course_id = ?', [courseId]);
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving lessons', error });
    }
});

// Get a specific lesson by ID
router.get('/:courseId/:lessonId', async (req, res) => {
    const { courseId, lessonId } = req.params;
    try {
        const lesson = await db.query('SELECT * FROM lessons WHERE id = ? AND course_id = ?', [lessonId, courseId]);
        if (lesson.length > 0) {
            res.json(lesson[0]);
        } else {
            res.status(404).json({ message: 'Lesson not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving lesson', error });
    }
});

// Create a new lesson
router.post('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    const { title, content } = req.body;
    try {
        const result = await db.query('INSERT INTO lessons (course_id, title, content) VALUES (?, ?, ?)', [courseId, title, content]);
        res.status(201).json({ id: result.insertId, title, content });
    } catch (error) {
        res.status(500).json({ message: 'Error creating lesson', error });
    }
});

// Update a lesson
router.put('/:courseId/:lessonId', async (req, res) => {
    const { courseId, lessonId } = req.params;
    const { title, content } = req.body;
    try {
        const result = await db.query('UPDATE lessons SET title = ?, content = ? WHERE id = ? AND course_id = ?', [title, content, lessonId, courseId]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Lesson updated' });
        } else {
            res.status(404).json({ message: 'Lesson not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating lesson', error });
    }
});

// Delete a lesson
router.delete('/:courseId/:lessonId', async (req, res) => {
    const { courseId, lessonId } = req.params;
    try {
        const result = await db.query('DELETE FROM lessons WHERE id = ? AND course_id = ?', [lessonId, courseId]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Lesson deleted' });
        } else {
            res.status(404).json({ message: 'Lesson not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lesson', error });
    }
});

module.exports = router;