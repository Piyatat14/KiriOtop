angular.module('starter.statementCtrl', ['chart.js'])

	.controller('showStatementCtrl', function($scope) {
		$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  		$scope.data = [300, 500, 100];
	})