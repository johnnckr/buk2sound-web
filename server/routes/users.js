const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await db.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await db.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user' });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        const createdUser = await db.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    try {
        const user = await db.updateUser(userId, updatedUser);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await db.deleteUser(userId);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

module.exports = router;