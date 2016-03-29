angular.module('starter.productCtrl', [])

	.controller('ProductCtrl', function($scope, $http, $ionicHistory, urlService) {
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$http.get(urlService.getBaseUrl() + '/products').then(function(resp) {
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

	.controller('showProductCtrl', function($http, $scope, $stateParams, urlService, Authen) {

		$scope.getDataProducts = function() {
			$http
				.get(urlService.getBaseUrl() + '/getProducts', {params: {pId: '1'}})
				.success(function(response) {
					$scope.productData = response;
					console.log($scope.productData);
				})
		}
		$scope.getDataProducts();
	});