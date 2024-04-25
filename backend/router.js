const express = require('express');
const Task = require("./model");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { todo, isComplete } = req.body; // Destructure todo and isComplete from req.body
        const task = new Task({ todo, isComplete }); // Create a new Task instance with the provided data
        const savedTask = await task.save(); // Save the task to the database
        res.json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error saving task' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find and update the task by ID
        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating task' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id); // Find and delete the task by ID
        res.json(deletedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting task' });
    }
});

module.exports = router;

