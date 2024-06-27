const User = require("../models/user");
const Booking = require("../models/booking");
const Slot = require("../models/slot");

const bcrypt = require("bcryptjs");
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      user = await User.findOneAndUpdate(email, { role: "admin" });
      return res
        .status(400)
        .json({ message: "User already exists, and updated" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      email,
      name,
      password: hashedPassword,
      role: "admin",
    });

    await user.save();

    res.json({ user: { _id: user._id, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    if (password) {
      user = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body, password: hashedPassword },
        {
          new: true,
        }
      );
    } else {
      user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    }
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Find all bookings by the user and populate the slot field
    const bookings = await Booking.find({ user: req.params.id }).populate(
      "slot"
    );

    // Delete all bookings and set corresponding slots to available
    for (let booking of bookings) {
      await Booking.findByIdAndDelete(booking._id);
      if (booking.slot) {
        booking.slot.isAvailable = true;
        await booking.slot.save();
      }
    }

    res
      .status(200)
      .json({
        message: "User and booking history deleted, slots set to available",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
