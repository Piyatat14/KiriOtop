// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.userCtrl', 'starter.productCtrl', 'starter.services', 'starter.bankAccountCtrl', 'starter.userGroupCtrl', 'starter.orderCtrl', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'LoginCtrl'
  })

  .state('app.register', {
    url: '/register',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      }
    }
  })

  .state('app.product', {
    url: '/products',
    views: {
      'menuContent': {
        templateUrl: 'templates/product.html',
        controller: 'ProductCtrl'
      }
    }
  })

  .state('app.kindOfProduct', {
    url: '/kindOfProduct/:idOfKind',
    views: {
      'menuContent': {
        templateUrl: 'templates/kindOfProduct.html',
        controller: 'kindProductCtrl'
      }
    }
  })

  .state('app.detailProduct', {
    url: '/detailProduct/:idProduct',
    views: {
      'menuContent': {
        templateUrl: 'templates/detailProduct.html',
        controller: 'detailProductCtrl'
      }
    }
  })

  .state('app.profile', {
    cache: false,
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.bankaccount', {
    url: '/bankaccount',
    views: {
      'menuContent': {
        templateUrl: 'templates/bankAccount.html',
        controller: 'bankCtrl'
      }
    }
  })

  .state('app.userGroup', {
    url: '/userGroup',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/userGroup.html',
        controller: 'showUserGroupCtrl',
        resolve:{
          "check": 
            function(Users, $location, $ionicPopup, $ionicHistory){
              var profileUser = Users.getUserData();
              if(profileUser == null || profileUser == undefined){
                var confirmPopup = $ionicPopup.confirm({
                  title: 'ไม่มีสิทธิการเข้าถึง',
                  template: 'คุณต้องลงทะเบียนข้อมูลส่วนตัวก่อนเพื่อเข้าถึง',
                  buttons: [
                    {
                      text: 'ตกลง',
                      type: 'button-balanced',
                      onTap: function(e){
                        $ionicHistory.nextViewOptions({
                          disableBack: true
                        });
                        $location.path('/app/profile');
                      }
                    }
                  ]
                });
              }
            }
        }
      }
    }
  })

  .state('app.addUserGroup', {
    url: '/addUserGroup',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/addUserGroup.html',
        controller: 'ImageUserGroupCtrl'
      }
    }
  })

  .state('app.editUserGroup', {
    url: '/editUserGroup/:groupId',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/editUserGroup.html',
        controller: 'editUserGroupCtrl'
      }
    }
  })

  .state('app.showProducts', {
    url: '/showProducts',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/showProducts.html',
        controller: 'showProductCtrl',
        resolve:{
          "check": 
            function(Users, $location, $ionicPopup, $ionicHistory){
              var profileUser = Users.getUserData();
              if(profileUser == null || profileUser == undefined){
                var confirmPopup = $ionicPopup.confirm({
                  title: 'ไม่มีสิทธิการเข้าถึง',
                  template: 'คุณต้องลงทะเบียนข้อมูลส่วนตัวก่อนเพื่อเข้าถึง',
                  buttons: [
                    {
                      text: 'ตกลง',
                      type: 'button-balanced',
                      onTap: function(e){
                        $ionicHistory.nextViewOptions({
                          disableBack: true
                        });
                        $location.path('/app/profile');
                      }
                    }
                  ]
                });
              }
            }
        }
      }
    }
  })

  .state('app.addProducts', {
    url: '/addProducts',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/addProducts.html',
        controller: 'addProductCtrl'
      }
    }
  })

  .state('app.editProducts', {
    url: '/editProducts/:productId',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/editProducts.html',
        controller: 'editProductCtrl'
      }
    }
  })

  .state('app.orderBuyer', {
    url: '/orderBuyer',
    views: {
      'menuContent': {
        templateUrl: 'templates/orderBuyer.html',
        controller: 'orderBuyerCtrl'
      }
    }
  })

  .state('app.orderSeller', {
    url: '/orderSeller',
    views: {
      'menuContent': {
        templateUrl: 'templates/orderSeller.html',
        controller: 'orderSellerCtrl'
      }
    }
  })

  .state('app.orderDetail', {
    url: '/orderDetail/:orderId',
    views: {
      'menuContent': {
        templateUrl: 'templates/orderDetail.html',
        controller: 'orderDetailCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/addUserGroup');

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|content|file|assets-library):|data:image\//);
});