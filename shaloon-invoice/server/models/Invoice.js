const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  customerName: String,
  customerMobile: String,
  items: [
    {
      productId: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
