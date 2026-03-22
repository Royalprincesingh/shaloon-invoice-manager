require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/salon_invoice');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

// view engine with layout support
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(require('express-ejs-layouts'));

app.use('/public', express.static(path.join(__dirname, 'public')));

// attach user to locals
app.use((req, res, next) => {
  res.locals.user = req.session.username || null;
  next();
});

// auth guard
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.redirect('/auth/login');
}

// routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/customers', requireAuth, require('./routes/customerRoutes'));
app.use('/services', requireAuth, require('./routes/serviceRoutes'));
app.use('/invoices', requireAuth, require('./routes/invoiceRoutes'));

// root
app.get('/', requireAuth, (req, res) => res.redirect('/invoices'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page not found' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error: ' + err.message);
});

app.listen(PORT, () => console.log(`\n✓ Server started on http://localhost:${PORT}\n`));
