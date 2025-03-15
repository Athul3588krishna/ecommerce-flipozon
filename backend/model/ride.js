const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Assigned driver
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  fare: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"], 
    default: "pending",
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

const Ride = mongoose.model("Ride", RideSchema);
module.exports = Ride;
