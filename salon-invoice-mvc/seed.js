require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Customer = require('./models/Customer');
const Service = require('./models/Service');
const Invoice = require('./models/Invoice');
const User = require('./models/User');

async function seed() {
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/salon_invoice');
  await Promise.all([Customer.deleteMany({}), Service.deleteMany({}), Invoice.deleteMany({}), User.deleteMany({})]);

  const customers = await Customer.create([
    { name: 'Amit', phone: '9999000011', email: 'amit@example.com' },
    { name: 'Sonia', phone: '9999000012', email: 'sonia@example.com' },
  ]);

  const services = await Service.create([
    { name: 'Haircut', price: 250 },
    { name: 'Shaving', price: 120 },
    { name: 'Facial', price: 500 }
  ]);

  const inv1 = new Invoice({ customer: customers[0]._id, services: [ { name: services[0].name, price: services[0].price, qty: 1, service: services[0]._id } ], discount: 0, tax: 18 });
  inv1.computeTotals();
  await inv1.save();

  const admin = new User({ username: process.env.ADMIN_USER || 'admin', password: process.env.ADMIN_PASS || 'admin123' });
  await admin.save();

  console.log('Seed completed');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
