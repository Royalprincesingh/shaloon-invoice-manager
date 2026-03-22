const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  services: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
      name: String,
      price: Number,
      qty: { type: Number, default: 1, min: 1 }
    }
  ],
  totalAmount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  finalAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
}, { timestamps: true });

// generate invoice number before validate if not present
invoiceSchema.pre('validate', async function(next) {
  if (!this.invoiceNumber) {
    const ts = Date.now().toString().slice(-6);
    const rand = Math.floor(Math.random() * 900 + 100);
    this.invoiceNumber = `INV-${ts}-${rand}`;
  }
  next();
});

// compute totals
invoiceSchema.methods.computeTotals = function() {
  const total = this.services.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
  this.totalAmount = total;
  const afterDiscount = Math.max(0, total - (this.discount || 0));
  const afterTax = afterDiscount + ((this.tax || 0) / 100) * afterDiscount;
  this.finalAmount = Math.round((afterTax + Number.EPSILON) * 100) / 100;
};

module.exports = mongoose.model('Invoice', invoiceSchema);
