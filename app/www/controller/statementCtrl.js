angular.module('starter.statementCtrl', ['chart.js'])

	.controller('showStatementCtrl', function($scope, $http, urlService) {
		$http
		.get(urlService.getBaseUrl() + '/recommendProducts')
		.success(function(response) {
			$scope.recommendData = response;
		})
		$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  		$scope.data = [300, 500, 100];
	})