
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    slotNumber: { type: String, required: true, },
    isAvailable: { type: Boolean, default: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true }
});

module.exports = mongoose.model('Slot', slotSchema);
