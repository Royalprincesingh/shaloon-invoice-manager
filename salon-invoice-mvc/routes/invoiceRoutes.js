const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/invoiceController');

router.get('/', ctrl.dashboard);
router.get('/new', ctrl.showNew);
router.post('/create', ctrl.create);
router.get('/list', ctrl.list);
router.post('/delete/:id', ctrl.delete);
router.get('/delete/:id', (req,res) => res.redirect('/invoices'));

// API routes MUST come before :id route
router.get('/api/all', ctrl.apiList);
router.get('/api/detail/:id', ctrl.apiDetail);

// Dynamic route - must be last
router.get('/:id', ctrl.detail);

module.exports = router;
