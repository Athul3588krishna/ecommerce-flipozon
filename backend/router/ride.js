const express = require('express');
const Ride = require('../model/ride');
const Driver = require('../model/driver');
const auth = require('../middlewares/auth');
const router = express.Router();

const calculateDistance = (coords1, coords2) => {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

router.post('/book', auth(['passenger']), async (req, res) => {
  const { pickup, dropoff } = req.body;
  const fare = calculateDistance(pickup, dropoff) * 1; // $1 per km
  const ride = new Ride({
    passenger: req.user.id,
    pickup: { coordinates: pickup },
    dropoff: { coordinates: dropoff },
    fare
  });
  await ride.save();
  global.io.to('drivers').emit('rideRequest', { rideId: ride._id, pickup, dropoff, fare });
  res.json(ride);
});

router.get('/nearby-drivers', auth(['passenger']), async (req, res) => {
  const drivers = await Driver.find({
    online: true,
    location: { $near: { $geometry: req.body.pickup, $maxDistance: 5000 } }
  });
  res.json(drivers);
});

router.post('/accept/:rideId', auth(['driver']), async (req, res) => {
  const ride = await Ride.findById(req.params.rideId);
  if (!ride || ride.status !== 'pending') return res.status(400).json({ msg: 'Ride not available' });
  ride.driver = req.user.id;
  ride.status = 'accepted';
  await ride.save();
  global.io.to(ride.passenger.toString()).emit('rideAccepted', { rideId: ride._id });
  res.json(ride);
});

module.exports = router;