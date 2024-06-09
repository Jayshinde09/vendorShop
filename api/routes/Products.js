const express = require('express');
const router = express.Router();

const {create, getproducts, getproduct} = require('../controllers/Products');

router.post('/product', create);
router.get('/product', getproducts);
router.get('/product/:slug', getproduct);

module.exports = router;