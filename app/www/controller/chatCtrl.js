angular.module('starter.chatCtrl', [])

.controller('MainChatCtrl', function($scope, $http, urlService) {

})

.controller('RoomChatCtrl', function($scope, $http, $stateParams, urlService) {
	$http.get(urlService.getBaseUrl() + '/getDataRoomChat', {params: {gId : $stateParams.groupId, pId: $stateParams.productId}})
		.success(function(res) {
			alert(res);
		})
})