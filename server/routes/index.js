var express = require('express');
var router = express.Router();
var products = require('./product');
var users = require('./users-info');
var bank = require('./banks');
var userGroup = require('./user-group');
var report = require('./report');

//Get Products For Show Public RecommendProduct
router.get('/recommendProducts', products.recommendProduct);
//Get Products For Show Public SalableProduct
router.get('/salableProducts', products.salableProduct);
//Get Products For Show Public NewProduct
router.get('/newAllProducts', products.newProduct);
//Get Products For Show Public RecommendAllProduct
router.get('/recommendAllProducts', products.recommendAllProduct);
//Get Products For Show Public SalableAllProduct
router.get('/salableAllProducts', products.salableAllProduct);
//Get Products For Show Public NewAllProduct
router.get('/newProducts', products.newAllProduct);
//Get Products For Show Public NewAllProduct
router.get('/getDetailProducts', products.getDetailProduct);
//Get Products For Show Saler
router.get('/getProducts', products.getProduct);
//Insert Product Data For Saler
router.post('/insertProducts', products.insertProduct);
//Insert Product Data For Saler
router.post('/insertImageProducts', products.insertImageProduct);
//Edit Product Data For Saler
router.get('/editProducts', products.editProduct);
//Edit Product Data For Saler
router.delete('/editProductImageDeletes', products.editProductImageDelete);
//Update Product Data
router.put('/updateProducts', products.updateProduct);
//Insert Image Product
router.post('/insertImageProducts', products.insertImageProduct);
//Check And Build Order ID
router.get('/buildOrderIds', products.buildOrderId);
//Insert Order For Buyer
router.post('/insertOrderBuyers', products.insertOrderBuyer);


//Get User
router.post('/findUsers', users.findUser);
//Get Profile User with data json.
router.post('/findProfileUsers', users.findProfileUser);
//Check Email Register
router.post('/checkRegister', users.checkRegis);
//Insert Register
router.post('/insertRegister', users.insertRegis);
//Upload image to server
router.post('/images', users.addImage);
//Insert user profile data.
router.post('/insertProfileUsers', users.insertProfileUser);
//Update user profile data.
router.post('/updateProfileUsers', users.updateProfileUser);

//Get Banks
router.get('/getBanks', bank.getBank);
//Insert Bank Account Data
router.post('/insertBankAccounts', bank.insertBankAccount);
//Update Bank Account Data
router.put('/updateBankAccounts', bank.updateBankAccount);

//Get User Group For Product
router.get('/getUserGroupForProducts', userGroup.getUserGroupForProduct);
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

//Insert Report Product
router.post('/insertReportProducts', report.insertReportProduct);

module.exports = router;