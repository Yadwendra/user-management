const User = require('../models/User');
const generateBio = require('../utils/generateBio');

// Create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    const bio = await generateBio(name, role);
    const user = await User.create({ name, email, role, status, bio });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get users with optional search and role filter
exports.getUsers = async (req, res) => {
  try {
    const { q = '', role = '' } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } }
    ];
    if (role) filter.role = role;

    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    const existing = await User.findById(id);
    if (!existing) return res.status(404).json({ error: 'User not found' });

    const bio = (name !== existing.name || role !== existing.role)
      ? await generateBio(name, role)
      : existing.bio;

    const updated = await User.findByIdAndUpdate(
      id,
      { name, email, role, status, bio },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
