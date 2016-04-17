angular.module('starter.orderCtrl', [])

	.controller('orderBuyerCtrl', function($scope, $http, urlService, Users, $ionicPopover, $state) {
		var profileUser = Users.getUserData();
		var idOderBuyer = '';
		var getOrder = function(){
			$http
			.get(urlService.getBaseUrl() + '/getOrderBuyers', {params : {pfId : profileUser.profileID}})
			.success(function(response){
				$scope.orderBuyerData = response;
				for(var i=0; i<response.length; i++){
					if(response[i].image == null){
						$scope.orderBuyerData[i].image = urlService.getBaseUrl() + /img/ + 'nullProduct.jpg'
					}else{
						$scope.orderBuyerData[i].image = urlService.getBaseUrl() + /img/ + response[i].image
					}
				}
			})
		}
		getOrder();

		$ionicPopover.fromTemplateUrl('templates/orderBuyer.html', {
			scope: $scope,
		}).then(function(popover) {
			$scope.popover = popover;
		});

		$scope.popoverStatus = function($event, status, idOrder) {
			idOderBuyer = idOrder;
			if(status == 'รอการยืนยัน'){
				$scope.comfirmStatus = false;
				$scope.cancelStatus = true;
				$scope.gotStatus = false;
			}else if(status == 'รอการชำระเงิน'){
				console.log("55");
				$scope.comfirmStatus = true;
				$scope.cancelStatus = true;
				$scope.gotStatus = false;
			}else if(status == 'กำลังขนส่ง'){
				$scope.comfirmStatus = false;
				$scope.cancelStatus = false;
				$scope.gotStatus = true;
			}
		    $scope.popover.show($event);
		};

		$scope.updateComfirm = function(){
			$http
			.put(urlService.getBaseUrl() + '/updateStatusConfirms', {orderId : idOderBuyer})
			.success(function(response){
				var date = $filter('date')(new Date(), 'yyyy-MM-dd');
				var afterStatus = 'ชำระเงินเรียบร้อยแล้ว';
				$http
				.post(urlService.getBaseUrl() + '/insertOrderDetails', {orderId : idOderBuyer, aStatus : afterStatus, lDate : date})
				.success(function(response){
					getOrder();
				})
			})
			$scope.popover.hide();
		};

		$scope.updateGot = function(){
			$http
			.put(urlService.getBaseUrl() + '/updateStatusGots', {orderId : idOderBuyer})
			.success(function(response){
				var date = $filter('date')(new Date(), 'yyyy-MM-dd');
				var afterStatus = 'ได้รับสินค้าแล้ว';
				getOrder();
			})
			$scope.popover.hide();
		};

		$scope.updateCancel = function(){
			$http
			.put(urlService.getBaseUrl() + '/updateStatusCancels', {orderId : idOderBuyer})
			.success(function(response){
				var date = $filter('date')(new Date(), 'yyyy-MM-dd');
				var afterStatus = 'ยกเลิกรายการเรียบร้อยแล้ว';
				getOrder();
			})
			$scope.popover.hide();
		};

	})

	.controller('orderDetailCtrl', function($scope, $http, urlService, Users, $state) {
		var profileUser = Users.getUserData();

	})