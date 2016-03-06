var express = require('express');
var router = express.Router();
var products = require('./product');
var users = require('./users-info');

router.get('/products', products.getProduct);
router.post('/findUsers', users.findUser);
//Check Email Register
router.post('/checkRegister', users.checkRegis);
//Insert Register
router.post('/insertRegister', users.insertRegis);

module.exports = router;