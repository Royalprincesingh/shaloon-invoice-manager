const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
}, { timestamps: true });

customerSchema.index({ phone: 1 }, { unique: false });

module.exports = mongoose.model('Customer', customerSchema);
