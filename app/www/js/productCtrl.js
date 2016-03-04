angular.module('starter.productCtrl', [])

	.controller('ProductCtrl', function($scope, $http) {
		$http.get('http://localhost:8100/products').then(function(resp) {
			console.log('Success', resp);
		});
		$scope.dataTest = [{
					"name" : "กระเป็า",
					"detail" : "ก็ลองดูจ่าาาาาาาาาาาาา"
				},
				{
					"name" : "5555",
					"detail" : "5555555555555555"
				},
				{
					"name" : "5555",
					"detail" : "5555555555555555"
				},
				{
					"name" : "5555",
					"detail" : "5555555555555555"
				}]
				$scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
	  // $http.get('/products')
	  //   .success(function(response) {
	  //     console.log(response);
	  //     $scope.playlists = response;
	  //   });
	})

	.controller('PlaylistCtrl', function($scope, $stateParams) {
	});