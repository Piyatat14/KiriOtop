angular.module('starter.userCtrl', [])


.controller('LoginCtrl', function($scope, $http, $ionicPopup, $ionicModal, $timeout, Authen, urlService, $state, $ionicHistory) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	//save user data
	$scope.dataUser;

	// Form data for the login modal
	$scope.loginData = {};

	$ionicHistory.nextViewOptions({
		disableBack: true
	});
	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
  	}).then(function(modal) {
    	$scope.modal = modal;
  	});

	// Triggered in the login modal to close it
 	$scope.closeLogin = function() {
    	$scope.modal.hide();
  	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log($scope.loginData);
		$http
		.post(urlService.getBaseUrl() + '/findUsers', $scope.loginData)
		.success(function(response) {
			if(response == "ชื่อผู้ใช้หรือรหัสผ่านผิด..กรุณากรอกใหม่" || response == "ไม่พบชื่อผู้ใช้และรหัสผ่าน..กรุณากรอกใหม่"){
				$ionicPopup.alert({
					title: 'การเข้าสู่ระบบผิดพลาด',
					template: response
				});
			}else{
				Authen.setUser({
					userID : response[0].user_id,
					email : response[0].email
				});
				$scope.dataUser = Authen.getUser();
				$scope.closeLogin();
				console.log(Authen.getUser());
				$state.go('app.product', {}, {reload:true});
			}
		})
	};

	$scope.logout = function() {
		Authen.logout();
		$state.go('app.product', {}, {reload:true});
		$scope.dataUser = Authen.getUser();
		console.log(Authen.getUser());
	};

})

.controller('registerCtrl', function($scope, $http, $ionicPopup, urlService, $ionicHistory) {
	$ionicHistory.nextViewOptions({
		disableBack: true
	});
	$scope.registerData = {};
	$scope.insertRegis = function() {
		if($scope.registerData.password != $scope.registerData.rePassword){
			$ionicPopup.alert({
				title: 'สมัครสมาชิกผิดพลาด',
				template: 'รหัสผ่านไม่ตรงกัน..กรุณากรอกใหม่'
			});
		}else{
			$http
			.post(urlService.getBaseUrl() + '/checkRegister', $scope.registerData)
			.success(function(response) {
				if(response == "Success"){
					$http
					.post(urlService.getBaseUrl() + '/insertRegister', $scope.registerData)
					.success(function(response) {
						$scope.login();
					})
				}else{
					$ionicPopup.alert({
						title: 'สมัครสมาชิกผิดพลาด',
						template: response
					});
				}
			})
		}
	};
})

.controller('ImageCtrl', function($scope, $cordovaDevice, $cordovaCamera, $cordovaImagePicker, $http, $ionicPlatform, $cordovaFile, ImageService, urlService, $ionicActionSheet) {
	
	$scope.collection = {
			selectedImage : ''
	};

	$ionicPlatform.ready(function() {
		$scope.addMedia = function() {
			$scope.hideSheet = $ionicActionSheet.show({
				buttons: [
					{text: 'Take Photo'},
					{text: 'Photo from library'}
				],
				titleText: 'Add images',
				cancelText: 'Cancel',
				buttonClicked: function(index) {
					if(index == 0) {
						$scope.hideSheet();
						console.log("Take Photo")
					}else if(index == 1) {
						$scope.hideSheet();
						console.log("Pho to library");
						var options = {
							maximumImagesCount: 1,
							width: 120,
							height: 120,
							quality: 80
						};
						$cordovaImagePicker.getPictures(options).then(function(results) {
							for(var i=0; i<results.length; i++) {
								console.log('Image URI: '+results[i]);
								$scope.collection.selectedImage = results[i];
								console.log('selectedImage: ' + $scope.collection.selectedImage);
								
								window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64) {
									console.log("OK");
									$scope.collection.selectedImage = base64;
									console.log('Base 64: '+$scope.collection.selectedImage);
								});
								
							}
						}, function(error) {
							console.log('Error: ' + JSON.stringify(error));
						});
					}
				}
			});
		};
	});
})














