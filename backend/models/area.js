
const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numberOfSlots: { type: Number, required: true },
});

module.exports = mongoose.model('Area', areaSchema);
