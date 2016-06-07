var express = require('express');
var router = express.Router();
var products = require('./product');
var users = require('./users-info');
var bank = require('./banks');
var userGroup = require('./user-group');
var order = require('./order');
var report = require('./report');
var backend = require('./backend');
var statement = require('./statement');

//PRODUCT
//Get Products For Show Public RecommendProduct
router.get('/recommendProducts', products.recommendProduct);
//Get Products For Show Public SalableProduct
router.get('/salableProducts', products.salableProduct);
//Get Products For Show Public NewProduct
router.get('/newProducts', products.newProduct);
//Get Products For Show Public RecommendAllProduct
router.get('/recommendAllProducts', products.recommendAllProduct);
//Get Products For Show Public SalableAllProduct
router.get('/salableAllProducts', products.salableAllProduct);
//Get Products For Show Public NewAllProduct
router.get('/newAllProducts', products.newAllProduct);
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
//Insert Order For Seller
router.post('/insertOrderSellers', products.insertOrderSeller);
//Get Rating Products
router.get('/getRatingProducts', products.getRatingProduct);
//Get View Profile
router.get('/getViewProfiles', products.getViewProfile);
//Get View User Group
router.get('/getViewUserGroups', products.getViewUserGroup);
//Check Rating Products
router.get('/checkRatingProducts', products.checkRatingProduct);
//Get Only One Rating Products
router.get('/getOnlyOneRatingProducts', products.getOnlyOneRatingProduct);
//Delete Only One Rating Products
router.delete('/deleteOnlyOneRatingComments', products.deleteOnlyOneRatingComment);
//Edit Only One Rating Products
router.put('/editOnlyOneRatingComments', products.editOnlyOneRatingComment);
//Check Before Delete
router.get('/checkBeforeDeletes', products.checkBeforeDelete);
//Delete Products
router.put('/deleteProducts', products.deleteProduct);
//Get Average Rating
router.get('/getAverageRatings', products.getAverageRating);
//Get Average Rating
router.get('/increaseViewers', products.increaseViewer);

//USERS
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
//Send password to user email.
router.post('/sendPasswords', users.sendPassword);
//Change password for user.
router.post('/editPasswords', users.editPassword);
//Check password for user change password.
router.get('/checkPasswords', users.checkPassword);
//Search Product By Name And Price
router.get('/searchProducts', users.searchProuct);
//Search Product By Name
router.get('/searchProductByNames', users.searchProductByName);

//BANKS
//Get Banks
router.get('/getBanks', bank.getBank);
//Insert Bank Account Data
router.post('/insertBankAccounts', bank.insertBankAccount);
//Update Bank Account Data
router.put('/updateBankAccounts', bank.updateBankAccount);

//USERGROUPS
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
//Check Products in User Group For Detele
router.get('/checkDeleteUsergroups', userGroup.checkDeleteUsergroup);
//Delete UserGroup
router.delete('/deleteUsergroups', userGroup.deleteUsergroup);

//ORDERS
//Get Order Buyer
router.get('/getOrderBuyers', order.getOrderBuyer);
//Update Status Confirm
router.put('/updateStatusAlls', order.updateStatusAll);
//Insert Log Detail
router.post('/insertOrderDetails', order.insertOrderDetail);
//Get Order Log
router.get('/getOrderLogs', order.getOrderLog);
//Get Order Buyer
router.get('/getOrderSellers', order.getOrderSeller);
//Get Bank Account In Order 
router.get('/getBankInOrders', order.getBankInOrder);
//Insert Rating And Comment
router.post('/insertRatingComments', order.insertRatingComment);

//REPORTS
//Insert Report Product
router.post('/insertReportProducts', report.insertReportProduct);

//STATEMENT
//Get Products Statement
router.get('/getProductStatements', statement.getProductStatement);

//BACKEND
//Get Report Product From Reporter
router.get('/getReportProducts', backend.getReportProduct);
//Update Ban User
router.put('/updateBanUsers', backend.updateBanUser);
//Update Unban User
router.put('/updateUnbanUsers', backend.updateUnbanUser);
//Find User type admin
router.post('/findUserAdmins', backend.findUserAdmin);

module.exports = router;