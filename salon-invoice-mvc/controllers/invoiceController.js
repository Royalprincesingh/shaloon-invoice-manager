const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');
const Service = require('../models/Service');

exports.dashboard = async (req, res) => {
  const q = (req.query.q || '').trim();
  const filter = {};
  if (q) {
    const customers = await Customer.find({ $or: [{ name: new RegExp(q, 'i') }, { phone: new RegExp(q, 'i') }] });
    filter.customer = { $in: customers.map(c => c._id) };
  }

  // date filter
  const dateFilter = req.query.date || 'all';
  if (dateFilter === 'today') {
    const start = new Date(); start.setHours(0,0,0,0);
    filter.createdAt = { $gte: start };
  } else if (dateFilter === 'week') {
    const start = new Date(); start.setDate(start.getDate()-7); start.setHours(0,0,0,0);
    filter.createdAt = { $gte: start };
  } else if (dateFilter === 'month') {
    const start = new Date(); start.setMonth(start.getMonth()-1); start.setHours(0,0,0,0);
    filter.createdAt = { $gte: start };
  }

  const invoices = await Invoice.find(filter).populate('customer').sort({ createdAt: -1 }).limit(500);
  res.render('dashboard', { invoices, q, dateFilter });
};

exports.showNew = async (req, res) => {
  const customers = await Customer.find().limit(500);
  const services = await Service.find().limit(500);
  res.render('invoice_new', { customers, services });
};

exports.create = async (req, res) => {
  try {
    const { customerId, items = '[]', discount = 0, tax = 0 } = req.body;
    const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
    const servicesResolved = [];
    for (const it of parsedItems) {
      // it: { serviceId, qty }
      const serv = await Service.findById(it.serviceId);
      if (!serv) continue;
      servicesResolved.push({ service: serv._id, name: serv.name, price: serv.price, qty: Number(it.qty) || 1 });
    }
    if (!customerId || servicesResolved.length === 0) {
      return res.status(400).send('Customer and at least one service required');
    }
    const invoice = new Invoice({ customer: customerId, services: servicesResolved, discount: Number(discount||0), tax: Number(tax||0) });
    invoice.computeTotals();
    await invoice.save();
    res.redirect(`/invoices/${invoice._id}`);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

exports.list = async (req, res) => {
  const invoices = await Invoice.find().populate('customer').sort({ createdAt: -1 }).limit(500);
  res.render('invoices_list', { invoices });
};

exports.detail = async (req, res) => {
  const inv = await Invoice.findById(req.params.id).populate('customer');
  if (!inv) return res.status(404).send('Invoice not found');
  res.render('invoice_detail', { inv });
};

exports.delete = async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

// API endpoints
exports.apiList = async (req, res) => {
  const invoices = await Invoice.find().populate('customer');
  res.json(invoices);
};

exports.apiDetail = async (req, res) => {
  const inv = await Invoice.findById(req.params.id).populate('customer');
  if (!inv) return res.status(404).json({ error: 'Not found' });
  res.json(inv);
};
