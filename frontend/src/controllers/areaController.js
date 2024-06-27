const Area = require("../models/area");
const Slot = require("../models/slot");
const Booking = require("../models/booking");

// Create a new area
exports.createArea = async (req, res) => {
  try {
    const area = new Area(req.body);
    await area.save();

    // Create slots for the area with the desired sequential slot numbers
    const slots = [];
    const letters = ["A", "B"]; // Alternating letters

    for (let i = 0; i < area.numberOfSlots; i++) {
      // Generate a 4-character slot number based on the sequence
      const letter = letters[i % 2]; // Alternates between 'A' and 'B'
      const number = ("000" + Math.floor(i / 2)).slice(-3); // Ensures the number part is always 3 characters
      const slotNumber = `${letter}${number}`; // Combine letter and number parts

      const slot = new Slot({
        slotNumber: slotNumber,
        isAvailable: true,
        area: area._id,
      });
      slots.push(slot);
      await slot.save();
    }

    res.status(201).json({ area, slots });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get slots by area ID
exports.getSlotsByArea = async (req, res) => {
  try {
    const slots = await Slot.find({ area: req.params.areaId });
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSlotsById = async (req, res) => {
  try {
    // Find the slot by slotId and areaId
    const slot = await Slot.findOne({
      area: req.params.areaId,
      _id: req.params.slotId,
    });

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Find the booking associated with the slotId, if any
    const booking = await Booking.findOne({
      slot: req.params.slotId,
    }).populate("user", "name email");

    // Construct the response object
    const slotWithBooking = {
      slot: {
        _id: slot._id,
        slotNumber: slot.slotNumber,
        isAvailable: slot.isAvailable,
      },
      booking: booking
        ? {
            _id: booking._id,
            bookedBy: booking.user,
          }
        : null,
    };

    res.status(200).json(slotWithBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all areas
exports.getAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a slot
// Delete an area
// Delete an area
exports.deleteArea = async (req, res) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id);

    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }

    // Find all slots associated with the area
    const slots = await Slot.find({ area: req.params.id });

    // Delete all bookings associated with the slots
    for (const slot of slots) {
      await Booking.deleteMany({ slot: slot._id });
    }

    // Delete all slots associated with the area
    await Slot.deleteMany({ area: req.params.id });

    res.status(200).json({ message: "Area, associated slots, and bookings deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


