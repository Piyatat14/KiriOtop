angular.module('starter.chatCtrl', [])

.controller('MainChatCtrl', function($scope, $http, urlService) {

})

.controller('RoomChatCtrl', function($scope, $http, $stateParams, $ionicScrollDelegate, urlService) {

	$http.get(urlService.getBaseUrl() + '/getDataRoomChat', {params: {gId : $stateParams.groupId, pId: $stateParams.productId}})
		.success(function(res) {
			alert(res);
		})

	$scope.hideTime = true;

	var alternate, isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

	$scope.sendMessage = function() {
		alternate = !alternate;

		var d = new Date();
		d = d.toLocaleTimeString().replace(/:\d+ /, '');
		$scope.messages.push({
			userId: alternate ? '12345' : '54321',
			text: $scope.data.message,
			time: d
		});

		delete $scope.data.message;
		$ionicScrollDelegate.scrollBottom(true);
	}

	$scope.data = {};
	$scope.myId = '12345';
	$scope.messages = [];
})