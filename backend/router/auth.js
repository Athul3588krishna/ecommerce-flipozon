const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Driver = require('../model/driver');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ name, email, password, phone });
    await user.save();
    const token = jwt.sign({ id: user._id, role: 'passenger' }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/driver-signup', async (req, res) => {
  const { name, email, password, phone, vehicle } = req.body;
  try {
    let driver = await Driver.findOne({ email });
    if (driver) return res.status(400).json({ msg: 'Driver already exists' });
    driver = new Driver({ name, email, password, phone, vehicle });
    await driver.save();
    res.json({ msg: 'Driver signup pending approval' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: 'passenger' }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/driver-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let driver = await Driver.findOne({ email });
    if (!driver || driver.status !== 'approved') return res.status(400).json({ msg: 'Driver not approved or does not exist' });
    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: driver._id, role: 'driver' }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(400).json({ msg: 'Invalid admin credentials' });
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET);
  res.json({ token });
});

router.get('/drivers', auth(['admin']), async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
});

router.put('/admin/driver/:id', auth(['admin']), async (req, res) => {
  const { status } = req.body;
  await Driver.findByIdAndUpdate(req.params.id, { status });
  res.json({ msg: 'Driver status updated' });
});

module.exports = router;