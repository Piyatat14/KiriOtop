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

.controller('registerCtrl', function($scope, $http, $ionicPopup, urlService, $ionicHistory, $state) {
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
						$state.go('app.product', {}, {reload:true});
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

.controller('AddProfileCtrl', function($scope, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $ionicPlatform, $cordovaFile, Authen, urlService, $ionicActionSheet) {

	$ionicPlatform.ready(function() {

		//object for Authen.
		var userData = Authen.getUser();

		//object for image.
		$scope.images = { 
			imageUri: '', 
			filename: '',
			extension: ''
		};

		//object for data user profile.
		$scope.profileData = {
			sell: 0
		};

		$scope.preAddDataProfile = function() {
			//if image ready to uploads server.
			if($scope.images.imageUri != '') {
				upload($scope.images.imageUri, $scope.images.filename);
			}
		}

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
						takePicture();
					}else if(index == 1) {
						$scope.hideSheet();
						selectImage();
					}
				}
			});
		}

		//function upload image to server.
		upload = function(imageURI, filename) {
			var options = new FileUploadOptions();
			options.fileKey = 'image';
			options.fileName = filename;
			options.mimeType = 'image/jpg';
			options.chunkedMode = false;
			options.params = {'directory' : 'uploads/img', 'fileName' : filename, 'userID' : userData.userID};
			
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI(urlService.getBaseUrl() + '/images'),
				function(res) {
					//response filename image from destination uploads/img folder at server.
					console.log("Code = " + res.responseCode);
					console.log("Response = " + res.response);
					console.log("Sent = " + res.bytesSent);
					$scope.profileData.imageName = res.response;
					addDataProfile();
				}, function(error) {
					alert("An error has occurred: Code = " + error.code);
				    console.log("upload error source " + error.source);
				    console.log("upload error target " + error.target);
				}, options
			);
		}

		//function take picture.
		takePicture = function () {
            var options = {
                quality: 45,
                targetWidth: 1000,
                targetHeight: 1000,
                correctOrientation: true,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                sourceType: Camera.PictureSourceType.CAMERA,
            };

            navigator.camera.getPicture(function (imageURI) {
            	dowloadImgIntoPackage(imageURI);
            }, function(error) {
            	console.log(error);
            }, options);
        }

        //function select image in device.
        selectImage = function() {
        	var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 1000,
                targetHeight: 1000,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageUri) {
            	dowloadImgIntoPackage(imageUri); 
            }, function(error) {
                console.log(error);
            });
        }

        //function dowload image from device to app package for preview image into view.
        dowloadImgIntoPackage = function(imageUriSource) {
        	console.log('imageUri: ' + imageUriSource);
        	//substring for choosed image in gallary after file name is xxxx(.jpg)
        	var filename = imageUriSource.substring(imageUriSource.lastIndexOf('/') + 1, imageUriSource.lastIndexOf('.'));
        	$scope.images.filename = filename;
        	console.log('Filename: ' + $scope.images.filename);
        	//dowload image from device to app package because URI of image in device not working in preview.
            $cordovaFileTransfer.download(imageUriSource, cordova.file.dataDirectory + $scope.images.filename, {}, true)
                .then(function(fileEntry) {
            		//get nativeURL into $scope.images.imageUri after dowload image from device to application package.
                    $scope.images.imageUri = fileEntry.nativeURL;
                    console.log('THEN: ' + $scope.images.imageUri);
                }, function (error) {
                    console.log(error);
                }
            );
        }

        addDataProfile = function() {
			console.log($scope.profileData.firstname);
			console.log($scope.profileData.lastname);
			console.log($scope.profileData.address);
			console.log($scope.profileData.tel);
			console.log($scope.profileData.sell);
			console.log($scope.profileData.imageName);
			console.log(userData.userID);
        }

	});
})