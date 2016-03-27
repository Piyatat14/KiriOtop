angular.module('starter.userGroupCtrl', [])


.controller('modalImageView', function($scope, $http, $ionicModal) {
	$scope.showModalImage = function(index) {
		$scope.activeSlide = index;
		$scope.showModal('templates/showImageFull.html');
	}
 
	$scope.showModal = function(templateUrl) {
		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	}
 
	// Close the modal
	$scope.closeModal = function() {
		$scope.modal.hide();
		$scope.modal.remove()
	};
})