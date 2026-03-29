const express = require('express');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply middleware to all routes in this file
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/v1/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;
