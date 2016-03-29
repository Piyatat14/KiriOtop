var express = require('express');
var router = express.Router();
var products = require('./product');
var users = require('./users-info');
var bank = require('./banks');

//Get Products For Show Public
router.get('/products', products.getProducts);
//Get Products For Show Saler
router.get('/getProducts', products.getProduct);

router.post('/findUsers', users.findUser);
//Check Email Register
router.post('/checkRegister', users.checkRegis);
//Insert Register
router.post('/insertRegister', users.insertRegis);
//Get Banks
router.get('/getBanks', bank.getBank);
//Insert Bank Account Data
router.post('/insertBankAccounts', bank.insertBankAccount);
//Update Bank Account Data
router.put('/updateBankAccounts', bank.updateBankAccount);
//Upload image to server
router.post('/images', users.addImage);

module.exports = router;