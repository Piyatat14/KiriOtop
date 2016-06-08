angular.module('starter.orderCtrl', ['ionic.rating'])

	.controller('orderBuyerCtrl', function($scope, $http, urlService, Users, $ionicPopover, $state, $filter, $ionicPopup, $ionicLoading) { //, $ionicPlatform, $cordovaPush
		// $ionicPlatform.ready(function () {
		// 	$cordovaPush.register({
		// 		badge: true,
		// 		sound: true,
		// 		alert: true
		// 	}).then(function (result) {
		// 		UserService.registerDevice({user: user, token: result}).then(function () {
		// 			$ionicLoading.hide();
		// 			$state.go('tab.news');
		// 		}, function (err) {
		// 			console.log(err);
		// 		});
		// 	}, function (err) {
		// 		console.log('reg device error', err);
		// 	});
		// });
		var profileUser = Users.getUserData();
		var idOderBuyer = '';
		var statusBuyer = '';
		var orderStatus = '';
		var productId = '';
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
		var getOrder = function(){
			$http
			.get(urlService.getBaseUrl() + '/getOrderBuyers', {params : {pfId : profileUser.profileID}})
			.success(function(response){
				$scope.orderBuyerData = response;
				console.log(response);
				for(var i=0; i<response.length; i++){
					if(response[i].image == null){
						$scope.orderBuyerData[i].image = urlService.getBaseUrl() + /img/ + 'nullProduct.jpg';
					}else{
						$scope.orderBuyerData[i].image = urlService.getBaseUrl() + /img/ + response[i].image;
					}
					if($scope.orderBuyerData[i].buyer_status_name == 'ชำระเงินเรียบร้อย'){
						$scope.orderBuyerData[i].buyer_status_name = 'รอสินค้า';
					}else if($scope.orderBuyerData[i].buyer_status_name == 'ส่งสินค้าเรียบร้อย'){
						$scope.orderBuyerData[i].buyer_status_name = 'กำลังขนส่ง';
					}
				}
				endOfLoading();
			})
		}

		getOrder();

		$scope.$on('$stateChangeSuccess', function(){
			getOrder();
		});

		$scope.loadOrder = function(){
			getOrder();
			$scope.$broadcast('scroll.refreshComplete');
		}

		$ionicPopover.fromTemplateUrl('templates/orderBuyer.html', {
			scope: $scope,
		}).then(function(popover) {
			$scope.popover = popover;
		});
		
		$scope.popoverStatus = function($event, status, idOrder, idProduct) {
			idOderBuyer = idOrder;
			productId = idProduct;
			statusBuyer = status;
			if(status == 'รอการยืนยัน'){
				$scope.comfirmStatus = false;
				$scope.cancelStatus = true;
				$scope.gotStatus = false;
			}else if(status == 'รอการชำระเงิน'){
				$scope.comfirmStatus = true;
				$scope.cancelStatus = true;
				$scope.gotStatus = false;
			}else if(status == 'รอสินค้า'){
				$scope.comfirmStatus = false;
				$scope.cancelStatus = false;
				$scope.gotStatus = false;
			}else if(status == 'กำลังขนส่ง'){
				$scope.comfirmStatus = false;
				$scope.cancelStatus = false;
				$scope.gotStatus = true;
			}else if(status == 'ได้รับของ'){
				$scope.comfirmStatus = false;
				$scope.cancelStatus = false;
				$scope.gotStatus = false;
			}else if(status == 'ยกเลิกรายการ'){
				$scope.comfirmStatus = false;
				$scope.cancelStatus = false;
				$scope.gotStatus = false;
			}else{
				$scope.comfirmStatus = false;
				$scope.cancelStatus = false;
				$scope.gotStatus = false;
			}
		    $scope.popover.show($event);
		    $event.preventDefault();
		};

		$scope.updateComfirm = function(){
			loading();
			orderStatus = 'รอสินค้า';
			$http
			.put(urlService.getBaseUrl() + '/updateStatusAlls', {orderId : idOderBuyer, statusOrder : orderStatus})
			.success(function(response){
				var date = new Date();
				var afterStatus = 'ชำระเงินเรียบร้อยแล้ว';
				var beforeStatus = statusBuyer;
				$http
				.post(urlService.getBaseUrl() + '/insertOrderDetails', {orderId : idOderBuyer, bStatus : beforeStatus, aStatus : afterStatus, logDate : date, pId : profileUser.profileID})
				.success(function(response){
					getOrder();
				})
			})
			$scope.popover.hide();
		};

		$scope.updateGot = function(){
			loading();
			orderStatus = 'ได้รับของ';
			$http
			.put(urlService.getBaseUrl() + '/updateStatusAlls', {orderId : idOderBuyer, statusOrder : orderStatus})
			.success(function(response){
				var date = new Date();
				var afterStatus = 'ได้รับสินค้าแล้ว';
				var beforeStatus = statusBuyer;
				$http
				.post(urlService.getBaseUrl() + '/insertOrderDetails', {orderId : idOderBuyer, bStatus : beforeStatus, aStatus : afterStatus, logDate : date, pId : profileUser.profileID})
				.success(function(response){
					getOrder();
				})
			})
			$scope.popover.hide();
		};

		$scope.updateCancel = function(){
			loading();
			orderStatus = 'ยกเลิกรายการ';
			$http
			.put(urlService.getBaseUrl() + '/updateStatusAlls', {orderId : idOderBuyer, statusOrder : orderStatus})
			.success(function(response){
				var date = new Date();
				var afterStatus = 'ยกเลิกรายการเรียบร้อยแล้ว';
				var beforeStatus = statusBuyer;
				$http
				.post(urlService.getBaseUrl() + '/insertOrderDetails', {orderId : idOderBuyer, bStatus : beforeStatus, aStatus : afterStatus, logDate : date, pId : profileUser.profileID})
				.success(function(response){
					getOrder();
				})
			})
			$scope.popover.hide();
		};
	})

	.controller('orderSellerCtrl', function($scope, $http, urlService, Users, $ionicPopover, $state, $ionicPopup, $ionicLoading) {
		var profileUser = Users.getUserData();
		var idOderSeller = '';
		var statusSeller = '';
		var orderStatus = '';
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
		$scope.banksForSent = [];
		var getSellerOrder = function(){
			$http
			.get(urlService.getBaseUrl() + '/getOrderSellers', {params : {pfId : profileUser.profileID}})
			.success(function(response){
				console.log(response);
				$scope.orderSellerData = response;
				for(var i=0; i<response.length; i++){
					if(response[i].image == null){
						$scope.orderSellerData[i].image = urlService.getBaseUrl() + /img/ + 'nullProduct.jpg';
					}else{
						$scope.orderSellerData[i].image = urlService.getBaseUrl() + /img/ + response[i].image;
					}
					if($scope.orderSellerData[i].buyer_status_name == 'รอสินค้า'){
						$scope.orderSellerData[i].buyer_status_name = 'ชำระเงินเรียบร้อย';
					}
				}
				endOfLoading();
			})
		}
		getSellerOrder();

		$scope.$on('$stateChangeSuccess', function(){
			getSellerOrder();
		});

		$scope.loadOrder = function(){
			getSellerOrder();
			$scope.$broadcast('scroll.refreshComplete');
		}

		$ionicPopover.fromTemplateUrl('templates/orderSeller.html', {
			scope: $scope,
		}).then(function(popover) {
			$scope.popover = popover;
		});

		$scope.popoverStatus = function($event, status, idOrder) {
			idOderSeller = idOrder;
			statusSeller = status;
			if(status == 'รอการยืนยัน'){
				$scope.comfirmStatus = true;
				$scope.bankStatus = false;
				$scope.sentStatus = false;
				$scope.cancelStatus = true;
			}else if(status == 'รอการชำระเงิน'){
				$scope.comfirmStatus = false;
				$scope.bankStatus = true;
				$scope.sentStatus = false;
				$scope.cancelStatus = true;
			}else if(status == 'ชำระเงินเรียบร้อย'){
				$scope.comfirmStatus = false;
				$scope.bankStatus = false;
				$scope.sentStatus = true;
				$scope.cancelStatus = false;
			}else if(status == 'ส่งสินค้าเรียบร้อย'){
				$scope.comfirmStatus = false;
				$scope.bankStatus = false;
				$scope.sentStatus = false;
				$scope.cancelStatus = false;
			}else if(status == 'ได้รับของ'){
				$scope.comfirmStatus = false;
				$scope.bankStatus = false;
				$scope.sentStatus = false;
				$scope.cancelStatus = false;
			}else if(status == 'ยกเลิกรายการ'){
				$scope.comfirmStatus = false;
				$scope.bankStatus = false;
				$scope.sentStatus = false;
				$scope.cancelStatus = false;
			}else{
				$scope.comfirmStatus = false;
				$scope.bankStatus = false;
				$scope.sentStatus = false;
				$scope.cancelStatus = false;
			}
		    $scope.popover.show($event);
		    $event.preventDefault();
		};

		$scope.updateComfirm = function(){
			loading();
			orderStatus = 'รอการชำระเงิน';
			$http
			.put(urlService.getBaseUrl() + '/updateStatusAlls', {orderId : idOderSeller, statusOrder : orderStatus})
			.success(function(response){
				var date = new Date();
				var afterStatus = 'ยืนยันรายการเรียบร้อยแล้ว';
				var beforeStatus = statusSeller;
				$http
				.post(urlService.getBaseUrl() + '/insertOrderDetails', {orderId : idOderSeller, bStatus : beforeStatus, aStatus : afterStatus, logDate : date, pId : profileUser.profileID})
				.success(function(response){
					getSellerOrder();
				})
			})
			$scope.popover.hide();
		};

		$scope.updateBankAccount = function(){
			loading();
			$http
			.get(urlService.getBaseUrl() + '/getBankInOrders', {params : {profId : profileUser.profileID}})
			.success(function(response){
				$scope.banksData = response;
				var myPopup = $ionicPopup.show({
				    templateUrl: 'templates/orderBanks.html',
				    title: 'บัญชีธนาคาร',
				    scope: $scope,
				    buttons: [
				    	{ text: 'ยกเลิก' },
				    	{
					        text: '<b>ส่งเลขบัญชี</b>',
					        type: 'button-royal',
					        onTap: function(e) {
					        	console.log($scope.banksForSent);
					        	$scope.popover.hide();
				        	}
				      	}
				    ]
				});
			})
		};

		$scope.updateSent = function(){
			loading();
			orderStatus = 'ส่งสินค้าเรียบร้อย';
			$http
			.put(urlService.getBaseUrl() + '/updateStatusAlls', {orderId : idOderSeller, statusOrder : orderStatus})
			.success(function(response){
				var date = new Date();
				var afterStatus = 'ส่งสินค้าเรียบร้อยแล้ว';
				var beforeStatus = statusSeller;
				$http
				.post(urlService.getBaseUrl() + '/insertOrderDetails', {orderId : idOderSeller, bStatus : beforeStatus, aStatus : afterStatus, logDate : date, pId : profileUser.profileID})
				.success(function(response){
					getSellerOrder();
				})
			})
			$scope.popover.hide();
		};

		$scope.updateCancel = function(){
			loading();
			orderStatus = 'ยกเลิกรายการ';
			$http
			.put(urlService.getBaseUrl() + '/updateStatusAlls', {orderId : idOderSeller, statusOrder : orderStatus})
			.success(function(response){
				var date = new Date();
				var afterStatus = 'ยกเลิกรายการเรียบร้อยแล้ว';
				var beforeStatus = statusSeller;
				$http
				.post(urlService.getBaseUrl() + '/insertOrderDetails', {orderId : idOderSeller, bStatus : beforeStatus, aStatus : afterStatus, logDate : date, pId : profileUser.profileID})
				.success(function(response){
					getSellerOrder();
				})
			})
			$scope.popover.hide();
		};

		$scope.toggleSelection = function toggleSelection(dataOrder) {
		    var idx = $scope.banksForSent.indexOf(dataOrder);
		    if (idx > -1) {
		      $scope.banksForSent.splice(idx, 1);
		    }
		    else {
		      $scope.banksForSent.push(dataOrder);
		    }
	 	};
	})

	.controller('orderDetailCtrl', function($scope, $http, urlService, Users, $state, $stateParams, $ionicLoading) {
		var profileUser = Users.getUserData();
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
		$scope.orderData = {};
		$http
		.get(urlService.getBaseUrl() + '/getOrderLogs', {params : {orderId : $stateParams.orderId}})
		.success(function(response){
			$scope.orderData = response;
			endOfLoading();
		})
	})