const express = require('express');
const Driver = require('../model/driver');
const Ride = require('../model/ride');
const auth = require('../middlewares/auth');
const router = express.Router();

router.put('/location', auth(['driver']), async (req, res) => {
  const { coordinates } = req.body;
  const driver = await Driver.findByIdAndUpdate(req.user.id, {
    location: { coordinates },
    online: true
  }, { new: true });
  global.io.to('admins').emit('driverLocation', { driverId: driver._id, coordinates });
  res.json(driver);
});

router.put('/complete/:rideId', auth(['driver']), async (req, res) => {
  const { paymentMethod } = req.body;
  const ride = await Ride.findById(req.params.rideId);
  if (!ride || ride.driver.toString() !== req.user.id) return res.status(400).json({ msg: 'Invalid ride' });
  ride.status = 'completed';
  ride.paymentMethod = paymentMethod;
  await ride.save();
  global.io.to(ride.passenger.toString()).emit('rideCompleted', { rideId: ride._id, paymentMethod });
  res.json(ride);
});

module.exports = router;