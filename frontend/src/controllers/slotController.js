
const Slot = require('../models/slot');

// Get all slots
exports.getSlots = async (req, res) => {
    try {
        const slots = await Slot.find().populate('area');
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get slot by ID
exports.getSlotById = async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id).populate('area');
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new slot (not typically needed as slots are created with areas)
exports.createSlot = async (req, res) => {
    try {
        const slot = new Slot(req.body);
        await slot.save();
        res.status(201).json(slot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a slot
exports.updateSlot = async (req, res) => {
    try {
        const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json(slot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a slot
exports.deleteSlot = async (req, res) => {
    try {
        const slot = await Slot.findByIdAndDelete(req.params.id);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json({ message: 'Slot deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
