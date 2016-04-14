angular.module('starter.userGroupCtrl', [])

.controller('showUserGroupCtrl', function($scope, $http, Authen, Users, urlService) {
	var profileData = {};
	var idProfile;
	profileData.profileID = '';
	profileData = Users.getUserData();
	if(profileData == undefined){
		idProfile = '0';
	}else{
		idProfile = profileData.profileID;
	}
	$http
	.get(urlService.getBaseUrl() + '/getUserGroups', {params: {pId: idProfile}})
	.success(function(response) {
		$scope.userGroupData = response;
		for(var i=0; i<response.length; i++){
			if(response[i].image == null){
				$scope.userGroupData[i].image = urlService.getBaseUrl() + /img/ + 'null.png';
			}else{
				$scope.userGroupData[i].image = urlService.getBaseUrl() + /img/ + response[i].image;
			}
		}
	})
})

.controller('ImageUserGroupCtrl', function($scope, $state, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $ionicPlatform, $cordovaFile, Authen, Users, urlService, $ionicActionSheet, $ionicHistory) {

	var userID = Authen.getUser().userID;
	//object for user data after view call this controller.
	var profileUser = Users.getUserData();

	$scope.userGroupData = {};

	$ionicPlatform.ready(function() {
		$scope.images = [];
		$scope.realImageName = [];

		$scope.preInsertUserGroup = function() {
			//if image ready to uploads server.
			if($scope.images.length > 0) {
				for(var i=0; i<$scope.images.length; i++){
					upload($scope.images[i].imageUri, $scope.images[i].filename);
				}
			}else {
				insertUserGroup();
			}
		};

		$scope.addMedia = function() {
			$scope.hideSheet = $ionicActionSheet.show({
				buttons: [
					{text: 'Photo from library'}
				],
				titleText: 'Add images',
				cancelText: 'Cancel',
				buttonClicked: function(index) {
					if(index == 0) {
						$scope.hideSheet();
						selectImage();
					}
				}
			});
		};

		//function upload image to server.
		upload = function(imageURI, filename) {
			var options = new FileUploadOptions();
			options.fileKey = 'image';
			options.fileName = filename;
			options.mimeType = 'image/jpg';
			options.chunkedMode = false;
			options.params = {'directory' : 'uploads/img', 'fileName' : filename, 'userID' : userID};
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI(urlService.getBaseUrl() + '/images'),
				function(res) {
					//response filename image from destination uploads/img folder at server.
					console.log("Code = " + res.responseCode);
					console.log("Response = " + res.response);
					console.log("Sent = " + res.bytesSent);
					$scope.realImageName.push({
						realNameImg: res.response
					});
					if($scope.images.length == $scope.realImageName.length){
						insertUserGroup();
					}
				}, function(error) {
					alert("ไม่สามารถทำการอัพโหลดรูปภาพของคุณได้");
				    console.log("upload error source " + error.source);
				    console.log("upload error target " + error.target);
				}, options
			);
		};

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
        };

        dowloadImgIntoPackage = function(imageUriSource) {
        	console.log('imageUri: ' + imageUriSource);
        	//substring for choosed image in gallary after file name is xxxx(.jpg)
        	var filename = imageUriSource.substring(imageUriSource.lastIndexOf('/') + 1, imageUriSource.lastIndexOf('.'));
        	//$scope.images.filename = filename;
        	//console.log('Filename: ' + $scope.images.filename);
        	//dowload image from device to app package because URI of image in device not working in preview.
            $cordovaFileTransfer.download(imageUriSource, cordova.file.dataDirectory + filename, {}, true)
                .then(function(fileEntry) {
            		//get nativeURL into $scope.images.imageUri after dowload image from device to application package.
            		$scope.images.push({
						imageUri: fileEntry.nativeURL,
						filename: filename
					});
					console.log($scope.images);
					$scope.imgLength = $scope.images.length;
                    // $scope.images.imageUri = fileEntry.nativeURL;
                    // console.log('THEN: ' + $scope.images.imageUri);
                }, function (error) {
                    console.log(error);
                }
            );
        };

		$scope.deletePicture = function(image){
			var hideSheet = $ionicActionSheet.show({
				titleText: 'Picture',
			    destructiveText: 'Delete',
			    cancelText: 'Cancel',
			    destructiveButtonClicked: function() {
					var index = $scope.images.indexOf(image);
					$scope.images.splice(index, 1);
					$scope.imgLength = $scope.images.length;
					return true;
			    }
			});
		};

		insertUserGroup = function(){
			$scope.userGroupData.idProfile = profileUser.profileID;
			$http
			.post(urlService.getBaseUrl() + '/insertUserGroups', $scope.userGroupData)
			.success(function(response) {
				var forImageData = {};
				if($scope.images.length > 0){
					for(var i=0; i<$scope.images.length; i++){
						forImageData = {
							group_id: response.insertId,
							image: $scope.realImageName[i].realNameImg
						}
						$http
						.post(urlService.getBaseUrl() + '/insertImageUserGroups', forImageData)
						.success(function(response) {
							$state.go('app.userGroup', {}, {reload:true});
						})
					}
				}else{
					$state.go('app.userGroup', {}, {reload:true});
				}
			})
		};
	});
})

