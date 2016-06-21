angular.module('starter.statementCtrl', ['chart.js'])

	.controller('showStatementCtrl', function($scope, $http, urlService, Users, $filter, $ionicLoading, $ionicModal) {
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
			$scope.keepNRelease = [];
			$scope.priceMonth = [];
			var dateOnly = $filter('date')($scope.date.picked, 'MM');
			$http
			.get(urlService.getBaseUrl() + '/getProductStatements', {params: {profId : profileUser.profileID, dateState : dateOnly}})
			.success(function(response) {
				$scope.forModal = response;
				console.log(response);
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
					$scope.keepNRelease[i] = response[i].product_price*response[i].order_amount;
					
				}
				$scope.priceMonth.push($scope.keepNRelease);
				endOfLoading();
			})
		}

		$ionicModal.fromTemplateUrl('dayModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.dayModal = modal;
		});
		$scope.dayDetail = function() {
			$scope.dayModal.show();
		};
		$scope.closeDay = function() {
			$scope.dayModal.hide();
		};
		// Cleanup the modal when we're done with it!
			$scope.$on('$destroy', function() {
			$scope.dayModal.remove();
		});

		$scope.dateChanged();
	})