const Service = require('../models/Service');

exports.list = async (req, res) => {
  const q = (req.query.q || '').trim();
  const filter = q ? { name: new RegExp(q, 'i') } : {};
  const services = await Service.find(filter).sort({ createdAt: -1 });
  res.render('services', { services, q });
};

exports.create = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || price == null) return res.status(400).send('Name and price required');
    await Service.create({ name, price: Number(price), description });
    res.redirect('/services');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.apiList = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.apiCreate = async (req, res) => {
  try {
    const s = await Service.create(req.body);
    res.status(201).json(s);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.redirect('/services');
};
