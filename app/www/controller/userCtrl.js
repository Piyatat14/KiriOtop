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
		}).error(function(err) {
			console.log('Error: ' + err);
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

.controller('ImageCtrl', function($scope, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $ionicPlatform, $cordovaFile, ImageService, FileService, urlService, $ionicActionSheet) {

	$ionicPlatform.ready(function() {
		$scope.images = { imageUri: '' };
		/*
		$scope.images = FileService.images();
		$scope.$apply();

		$scope.urlForImage = function(imageName) {
			var trueOrigin = cordova.file.dataDirectory + imageName;
			return trueOrigin;
		}

		$scope.addMedia = function() {
			$scope.hideSheet = $ionicActionSheet.show({
				buttons: [
					{text: "Take Photo"},
					{text: "Photo from library"}
				],
				titleText: 'Add profile image',
				cancelText: 'Cancel',
				buttonClicked: function(index) {
					$scope.addImage(index);
				}
			});
		}

		$scope.addImage = function(type) {
			$scope.hideSheet();
			ImageService.handleMediaDialog(type).then(function() {
				$scope.$apply();
			});
		}*/

		// test anothe way.
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
		                var options = {
		                    quality: 50,
		                    destinationType: Camera.DestinationType.FILE_URI,
		                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
		                    saveToPhotoAlbum: false
		                };

		                $cordovaCamera.getPicture(options).then(function(fileUri) {
		                        
		                        $cordovaFileTransfer.download(fileUri, cordova.file.dataDirectory + 'my-image.jpg', {}, true)
		                        .then(function(fileEntry) {
		                                $scope.images.imageUri = fileEntry.nativeURL;
		                                console.log('THEN: ' + $scope.images.imageUri);
		                            }, function (error) {
		                                console.log(error);
		                            }
		                        );
		                        
	                    }, function(error) {
	                        console.log(error);
	                    });

						
					}
				}
			});
		}
		
	});
})














