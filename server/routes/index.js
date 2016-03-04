var express = require('express');
var router = express.Router();
var products = require('./product');

router.get('/products', products.getProduct);

module.exports = router;