const Customer = require('../models/Customer');

exports.list = async (req, res) => {
  const q = (req.query.q || '').trim();
  const filter = q ? { $or: [{ name: new RegExp(q, 'i') }, { phone: new RegExp(q, 'i') }] } : {};
  const customers = await Customer.find(filter).sort({ createdAt: -1 }).limit(200);
  res.render('customers', { customers, q });
};

exports.create = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone) return res.status(400).send('Name and phone required');
    const c = await Customer.create({ name, phone, email });
    res.redirect('/customers');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.apiList = async (req, res) => {
  const customers = await Customer.find().limit(500);
  res.json(customers);
};

exports.apiCreate = async (req, res) => {
  try {
    const c = await Customer.create(req.body);
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.redirect('/customers');
};