.controller('editUserGroupCtrl', function($scope, $state, $cordovaFileTransfer, $cordovaDevice, $cordovaCamera, $http, $ionicPlatform, $cordovaFile, Authen, Users, urlService, $ionicActionSheet, $ionicHistory, $stateParams) {
	
	var userID = Authen.getUser().userID;
	//object for user data after view call this controller.
	var profileUser = Users.getUserData();

	$scope.editGroupData = {};

	$ionicPlatform.ready(function() {
		$scope.images = [];
		$scope.realImageName = [];

		$http
		.get(urlService.getBaseUrl() + '/editUserGroups', {params: {pId: profileUser.profileID, groupId: $stateParams.groupId}})
		.success(function(response) {
			console.log(response);
			$scope.editGroupData.idGroup = response[0].group_id;
			$scope.editGroupData.nameGroup = response[0].group_name;
			$scope.editGroupData.placeGroup = response[0].address_location;
			$scope.editGroupData.telephone = response[0].tel_no;
			$scope.imgLength = response.length;
			for(var i=0; i<$scope.imgLength; i++){
				if(response[i].image != null){
					$scope.images.push({
						group_image_id: response[i].group_image_id,
						imageUri: urlService.getBaseUrl() + /img/ + response[i].image,
	                	filename: response[i].image
	                });
				}
			}
		})

		$scope.preUpdateUserGroup = function() {
			//if image ready to uploads server.
			console.log($scope.images);
			if($scope.images.length > 0) {
				for(var i=0; i<$scope.images.length; i++){
					if($scope.images[i].group_image_id == undefined){
						upload($scope.images[i].imageUri, $scope.images[i].filename);
					}else{
						$scope.realImageName.push({
							realNameImg: $scope.images[i].filename
						});
						if($scope.images.length == $scope.realImageName.length){
							updateUserGroup();
						}
					}
				}
			}else {
				updateUserGroup();
			}
		};

		$scope.addMedia = function() {
			$scope.hideSheet = $ionicActionSheet.show({
				buttons: [
					{text: 'Photo from library'}
				],
				titleText: 'Add images',
				cancelText: 'Cancel',
				buttonClicked: function(index) {
					if(index == 0) {
						$scope.hideSheet();
						selectImage();
					}
				}
			});
		};

		//function upload image to server.
		upload = function(imageURI, filename) {
			var options = new FileUploadOptions();
			options.fileKey = 'image';
			options.fileName = filename;
			options.mimeType = 'image/jpg';
			options.chunkedMode = false;
			options.params = {'directory' : 'uploads/img', 'fileName' : filename, 'userID' : userID};
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI(urlService.getBaseUrl() + '/images'),
				function(res) {
					//response filename image from destination uploads/img folder at server.
					console.log("Code = " + res.responseCode);
					console.log("Response = " + res.response);
					console.log("Sent = " + res.bytesSent);
					$scope.realImageName.push({
						realNameImg: res.response
					});
					if($scope.images.length == $scope.realImageName.length){
						updateUserGroup();
					}
				}, function(error) {
					alert("ไม่สามารถทำการอัพโหลดรูปภาพของคุณได้");
				    console.log("upload error source " + error.source);
				    console.log("upload error target " + error.target);
				}, options
			);
		};

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
        };

        dowloadImgIntoPackage = function(imageUriSource) {
        	console.log('imageUri: ' + imageUriSource);
        	//substring for choosed image in gallary after file name is xxxx(.jpg)
        	var filename = imageUriSource.substring(imageUriSource.lastIndexOf('/') + 1, imageUriSource.lastIndexOf('.'));
        	//$scope.images.filename = filename;
        	//console.log('Filename: ' + $scope.images.filename);
        	//dowload image from device to app package because URI of image in device not working in preview.
            $cordovaFileTransfer.download(imageUriSource, cordova.file.dataDirectory + filename, {}, true)
                .then(function(fileEntry) {
            		//get nativeURL into $scope.images.imageUri after dowload image from device to application package.
            		$scope.images.push({
						imageUri: fileEntry.nativeURL,
						filename: filename
					});
					$scope.imgLength = $scope.images.length;
                    // $scope.images.imageUri = fileEntry.nativeURL;
                    // console.log('THEN: ' + $scope.images.imageUri);
                }, function (error) {
                    console.log(error);
                }
            );
        };

		$scope.deletePicture = function(image){
			var hideSheet = $ionicActionSheet.show({
				titleText: 'Picture',
			    destructiveText: 'Delete',
			    cancelText: 'Cancel',
			    destructiveButtonClicked: function() {
					var index = $scope.images.indexOf(image);
					$scope.images.splice(index, 1);
					$scope.imgLength = $scope.images.length;
					return true;
			    }
			});
		};


        updateUserGroup = function(){
	        $scope.editGroupData.idProfile = profileUser.profileID;
			$http
			.delete(urlService.getBaseUrl() + '/editAllDeleteImages', {params: {group_id: $scope.editGroupData.idGroup}})
			.success(function(response) {
				var forImageData = {};
				$http
					.put(urlService.getBaseUrl() + '/updateUserGroups', $scope.editGroupData)
					.success(function(response) {
						if($scope.images.length > 0){
							for(var i=0; i<$scope.images.length; i++){
								forImageData = {
									group_id: $scope.editGroupData.idGroup,
									image: $scope.realImageName[i].realNameImg
								}
								$http
									.post(urlService.getBaseUrl() + '/insertImageUserGroups', forImageData)
									.success(function(response) {
										$state.go('app.userGroup', {}, {reload:true});
									})
							}
						}else{
							$state.go('app.userGroup', {}, {reload:true});
						}
					})
			})
	};
	});
})