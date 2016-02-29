angular.module('starter.productCtrl', [])

	.controller('PlaylistsCtrl', function($scope, $http) {
	  $http.get('/products')
	    .success(function(response) {
	      console.log(response);
	      $scope.playlists = response;
	    });
	})

	.controller('PlaylistCtrl', function($scope, $stateParams) {
	});