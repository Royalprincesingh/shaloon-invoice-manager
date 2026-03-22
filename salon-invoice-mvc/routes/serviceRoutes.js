const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/serviceController');

router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.get('/api', ctrl.apiList);
router.post('/api', ctrl.apiCreate);
router.post('/delete/:id', ctrl.delete);
router.get('/delete/:id', (req,res) => res.redirect('/services'));

module.exports = router;
