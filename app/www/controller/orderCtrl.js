angular.module('starter.orderCtrl', [])

	.controller('orderBuyerCtrl', function($scope, $http, urlService) { //$ionicHistory,
		$scope.test = '5';

		$scope.funcTest = function(){
			$scope.test = $scope.test + '2';
		}
	})