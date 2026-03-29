const express = require('express');
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All task routes are protected
router.use(protect);

// @route   POST /api/v1/tasks
// @desc    Create new task
// @access  Private
router.post('/', async (req, res) => {
    try {
        req.body.user = req.user.id;
        const task = await Task.create(req.body);
        
        res.status(201).json({ success: true, data: task });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// @route   GET /api/v1/tasks
// @desc    Get all tasks for logged in user
// @access  Private
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort('-createdAt');
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   PUT /api/v1/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, error: `No task with the id of ${req.params.id}` });
        }

        // Make sure user owns task
        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized to update this task' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: 'after',
            runValidators: true
        });

        res.status(200).json({ success: true, data: task });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// @route   DELETE /api/v1/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, error: `No task with the id of ${req.params.id}` });
        }

        // Make sure user owns task
        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized to delete this task' });
        }

        await task.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = router;
