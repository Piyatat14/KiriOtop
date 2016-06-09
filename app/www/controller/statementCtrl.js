angular.module('starter.statementCtrl', ['chart.js'])

	.controller('showStatementCtrl', function($scope, $http, urlService, Users, $filter, $ionicLoading) {
		var profileUser = Users.getUserData();
		$scope.date = {
			picked : new Date()
		};
		var loading = function(){
			$ionicLoading.show({
				content: 'Loading',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
			})
		}
		loading();
		var checkLoading = 0;
		var endOfLoading = function(){
			checkLoading++;
			if(checkLoading > 0){
				$ionicLoading.hide();
			}
		}
		$scope.dateChanged = function(){
			$scope.buyer = [];
			$scope.priceDay = [];
			$scope.series = ['เงิน/เดือน'];
			$scope.orderDate = [];
			$scope.priceMonth = [];
			var dateOnly = $filter('date')($scope.date.picked, 'MM');
			$http
			.get(urlService.getBaseUrl() + '/getProductStatements', {params: {profId : profileUser.profileID, dateState : dateOnly}})
			.success(function(response) {
				for(var i=0; i<response.length; i++){
					if($filter('date')($scope.date.picked, 'dd/MM/yyyy') == $filter('date')(response[i].order_date, 'dd/MM/yyyy')){
						$scope.buyer.push(
							response[i].first_name
						);
						$scope.priceDay.push(
							response[i].product_price*response[i].order_amount
						);
					}
					$scope.orderDate.push(
						$filter('date')(response[i].order_date, 'dd/MM/yyyy')
					);
					$scope.priceMonth.push([
						response[i].product_price*response[i].order_amount
					]);
				}
				endOfLoading();
			})
		}

		$scope.dateChanged();
	})