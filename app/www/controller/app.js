// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.userCtrl', 'starter.productCtrl', 'starter.services', 'starter.bankAccountCtrl', 'starter.userGroupCtrl', 'ngCordova'])

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

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ImageCtrl'
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
    views: {
      'menuContent': {
        templateUrl: 'templates/userGroup.html',
        controller: 'showUserGroupCtrl'
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
    views: {
      'menuContent': {
        templateUrl: 'templates/editUserGroup.html',
        controller: 'editUserGroupCtrl'
      }
    }
  })

  .state('app.showProducts', {
    url: '/showProducts',
    views: {
      'menuContent': {
        templateUrl: 'templates/showProducts.html',
        controller: 'showProductCtrl'
      }
    }
  })

  .state('app.addProducts', {
    url: '/addProducts',
    views: {
      'menuContent': {
        templateUrl: 'templates/addProducts.html',
        controller: 'addProductCtrl'
      }
    }
  })

  .state('app.editProducts', {
    url: '/editProducts/:productId',
    views: {
      'menuContent': {
        templateUrl: 'templates/editProducts.html',
        controller: 'editProductCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/products');

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|content|file|assets-library):|data:image\//);
});