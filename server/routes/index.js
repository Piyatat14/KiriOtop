var express = require('express');
var router = express.Router();
var products = require('./product');
var users = require('./users-info');
var bank = require('./banks');
var userGroup = require('./user-group');

//Get Products For Show Public
router.get('/products', products.getProducts);
//Get Products For Show Saler
router.get('/getProducts', products.getProduct);
//Insert Product Data For Saler
router.post('/insertProducts', products.insertProduct);
//Insert Product Data For Saler
router.post('/insertImageProducts', products.insertImageProduct);
//Edit Product Data For Saler
router.post('/editProducts', products.editProduct);
//Edit Product Data For Saler
router.delete('/editProductImageDeletes', products.editProductImageDelete);
//Update Product Data
router.delete('/updateProducts', products.updateProduct);
//Insert Image Product
router.delete('/insertImageProducts', products.insertImageProduct);

//Get User
router.post('/findUsers', users.findUser);
//Check Email Register
router.post('/checkRegister', users.checkRegis);
//Insert Register
router.post('/insertRegister', users.insertRegis);
//Upload image to server
router.post('/images', users.addImage);

//Get Banks
router.get('/getBanks', bank.getBank);
//Insert Bank Account Data
router.post('/insertBankAccounts', bank.insertBankAccount);
//Update Bank Account Data
router.put('/updateBankAccounts', bank.updateBankAccount);

//get User Group
router.get('/getUserGroups', userGroup.getUserGroup);
//Insert User Group
router.post('/insertUserGroups', userGroup.insertUserGroup);
//Insert Image User Group
router.post('/insertImageUserGroups', userGroup.insertImageUserGroup);
//Edit User Group
router.get('/editUserGroups', userGroup.editUserGroup);
//Insert Image User Group
router.post('/imageUserGroups', userGroup.addImage);
//Delete Image User Group
router.delete('/editDeleteImages', userGroup.editDeleteImage);
//Delete All Image User Group
router.delete('/editAllDeleteImages', userGroup.editAllDeleteImage);
//Update User Group Data
router.put('/updateUserGroups', userGroup.updateUserGroup);

module.exports = router;