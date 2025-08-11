const express = require('express');
const User = require('../models/User');
const { authMiddleware, superAdminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all users (superadmin only)
router.get('/', authMiddleware, superAdminMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, 'username email role termsAccepted createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Update user role (superadmin only)
router.put('/:id/role', authMiddleware, superAdminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['client', 'admin', 'superadmin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Role updated', user });
  } catch (err) {
    res.status(500).json({ error: 'Error updating role' });
  }
});

// Search users by username, email, or role (superadmin only)
router.get('/search', authMiddleware, superAdminMiddleware, async (req, res) => {
  try {
    const { q } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { role: { $regex: q, $options: 'i' } }
      ]
    }, 'username email role termsAccepted createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error searching users' });
  }
});

module.exports = router;
