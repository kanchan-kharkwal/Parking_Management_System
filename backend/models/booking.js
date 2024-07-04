const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  vehicleNo: { type: String, required: true},
  endTime: { type: Date, required: true },
  status: { type: String, enum: ["ongoing", "end"], default: "ongoing" },
});

module.exports = mongoose.model("Booking", bookingSchema);
